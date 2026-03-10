import { Syllabus } from "../models/syllabus.model.js";
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { backendLogger } from '../utils/logger.js'
import axios from 'axios'
import { getAdminModel } from '../utils/getAdminModel.js';

const updateSyllabus = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "START", status: "STARTED", requestId, message: `[UPDATE_SYLLABUS] START STARTED` });
    
    const AdminSyllabus = getAdminModel(Syllabus);
    const { branch, semester } = req.body;
    const { syllabusId } = req.params;

    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[UPDATE_SYLLABUS] VALIDATE_INPUT STARTED` });
    if (!syllabusId) {
        backendLogger.warn({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus ID missing", message: `[UPDATE_SYLLABUS] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "Syllabus ID is missing");
    }
    
    const syllabusPath = req.file?.path;
    if(!syllabusPath){
        backendLogger.warn({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus file not found", message: `[UPDATE_SYLLABUS] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400,"Syllabus File not found !!");
    }

    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "CALL_EXTERNAL", status: "STARTED", requestId, message: `[UPDATE_SYLLABUS] CALL_EXTERNAL STARTED - Cloudinary upload` });
    const syllabusUrl = await uploadOnCloudinary(syllabusPath);
    if(!syllabusUrl){
        backendLogger.error({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "CALL_EXTERNAL", status: "FAILURE", requestId, errorCode: "EXTERNAL_SERVICE_ERROR", errorMessage: "Cloudinary upload failed", message: `[UPDATE_SYLLABUS] CALL_EXTERNAL FAILURE` });
        throw new ApiError(400,"Failed to upload syllabus !!");
    }
    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "CALL_EXTERNAL", status: "SUCCESS", requestId, message: `[UPDATE_SYLLABUS] CALL_EXTERNAL SUCCESS` });

    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "READ_DB", status: "STARTED", requestId, meta: { syllabusId }, message: `[UPDATE_SYLLABUS] READ_DB STARTED` });
    const syllabus = await AdminSyllabus.findById(syllabusId);
    if (!syllabus) {
        backendLogger.warn({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus not found", message: `[UPDATE_SYLLABUS] READ_DB FAILURE` });
        throw new ApiError(400, "Syllabus not found");
    }

    if (branch) {
        syllabus.branch = branch;
    }

    if (semester) {
        syllabus.semester = semester;
    }
    if(syllabusUrl){
        syllabus.syllabusUrl=syllabusUrl.url;
    }

    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "WRITE_DB", status: "STARTED", requestId, message: `[UPDATE_SYLLABUS] WRITE_DB STARTED` });
    await syllabus.save();

    backendLogger.info({ module: "syllabus.controller", action: "UPDATE_SYLLABUS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[UPDATE_SYLLABUS] SEND_RESPONSE SUCCESS` });
    res.status(200).json(new ApiResponse(200,syllabus,"Syllabus Updated Successfully !!"));
});

const createSyllabus = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "START", status: "STARTED", requestId, message: `[CREATE_SYLLABUS] START STARTED` });
    
    const AdminSyllabus = getAdminModel(Syllabus);
    const { branch, semester } = req.body;
    
    backendLogger.info({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[CREATE_SYLLABUS] VALIDATE_INPUT STARTED` });
    if (!branch || !semester) {
        backendLogger.warn({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Missing branch or semester", message: `[CREATE_SYLLABUS] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "Please provide branch, semester, and syllabus URL");
    }
    
    const syllabusPath = req.file?.path;
    if(!syllabusPath){
        backendLogger.warn({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus file not found", message: `[CREATE_SYLLABUS] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400,"Syllabus File not found !!");
    }
    
    backendLogger.info({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "CALL_EXTERNAL", status: "STARTED", requestId, message: `[CREATE_SYLLABUS] CALL_EXTERNAL STARTED - Cloudinary upload` });
    const syllabusUrl = await uploadOnCloudinary(syllabusPath);
    if(!syllabusUrl){
        backendLogger.error({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "CALL_EXTERNAL", status: "FAILURE", requestId, errorCode: "EXTERNAL_SERVICE_ERROR", errorMessage: "Cloudinary upload failed", message: `[CREATE_SYLLABUS] CALL_EXTERNAL FAILURE` });
        throw new ApiError(400,"Failed to upload syllabus !!");
    }
    backendLogger.info({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "CALL_EXTERNAL", status: "SUCCESS", requestId, message: `[CREATE_SYLLABUS] CALL_EXTERNAL SUCCESS` });
    
    const syllabusUrlForDownload = syllabusUrl.url +'?dl=true';
    
    backendLogger.info({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "WRITE_DB", status: "STARTED", requestId, message: `[CREATE_SYLLABUS] WRITE_DB STARTED` });
    const syllabus = await AdminSyllabus.create({ 
        branch, 
        semester, 
        syllabusUrl:syllabusUrlForDownload,
    });
    await syllabus.save();

    backendLogger.info({ module: "syllabus.controller", action: "CREATE_SYLLABUS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 201, durationMs: Date.now() - start, message: `[CREATE_SYLLABUS] SEND_RESPONSE SUCCESS` });
    res
    .status(201)
    .json(new ApiResponse(201,syllabus,"Syllabus created successfully"));
});

const getSyllabus = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "syllabus.controller", action: "FETCH_SYLLABUS", step: "START", status: "STARTED", requestId, message: `[FETCH_SYLLABUS] START STARTED` });
    
    const { branch, semester } = req.query;

    const filter = {};

    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;

    backendLogger.info({ module: "syllabus.controller", action: "FETCH_SYLLABUS", step: "READ_DB", status: "STARTED", requestId, message: `[FETCH_SYLLABUS] READ_DB STARTED` });
    const syllabus = await Syllabus.find(filter);

    if (!syllabus || syllabus.length === 0) {
        backendLogger.info({ module: "syllabus.controller", action: "FETCH_SYLLABUS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_SYLLABUS] SEND_RESPONSE SUCCESS - empty result` });
        return res.status(200).json(new ApiResponse(200, [], "No Syllabuses found"));
    }

    backendLogger.info({ module: "syllabus.controller", action: "FETCH_SYLLABUS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_SYLLABUS] SEND_RESPONSE SUCCESS` });
    res.status(200).json(new ApiResponse(200, syllabus, "Syllabus fetched successfully !!"));
});

const downloadSyllabus = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "START", status: "STARTED", requestId, message: `[DOWNLOAD_SYLLABUS] START STARTED` });
    
    const { syllabusId } = req.params;

    backendLogger.info({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[DOWNLOAD_SYLLABUS] VALIDATE_INPUT STARTED` });
    if (!syllabusId) {
        backendLogger.warn({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus ID missing", message: `[DOWNLOAD_SYLLABUS] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "Syllabus ID is missing");
    }

    backendLogger.info({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "READ_DB", status: "STARTED", requestId, meta: { syllabusId }, message: `[DOWNLOAD_SYLLABUS] READ_DB STARTED` });
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
        backendLogger.warn({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus not found", message: `[DOWNLOAD_SYLLABUS] READ_DB FAILURE` });
        throw new ApiError(404, "Syllabus not found");
    }

    const cloudinaryFileUrl = syllabus.syllabusUrl;

    backendLogger.info({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "CALL_EXTERNAL", status: "STARTED", requestId, message: `[DOWNLOAD_SYLLABUS] CALL_EXTERNAL STARTED - Cloudinary fetch` });
    const fileStream = await axios({
        url: cloudinaryFileUrl,
        method: 'GET',
        responseType: 'stream',
    });
    backendLogger.info({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "CALL_EXTERNAL", status: "SUCCESS", requestId, message: `[DOWNLOAD_SYLLABUS] CALL_EXTERNAL SUCCESS` });

    const filename = req.query.filename || `${syllabus.branch}_${syllabus.semester}_syllabus.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    backendLogger.info({ module: "syllabus.controller", action: "DOWNLOAD_SYLLABUS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DOWNLOAD_SYLLABUS] SEND_RESPONSE SUCCESS` });
    fileStream.data.pipe(res);
});

const deleteSyllabus = asyncHandler(async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "syllabus.controller", action: "DELETE_SYLLABUS", step: "START", status: "STARTED", requestId, message: `[DELETE_SYLLABUS] START STARTED` });
    
    const AdminSyllabus = getAdminModel(Syllabus);
    const { syllabusId } = req.params;

    backendLogger.info({ module: "syllabus.controller", action: "DELETE_SYLLABUS", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[DELETE_SYLLABUS] VALIDATE_INPUT STARTED` });
    if (!syllabusId) {
        backendLogger.warn({ module: "syllabus.controller", action: "DELETE_SYLLABUS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus ID missing", message: `[DELETE_SYLLABUS] VALIDATE_INPUT FAILURE` });
        throw new ApiError(400, "Syllabus ID is missing");
    }

    backendLogger.info({ module: "syllabus.controller", action: "DELETE_SYLLABUS", step: "READ_DB", status: "STARTED", requestId, meta: { syllabusId }, message: `[DELETE_SYLLABUS] READ_DB STARTED` });
    const syllabus = await AdminSyllabus.findByIdAndDelete(syllabusId);
    if (!syllabus) {
        backendLogger.warn({ module: "syllabus.controller", action: "DELETE_SYLLABUS", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Syllabus not found", message: `[DELETE_SYLLABUS] READ_DB FAILURE` });
        throw new ApiError(404, "Syllabus not found");
    }

    backendLogger.info({ module: "syllabus.controller", action: "DELETE_SYLLABUS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_SYLLABUS] SEND_RESPONSE SUCCESS` });
    res.status(200).json(new ApiResponse(200, null, "Syllabus deleted successfully !!"));
});

export {
    updateSyllabus,
    createSyllabus,
    getSyllabus,
    downloadSyllabus,
    deleteSyllabus,
}