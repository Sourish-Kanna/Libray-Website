import mongoose from 'mongoose';

const yearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export const Year = mongoose.model('Year', yearSchema);