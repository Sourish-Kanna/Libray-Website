import { PYQ } from "../models/pyqs.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const createPYQ = asyncHandler(async (req, res) => {
    const { branch, semester, subject } = req.body;

    const questionPaperPath=req.file?.path;
    if(!questionPaperPath){
        throw new ApiError(400,"PYQ file is required !!");
    }

    const questionPaper = await uploadOnCloudinary(questionPaperPath);

    if (!branch || !semester || !questionPaper || !subject) {
        throw new ApiError(400, "Please provide branch, semester, question paper URL, and subject");
    }

    const pyq = new PYQ({ 
        branch, 
        semester, 
        questionPaperUrl:questionPaper.url, 
        subject 
    });
    await pyq.save();

    res
        .status(201)
        .json(new ApiResponse(201, pyq, "PYQ created successfully"));
});


const updatePYQ = asyncHandler(async (req, res) => {
    const { branch, semester, subject } = req.body;
    const { pyqId } = req.params;

    if (!pyqId) {
        throw new ApiError(400, "PYQ ID is missing");
    }

    const questionPaperPath=req.file?.path;

    const questionPaper = await uploadOnCloudinary(questionPaperPath);

    const pyq = await PYQ.findById(pyqId);
    if (!pyq) {
        throw new ApiError(400, "PYQ not found");
    }

    if (branch) pyq.branch = branch;
    if (semester) pyq.semester = semester;
    if (questionPaper) pyq.questionPaperUrl = questionPaper.url;
    if (subject) pyq.subject = subject;  // updated as string

    await pyq.save();

    res
        .status(200)
        .json(new ApiResponse(200, pyq, "PYQ updated successfully"));
});

const getPYQ = asyncHandler(async (req, res) => {
    const { branch, semester,subject } = req.body;

    if (!branch || !semester ||!subject) {
        throw new ApiError(400, "Please provide branch and semester");
    }

    const pyq = await PYQ.findOne({ branch, semester ,subject});
    if (!pyq) {
        throw new ApiError(404, "PYQ not found");
    }

    res.status(200).json(new ApiResponse(200, pyq, "PYQ fetched successfully"));
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

    res.redirect(pyq.questionPaperUrl);
});




export {
    updatePYQ,
    createPYQ,
    getPYQ,
    downloadPYQ,
};
