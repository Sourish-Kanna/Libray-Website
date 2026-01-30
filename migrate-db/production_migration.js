import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

// ================= CONFIGURATION =================
// 1. YOUR Staging DB
const MONGO_URI = 'mongodb+srv://<db_user>:<db_pass>@<cluster>/siesgstlibrary';

// 2. CLIENT New Cloudinary Keys (Target)
const NEW_CLOUD_CONFIG = {
    cloud_name: '<your_cloud_name>',
    api_key: '<your_api_key>',
    api_secret: '<your_api_secret>'
};
// =================================================

cloudinary.config(NEW_CLOUD_CONFIG);

// --- Schema Definitions ---
const userSchema = new mongoose.Schema({ avatar: String, username: String }, { strict: false });
const pyqSchema = new mongoose.Schema({ questionPaperUrl: String, branch: String, semester: String, year: String, month: String }, { strict: false });
const syllabusSchema = new mongoose.Schema({ syllabusUrl: String, branch: String, semester: String }, { strict: false });

const User = mongoose.model('User', userSchema);
const PYQ = mongoose.model('PYQ', pyqSchema);
const Syllabus = mongoose.model('Syllabus', syllabusSchema);

// --- Helper: Get Public ID ---
function getPublicIdFromUrl(url) {
    if (!url || !url.includes('cloudinary')) return null;
    try {
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;
        let pathPart = parts[1];
        if (pathPart.match(/^v\d+\//)) pathPart = pathPart.replace(/^v\d+\//, '');
        const lastDot = pathPart.lastIndexOf('.');
        if (lastDot !== -1) pathPart = pathPart.substring(0, lastDot);
        return pathPart;
    } catch (e) { return null; }
}

// --- Helper: Migrate Single File ---
async function migrateSingleFile(fileUrl, resourceType, targetFolder, customName) {
    if (!fileUrl || !fileUrl.includes('cloudinary')) return null;

    try {
        const response = await axios({ url: fileUrl, method: 'GET', responseType: 'stream' });

        // 1. Determine the Filename
        let finalName;
        if (customName) {
            // Remove special characters to keep URL clean
            const safeName = customName.replace(/[^a-zA-Z0-9-_]/g, '_');
            finalName = safeName;
        } else {
            finalName = getPublicIdFromUrl(fileUrl);
            if (finalName && finalName.includes('/')) {
                finalName = finalName.split('/').pop();
            }
        }

        // 2. Combine with Folder (e.g. "lib/pyqs" + "/" + "filename")
        const finalPublicId = targetFolder ? `${targetFolder}/${finalName}` : finalName;

        return new Promise((resolve) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: finalPublicId,
                    resource_type: resourceType,
                    overwrite: true,
                    asset_folder: targetFolder
                },
                (error, result) => {
                    if (error) resolve({ success: false, error: error.message });
                    else resolve({ success: true, newUrl: result.secure_url });
                }
            );
            response.data.pipe(uploadStream);
        });

    } catch (error) { return { success: false, error: error.message }; }
}

// --- Main Execution ---
async function startMigration() {
    console.log("🚀 STARTING FULL MIGRATION...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to Staging Database");

    // 1. Migrate Users -> "lib/users"
    const users = await User.find({ avatar: { $regex: 'cloudinary' } });
    console.log(`\n--- Found ${users.length} Users ---`);
    for (const user of users) {
        process.stdout.write(`Migrating User: ${user.username}... `);

        // CHANGE 1: 'users' -> 'lib/users'
        const res = await migrateSingleFile(user.avatar, 'image', 'lib/users', user.username);

        if (res && res.success) {
            user.avatar = res.newUrl;
            await user.save();
            console.log("✅ Done");
            console.log("👉 New URL:", res.newUrl);
        } else console.log(`❌ Failed`);
    }

    // 2. Migrate PYQs -> "lib/pyqs"
    const pyqs = await PYQ.find({ questionPaperUrl: { $regex: 'cloudinary' } });
    console.log(`\n--- Found ${pyqs.length} PYQs ---`);
    for (const pyq of pyqs) {
        process.stdout.write(`Migrating PYQ (${pyq.branch})... `);

        const oldIdShort = getPublicIdFromUrl(pyq.questionPaperUrl)?.slice(-4) || 'file';
        const newName = `${pyq.branch}_${pyq.semester}_${pyq.year}_${pyq.month}_${oldIdShort}`;

        // CHANGE 2: 'pyqs' -> 'lib/pyqs'
        const res = await migrateSingleFile(pyq.questionPaperUrl, 'raw', 'lib/pyqs', newName);

        if (res && res.success) {
            pyq.questionPaperUrl = res.newUrl;
            await pyq.save();
            console.log("✅ Done");
            console.log("👉 New URL:", res.newUrl);
        } else console.log(`❌ Failed`);
    }

    // 3. Migrate Syllabuses -> "lib/syllabuses"
    const syllabuses = await Syllabus.find({ syllabusUrl: { $regex: 'cloudinary' } });
    console.log(`\n--- Found ${syllabuses.length} Syllabuses ---`);
    for (const syl of syllabuses) {
        process.stdout.write(`Migrating Syllabus (${syl.branch})... `);

        const oldIdShort = getPublicIdFromUrl(syl.syllabusUrl)?.slice(-4) || 'file';
        const newName = `${syl.branch}_${syl.semester}_${oldIdShort}`;

        const res = await migrateSingleFile(syl.syllabusUrl, 'raw', 'lib/syllabuses', newName);

        if (res && res.success) {
            syl.syllabusUrl = res.newUrl;
            await syl.save();
            console.log("✅ Done");
            console.log("👉 New URL:", res.newUrl);
        } else console.log(`❌ Failed`);
    }

    console.log("\n🎉 MIGRATION COMPLETE!");
    process.exit(0);
}

startMigration();