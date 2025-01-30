import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export const Semester = mongoose.model('Semester', semesterSchema);