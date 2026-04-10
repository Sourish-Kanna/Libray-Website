import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export let adminConnection = null;

export const connectAdminDB = async () => {
    const adminUrl = process.env.MONGODB_URL_ADMIN?.trim();
    if (!adminUrl) {
        console.warn(' Admin DB: MONGODB_URL_ADMIN not set — writes will fall back to default connection');
        return;
    }
    try {
        adminConnection = await mongoose
            .createConnection(`${adminUrl}/${DB_NAME}?appName=SIESGST_Library`, {
                maxPoolSize: 3,
                minPoolSize: 1, // Keep at least 1 connection ready
                socketTimeoutMS: 45000,
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
            })
            .asPromise();
        console.log(` Admin DB connected: ${adminConnection.host}`);
    } catch (error) {
        console.error(' Admin DB connection failed:', error.message);
        // non-fatal: write operations fall back to the default connection
    }
};
