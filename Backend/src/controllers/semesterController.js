import { Semester } from '../models/Semester.model.js';
import { getAdminModel } from '../utils/getAdminModel.js';
import { backendLogger } from '../utils/logger.js';

// Fetch all semesters
export const getSemesters = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "semester.controller", action: "FETCH_SEMESTERS", step: "START", status: "STARTED", requestId, message: `[FETCH_SEMESTERS] START STARTED` });
    try {
        backendLogger.info({ module: "semester.controller", action: "FETCH_SEMESTERS", step: "READ_DB", status: "STARTED", requestId, message: `[FETCH_SEMESTERS] READ_DB STARTED` });
        const semesters = await Semester.find();
        if (!semesters || semesters.length === 0) {
            backendLogger.info({ module: "semester.controller", action: "FETCH_SEMESTERS", step: "READ_DB", status: "SUCCESS", requestId, message: `[FETCH_SEMESTERS] READ_DB SUCCESS - no semesters found` });
            return res.status(404).json({ message: 'No semesters found.' });
        }
        backendLogger.info({ module: "semester.controller", action: "FETCH_SEMESTERS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_SEMESTERS] SEND_RESPONSE SUCCESS` });
        res.status(200).json(semesters);
    } catch (error) {
        backendLogger.error({ module: "semester.controller", action: "FETCH_SEMESTERS", step: "END", status: "FAILURE", requestId, errorCode: "DB_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[FETCH_SEMESTERS] END FAILURE` });
        res.status(500).json({ message: 'Error fetching semesters', error: error.message });
    }
};

// Add a new semester
export const addSemester = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "semester.controller", action: "ADD_SEMESTER", step: "START", status: "STARTED", requestId, message: `[ADD_SEMESTER] START STARTED` });
    try {
        const AdminSemester = getAdminModel(Semester);
        const { name } = req.body;
        
        backendLogger.info({ module: "semester.controller", action: "ADD_SEMESTER", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[ADD_SEMESTER] VALIDATE_INPUT STARTED` });
        if (!name) {
            backendLogger.warn({ module: "semester.controller", action: "ADD_SEMESTER", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Semester name is required", message: `[ADD_SEMESTER] VALIDATE_INPUT FAILURE` });
            return res.status(400).json({ message: 'Semester name is required.' });
        }

        backendLogger.info({ module: "semester.controller", action: "ADD_SEMESTER", step: "READ_DB", status: "STARTED", requestId, message: `[ADD_SEMESTER] READ_DB STARTED` });
        const existingSemester = await AdminSemester.findOne({ name });
        if (existingSemester) {
            backendLogger.warn({ module: "semester.controller", action: "ADD_SEMESTER", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Semester already exists", message: `[ADD_SEMESTER] READ_DB FAILURE` });
            return res.status(400).json({ message: 'Semester already exists.' });
        }

        backendLogger.info({ module: "semester.controller", action: "ADD_SEMESTER", step: "WRITE_DB", status: "STARTED", requestId, message: `[ADD_SEMESTER] WRITE_DB STARTED` });
        const newSemester = new AdminSemester({ name });
        await newSemester.save();
        backendLogger.info({ module: "semester.controller", action: "ADD_SEMESTER", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 201, durationMs: Date.now() - start, message: `[ADD_SEMESTER] SEND_RESPONSE SUCCESS` });
        res.status(201).json({ message: 'Semester added successfully.', semester: newSemester });
    } catch (error) {
        backendLogger.error({ module: "semester.controller", action: "ADD_SEMESTER", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_SEMESTER] END FAILURE` });
        res.status(500).json({ message: 'Error adding semester', error: error.message });
    }
};

// Delete a semester
export const deleteSemester = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "semester.controller", action: "DELETE_SEMESTER", step: "START", status: "STARTED", requestId, message: `[DELETE_SEMESTER] START STARTED` });
    try {
        const AdminSemester = getAdminModel(Semester);
        const { id } = req.params;
        
        backendLogger.info({ module: "semester.controller", action: "DELETE_SEMESTER", step: "READ_DB", status: "STARTED", requestId, meta: { semesterId: id }, message: `[DELETE_SEMESTER] READ_DB STARTED` });
        const deletedSemester = await AdminSemester.findByIdAndDelete(id);
        if (!deletedSemester) {
            backendLogger.warn({ module: "semester.controller", action: "DELETE_SEMESTER", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Semester not found", message: `[DELETE_SEMESTER] READ_DB FAILURE` });
            return res.status(404).json({ message: 'Semester not found.' });
        }
        backendLogger.info({ module: "semester.controller", action: "DELETE_SEMESTER", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_SEMESTER] SEND_RESPONSE SUCCESS` });
        res.status(200).json({ message: 'Semester deleted successfully.', semester: deletedSemester });
    } catch (error) {
        backendLogger.error({ module: "semester.controller", action: "DELETE_SEMESTER", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_SEMESTER] END FAILURE` });
        res.status(500).json({ message: 'Error deleting semester', error: error.message });
    }
};