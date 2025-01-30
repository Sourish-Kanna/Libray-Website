import mongoose from 'mongoose';

const monthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Month = mongoose.model('Month', monthSchema);

export default Month;