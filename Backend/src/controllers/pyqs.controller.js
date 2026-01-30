import { PYQ } from '../models/pyqs.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import axios from 'axios';

// Create a new PYQ
const createPYQ = asyncHandler(async (req, res) => {
    const { branch, semester, year, month } = req.body;

    // Check if all required fields are provided
    if (!branch || !semester || !year || !month) {
        throw new ApiError(400, "Please provide all required fields: branch, semester, subject, year, and month");
    }

    // Check if the same PYQ already exists
    const existingPYQ = await PYQ.findOne({
        branch: { $eq: branch },
        semester: { $eq: semester },
        // subject: { $eq: subject.toLowerCase() }, // Ensure subject comparison is case-insensitive
        year: { $eq: year },
        month: { $eq: month }
    });

    if (existingPYQ) {
        throw new ApiError(400, "A PYQ with the same branch, semester, subject, year, and month already exists");
    }

    const questionPaperPath = req.file?.path;
    if (!questionPaperPath) {
        throw new ApiError(400, "Question Paper file not found");
    }

    const questionPaperUrl = await uploadOnCloudinary(questionPaperPath);
    if (!questionPaperUrl) {
        throw new ApiError(400, "Failed to upload question paper");
    }

    const pyq = await PYQ.create({
        branch,
        semester,
        // subject: subject.toLowerCase(),
        year,
        month,
        questionPaperUrl: questionPaperUrl.url
    });

    res.status(201).json(new ApiResponse(201, pyq, "PYQ created successfully"));
});

const updatePYQ = asyncHandler(async (req, res) => {
    const { pyqId } = req.params;
    const { branch, semester, year, month } = req.body;

    if (!pyqId) {
        throw new ApiError(400, "PYQ ID is missing");
    }

    const pyq = await PYQ.findById(pyqId);
    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    const questionPaperPath = req.file?.path;
    let questionPaperUrl;
    if (questionPaperPath) {
        questionPaperUrl = await uploadOnCloudinary(questionPaperPath);
        if (!questionPaperUrl) {
            throw new ApiError(400, "Failed to upload new question paper");
        }
    }

    // Update fields if provided
    if (branch) pyq.branch = branch;
    if (semester) pyq.semester = semester;
    // if (subject) pyq.subject = subject.toLowerCase();
    if (year) pyq.year = year;
    if (month) pyq.month = month;
    if (questionPaperUrl) pyq.questionPaperUrl = questionPaperUrl.url;

    await pyq.save();

    res.status(200).json(new ApiResponse(200, pyq, "PYQ updated successfully"));
});

const getPYQ = asyncHandler(async (req, res) => {
    const { branch, semester, year, month } = req.query;

    // 1. Create a dynamic filter
    const filter = {};

    // 2. Only add conditions if the user actually sent them
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    if (year) filter.year = year;
    if (month) filter.month = month.toLowerCase(); // Ensure lowercase matching if needed

    // 3. Find with the filter (if filter is empty {}, it returns ALL documents)
    const pyq = await PYQ.find(filter);

    if (!pyq || pyq.length === 0) {
        // Optional: You can choose to return an empty list instead of an error 
        // to prevent the frontend from crashing if DB is empty.
        return res.status(200).json(new ApiResponse(200, [], "No PYQs found"));
    }

    res.status(200).json(new ApiResponse(200, pyq, "PYQs fetched successfully"));
});

const downloadPYQ = asyncHandler(async (req, res) => {
    const { pyqId } = req.params;

    if (!pyqId) {
        throw new ApiError(400, "PYQ ID is missing");
    }

    const pyq = await PYQ.findById(pyqId);
    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    const cloudinaryFileUrl = pyq.questionPaperUrl;

    const fileStream = await axios({
        url: cloudinaryFileUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const filename = req.query.filename || `PYQ_${pyq.branch}_${pyq.semester}_${pyq.year}_${pyq.month}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    fileStream.data.pipe(res);
});

const deletePYQ = asyncHandler(async (req, res) => {
    const { pyqId } = req.params;

    if (!pyqId) {
        throw new ApiError(400, "PYQ ID is missing");
    }

    const pyq = await PYQ.findByIdAndDelete(pyqId);

    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    res.status(200).json(new ApiResponse(200, null, "PYQ deleted successfully"));
});

export {
    createPYQ,
    updatePYQ,
    getPYQ,
    downloadPYQ,
    deletePYQ
};
