// models/News.js
import mongoose, { Schema } from "mongoose";


const newsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const News = mongoose.model('News', newsSchema);