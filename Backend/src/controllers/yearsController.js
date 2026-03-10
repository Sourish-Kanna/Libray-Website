import { Year } from '../models/Year.model.js';
import { getAdminModel } from '../utils/getAdminModel.js';
import { backendLogger } from '../utils/logger.js';

export const years = async (_, res) => {
    const requestId = _?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "START", status: "STARTED", requestId, message: `[FETCH_YEARS] START STARTED` });
    try {
        const AdminYear = getAdminModel(Year);
        backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "READ_DB", status: "STARTED", requestId, message: `[FETCH_YEARS] READ_DB STARTED` });
        const yearsFromDb = await Year.find().sort({ name: -1 });
        
        if (yearsFromDb.length === 0) {
            backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "READ_DB", status: "SUCCESS", requestId, message: `[FETCH_YEARS] READ_DB SUCCESS - empty, generating defaults` });
            backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "WRITE_DB", status: "STARTED", requestId, message: `[FETCH_YEARS] WRITE_DB STARTED - inserting default years` });
            
            const currentYear = new Date().getFullYear();
            const yearArray = Array.from({ length: 10 }, (_, i) => currentYear - i);
            
            const yearDocs = yearArray.map(year => ({
                name: year.toString()
            }));
            
            await AdminYear.insertMany(yearDocs);
            backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "WRITE_DB", status: "SUCCESS", requestId, message: `[FETCH_YEARS] WRITE_DB SUCCESS - created 10 default years` });
            const createdYears = await Year.find().sort({ name: -1 });
            
            const yearOptions = createdYears.map(year => ({
                value: year._id.toString(),
                text: year.name
            }));
            
            backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_YEARS] SEND_RESPONSE SUCCESS` });
            return res.json(yearOptions);
        }
        
        backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "READ_DB", status: "SUCCESS", requestId, message: `[FETCH_YEARS] READ_DB SUCCESS` });
        const yearOptions = yearsFromDb.map(year => ({
            value: year._id.toString(),
            text: year.name
        }));
        
        backendLogger.info({ module: "year.controller", action: "FETCH_YEARS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_YEARS] SEND_RESPONSE SUCCESS` });
        res.json(yearOptions);
    } catch (error) {
        backendLogger.error({ module: "year.controller", action: "FETCH_YEARS", step: "END", status: "FAILURE", requestId, errorCode: "DB_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[FETCH_YEARS] END FAILURE` });
        res.status(500).json({ error: error.message });
    }
}

export const addYear = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "year.controller", action: "ADD_YEAR", step: "START", status: "STARTED", requestId, message: `[ADD_YEAR] START STARTED` });
    try {
        const AdminYear = getAdminModel(Year);
        const { name } = req.body;
        
        backendLogger.info({ module: "year.controller", action: "ADD_YEAR", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[ADD_YEAR] VALIDATE_INPUT STARTED` });
        if (!name) {
            backendLogger.warn({ module: "year.controller", action: "ADD_YEAR", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Year name is required", message: `[ADD_YEAR] VALIDATE_INPUT FAILURE` });
            return res.status(400).json({ error: 'Year name is required' });
        }
        
        backendLogger.info({ module: "year.controller", action: "ADD_YEAR", step: "WRITE_DB", status: "STARTED", requestId, message: `[ADD_YEAR] WRITE_DB STARTED` });
        const newYear = new AdminYear({ name });
        await newYear.save();
        
        backendLogger.info({ module: "year.controller", action: "ADD_YEAR", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 201, durationMs: Date.now() - start, message: `[ADD_YEAR] SEND_RESPONSE SUCCESS` });
        res.status(201).json(newYear);
    } catch (error) {
        if (error.code === 11000) {
            backendLogger.warn({ module: "year.controller", action: "ADD_YEAR", step: "WRITE_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Year already exists", message: `[ADD_YEAR] WRITE_DB FAILURE` });
            return res.status(400).json({ error: 'Year already exists' });
        }
        backendLogger.error({ module: "year.controller", action: "ADD_YEAR", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_YEAR] END FAILURE` });
        res.status(500).json({ error: error.message });
    }
}

export const deleteYear = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "year.controller", action: "DELETE_YEAR", step: "START", status: "STARTED", requestId, message: `[DELETE_YEAR] START STARTED` });
    try {
        const AdminYear = getAdminModel(Year);
        const { id: name } = req.params;

        backendLogger.info({ module: "year.controller", action: "DELETE_YEAR", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[DELETE_YEAR] VALIDATE_INPUT STARTED` });
        if (!name) {
            backendLogger.warn({ module: "year.controller", action: "DELETE_YEAR", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Year name is required", message: `[DELETE_YEAR] VALIDATE_INPUT FAILURE` });
            return res.status(400).json({ error: 'Year name is required' });
        }

        backendLogger.info({ module: "year.controller", action: "DELETE_YEAR", step: "READ_DB", status: "STARTED", requestId, meta: { yearName: name }, message: `[DELETE_YEAR] READ_DB STARTED` });
        const deletedYear = await AdminYear.findOneAndDelete({ name });

        if (!deletedYear) {
            backendLogger.warn({ module: "year.controller", action: "DELETE_YEAR", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Year not found", message: `[DELETE_YEAR] READ_DB FAILURE` });
            return res.status(404).json({ error: 'Year not found' });
        }

        backendLogger.info({ module: "year.controller", action: "DELETE_YEAR", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_YEAR] SEND_RESPONSE SUCCESS` });
        res.json({ message: 'Year deleted successfully', year: deletedYear });
    } catch (error) {
        backendLogger.error({ module: "year.controller", action: "DELETE_YEAR", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_YEAR] END FAILURE` });
        res.status(500).json({ error: error.message });
    }
};