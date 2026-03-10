import { PYQ } from '../models/pyqs.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { backendLogger } from '../utils/logger.js';
import axios from 'axios';
import { getAdminModel } from '../utils/getAdminModel.js';

// Create a new PYQ
const createPYQ = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "START", status: "STARTED", requestId, message: `[CREATE_PYQ] START STARTED` });
    
    const AdminPYQ = getAdminModel(PYQ);
    const { branch, semester, year, month } = req.body;

    // Check if all required fields are provided
    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[CREATE_PYQ] VALIDATE_INPUT STARTED` });
    if (!branch || !semester || !year || !month) {
        backendLogger.warn({ module: "pyqs.controller", action: "CREATE_PYQ", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Missing required fields", message: `[CREATE_PYQ] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "Please provide all required fields: branch, semester, subject, year, and month");
    }

    // Check if the same PYQ already exists
    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "READ_DB", status: "STARTED", requestId, message: `[CREATE_PYQ] READ_DB STARTED` });
    const existingPYQ = await AdminPYQ.findOne({
        branch: { $eq: branch },
        semester: { $eq: semester },
        // subject: { $eq: subject.toLowerCase() }, // Ensure subject comparison is case-insensitive
        year: { $eq: year },
        month: { $eq: month }
    });

    if (existingPYQ) {
        backendLogger.warn({ module: "pyqs.controller", action: "CREATE_PYQ", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ already exists", message: `[CREATE_PYQ] READ_DB FAILURE` });
        throw new ApiError(400, "A PYQ with the same branch, semester, subject, year, and month already exists");
    }

    const questionPaperPath = req.file?.path;
    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "VALIDATE_INPUT", status: "SUCCESS", requestId, message: `[CREATE_PYQ] VALIDATE_INPUT SUCCESS` });
    
    if (!questionPaperPath) {
        backendLogger.warn({ module: "pyqs.controller", action: "CREATE_PYQ", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Question paper file not found", message: `[CREATE_PYQ] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "Question Paper file not found");
    }

    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "CALL_EXTERNAL", status: "STARTED", requestId, message: `[CREATE_PYQ] CALL_EXTERNAL STARTED - Cloudinary upload` });
    const questionPaperUrl = await uploadOnCloudinary(questionPaperPath);
    if (!questionPaperUrl) {
        backendLogger.error({ module: "pyqs.controller", action: "CREATE_PYQ", step: "CALL_EXTERNAL", status: "FAILURE", requestId, errorCode: "EXTERNAL_SERVICE_ERROR", errorMessage: "Cloudinary upload failed", message: `[CREATE_PYQ] CALL_EXTERNAL FAILURE` });
        throw new ApiError(400, "Failed to upload question paper");
    }
    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "CALL_EXTERNAL", status: "SUCCESS", requestId, message: `[CREATE_PYQ] CALL_EXTERNAL SUCCESS` });

    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "WRITE_DB", status: "STARTED", requestId, message: `[CREATE_PYQ] WRITE_DB STARTED` });
    const pyq = await AdminPYQ.create({
        branch,
        semester,
        // subject: subject.toLowerCase(),
        year,
        month,
        questionPaperUrl: questionPaperUrl.url
    });

    backendLogger.info({ module: "pyqs.controller", action: "CREATE_PYQ", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 201, durationMs: Date.now() - start, message: `[CREATE_PYQ] SEND_RESPONSE SUCCESS` });
    res.status(201).json(new ApiResponse(201, pyq, "PYQ created successfully"));
});

const updatePYQ = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "START", status: "STARTED", requestId, message: `[UPDATE_PYQ] START STARTED` });
    
    const AdminPYQ = getAdminModel(PYQ);
    const { pyqId } = req.params;
    const { branch, semester, year, month } = req.body;

    backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[UPDATE_PYQ] VALIDATE_INPUT STARTED` });
    if (!pyqId) {
        backendLogger.warn({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ ID missing", message: `[UPDATE_PYQ] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "PYQ ID is missing");
    }

    backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "READ_DB", status: "STARTED", requestId, meta: { pyqId }, message: `[UPDATE_PYQ] READ_DB STARTED` });
    const pyq = await AdminPYQ.findById(pyqId);
    if (!pyq) {
        backendLogger.warn({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ not found", message: `[UPDATE_PYQ] READ_DB FAILURE` });
        throw new ApiError(404, "PYQ not found");
    }

    const questionPaperPath = req.file?.path;
    let questionPaperUrl;
    if (questionPaperPath) {
        backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "CALL_EXTERNAL", status: "STARTED", requestId, message: `[UPDATE_PYQ] CALL_EXTERNAL STARTED - Cloudinary upload` });
        questionPaperUrl = await uploadOnCloudinary(questionPaperPath);
        if (!questionPaperUrl) {
            backendLogger.error({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "CALL_EXTERNAL", status: "FAILURE", requestId, errorCode: "EXTERNAL_SERVICE_ERROR", errorMessage: "Cloudinary upload failed", message: `[UPDATE_PYQ] CALL_EXTERNAL FAILURE` });
            throw new ApiError(400, "Failed to upload new question paper");
        }
        backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "CALL_EXTERNAL", status: "SUCCESS", requestId, message: `[UPDATE_PYQ] CALL_EXTERNAL SUCCESS` });
    }

    // Update fields if provided
    if (branch) pyq.branch = branch;
    if (semester) pyq.semester = semester;
    // if (subject) pyq.subject = subject.toLowerCase();
    if (year) pyq.year = year;
    if (month) pyq.month = month;
    if (questionPaperUrl) pyq.questionPaperUrl = questionPaperUrl.url;

    backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "WRITE_DB", status: "STARTED", requestId, message: `[UPDATE_PYQ] WRITE_DB STARTED` });
    await pyq.save();

    backendLogger.info({ module: "pyqs.controller", action: "UPDATE_PYQ", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[UPDATE_PYQ] SEND_RESPONSE SUCCESS` });
    res.status(200).json(new ApiResponse(200, pyq, "PYQ updated successfully"));
});

const getPYQ = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "pyqs.controller", action: "FETCH_PYQS", step: "START", status: "STARTED", requestId, message: `[FETCH_PYQS] START STARTED` });
    
    const { branch, semester, year, month } = req.query;

    // 1. Create a dynamic filter
    const filter = {};

    // 2. Only add conditions if the user actually sent them
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    if (year) filter.year = year;
    if (month) filter.month = month.toLowerCase(); // Ensure lowercase matching if needed

    // 3. Find with the filter (if filter is empty {}, it returns ALL documents)
    backendLogger.info({ module: "pyqs.controller", action: "FETCH_PYQS", step: "READ_DB", status: "STARTED", requestId, message: `[FETCH_PYQS] READ_DB STARTED` });
    const pyq = await PYQ.find(filter);

    if (!pyq || pyq.length === 0) {
        backendLogger.info({ module: "pyqs.controller", action: "FETCH_PYQS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_PYQS] SEND_RESPONSE SUCCESS - empty result` });
        return res.status(200).json(new ApiResponse(200, [], "No PYQs found"));
    }

    backendLogger.info({ module: "pyqs.controller", action: "FETCH_PYQS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_PYQS] SEND_RESPONSE SUCCESS` });
    res.status(200).json(new ApiResponse(200, pyq, "PYQs fetched successfully"));
});

const downloadPYQ = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "START", status: "STARTED", requestId, message: `[DOWNLOAD_PYQ] START STARTED` });
    
    const { pyqId } = req.params;

    backendLogger.info({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[DOWNLOAD_PYQ] VALIDATE_INPUT STARTED` });
    if (!pyqId) {
        backendLogger.warn({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ ID missing", message: `[DOWNLOAD_PYQ] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "PYQ ID is missing");
    }

    backendLogger.info({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "READ_DB", status: "STARTED", requestId, meta: { pyqId }, message: `[DOWNLOAD_PYQ] READ_DB STARTED` });
    const pyq = await PYQ.findById(pyqId);
    if (!pyq) {
        backendLogger.warn({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ not found", message: `[DOWNLOAD_PYQ] READ_DB FAILURE` });
        throw new ApiError(404, "PYQ not found");
    }

    const cloudinaryFileUrl = pyq.questionPaperUrl;

    backendLogger.info({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "CALL_EXTERNAL", status: "STARTED", requestId, message: `[DOWNLOAD_PYQ] CALL_EXTERNAL STARTED - Cloudinary fetch` });
    const fileStream = await axios({
        url: cloudinaryFileUrl,
        method: 'GET',
        responseType: 'stream',
    });
    backendLogger.info({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "CALL_EXTERNAL", status: "SUCCESS", requestId, message: `[DOWNLOAD_PYQ] CALL_EXTERNAL SUCCESS` });

    const filename = req.query.filename || `PYQ_${pyq.branch}_${pyq.semester}_${pyq.year}_${pyq.month}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    backendLogger.info({ module: "pyqs.controller", action: "DOWNLOAD_PYQ", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DOWNLOAD_PYQ] SEND_RESPONSE SUCCESS` });
    fileStream.data.pipe(res);
});

const deletePYQ = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "pyqs.controller", action: "DELETE_PYQ", step: "START", status: "STARTED", requestId, message: `[DELETE_PYQ] START STARTED` });
    
    const AdminPYQ = getAdminModel(PYQ);
    const { pyqId } = req.params;

    backendLogger.info({ module: "pyqs.controller", action: "DELETE_PYQ", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[DELETE_PYQ] VALIDATE_INPUT STARTED` });
    if (!pyqId) {
        backendLogger.warn({ module: "pyqs.controller", action: "DELETE_PYQ", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ ID missing", message: `[DELETE_PYQ] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "PYQ ID is missing");
    }

    backendLogger.info({ module: "pyqs.controller", action: "DELETE_PYQ", step: "READ_DB", status: "STARTED", requestId, meta: { pyqId }, message: `[DELETE_PYQ] READ_DB STARTED` });
    const pyq = await AdminPYQ.findByIdAndDelete(pyqId);

    if (!pyq) {
        backendLogger.warn({ module: "pyqs.controller", action: "DELETE_PYQ", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "PYQ not found", message: `[DELETE_PYQ] READ_DB FAILURE` });
        throw new ApiError(404, "PYQ not found");
    }

    backendLogger.info({ module: "pyqs.controller", action: "DELETE_PYQ", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_PYQ] SEND_RESPONSE SUCCESS` });
    res.status(200).json(new ApiResponse(200, null, "PYQ deleted successfully"));
});

export {
    createPYQ,
    updatePYQ,
    getPYQ,
    downloadPYQ,
    deletePYQ
};
