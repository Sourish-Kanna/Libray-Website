import { Syllabus } from "../models/syllabus.model.js";
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import axios from 'axios'

const updateSyllabus = asyncHandler(async (req, res) => {
    const { branch, semester } = req.body;
    const { syllabusId } = req.params;

    if (!syllabusId) {
        throw new ApiError(400, "Syllabus ID is missing");
    }
    const syllabusPath = req.file?.path;
    if(!syllabusPath){
        throw new ApiError(400,"Syllabus File not found !!");
    }

    const syllabusUrl = await uploadOnCloudinary(syllabusPath);
    if(!syllabusUrl){
        throw new ApiError(400,"Failed to upload syllabus !!");
    }

    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
        throw new ApiError(400, "Syllabus not found");
    }

    if (branch) {
        syllabus.branch = branch;
    }

    // Update semester if provided
    if (semester) {
        syllabus.semester = semester;
    }
    if(syllabusUrl){
        syllabus.syllabusUrl=syllabusUrl.url;
    }

    await syllabus.save();

    res.status(200).json(new ApiResponse(200,syllabus,"Syllabus Updated Successfully !!"));
});

const createSyllabus = asyncHandler(async (req, res) => {
    const { branch, semester } = req.body;
    console.log('hello')
    if (!branch || !semester) {
        throw new ApiError(400, "Please provide branch, semester, and syllabus URL");
    }
    const syllabusPath = req.file?.path;

    if(!syllabusPath){
        throw new ApiError(400,"Syllabus File not found !!");
    }
    const syllabusUrl = await uploadOnCloudinary(syllabusPath);
    if(!syllabusUrl){
        throw new ApiError(400,"Failed to upload syllabus !!");
    }
    const syllabusUrlForDownload = syllabusUrl.url +'?dl=true';
    const syllabus = await Syllabus.create({ 
        branch, 
        semester, 
        syllabusUrl:syllabusUrlForDownload,
    });
    await syllabus.save();

    res
    .status(201)
    .json(new ApiResponse(201,syllabus,"Syllabus created successfully"));
});

const getSyllabus = asyncHandler(async (req, res) => {
    const { branch, semester } = req.query;

    if (!branch || !semester) {
        throw new ApiError(400, "Please provide branch and semester");
    }

    const syllabus = await Syllabus.findOne({ branch: { $eq: branch }, semester: { $eq: semester } });
    if (!syllabus) {
        throw new ApiError(404, "Syllabus not found");
    }

    res.status(200).json(new ApiResponse(200,syllabus,"Syllabus fetched successfully !!"));
});

const downloadSyllabus = asyncHandler(async (req, res) => {
    const { syllabusId } = req.params;

    if (!syllabusId) {
        throw new ApiError(400, "Syllabus ID is missing");
    }

    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
        throw new ApiError(404, "Syllabus not found");
    }

    const cloudinaryFileUrl = syllabus.syllabusUrl;

    const fileStream = await axios({
        url: cloudinaryFileUrl,
        method: 'GET',
        responseType: 'stream',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${syllabus.title}.pdf"`);

    fileStream.data.pipe(res);
});


const deleteSyllabus = asyncHandler(async (req, res) => {
    const { syllabusId } = req.params;

    if (!syllabusId) {
        throw new ApiError(400, "Syllabus ID is missing");
    }

    const syllabus = await Syllabus.findByIdAndDelete(syllabusId);
    if (!syllabus) {
        throw new ApiError(404, "Syllabus not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Syllabus deleted successfully !!"));
});

export {
    updateSyllabus,
    createSyllabus,
    getSyllabus,
    downloadSyllabus,
    deleteSyllabus,
}