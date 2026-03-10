import { Branch } from '../models/Branch.model.js';
import { getAdminModel } from '../utils/getAdminModel.js';
import { backendLogger } from '../utils/logger.js';

// Fetch all branches
export const getBranches = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "branch.controller", action: "FETCH_BRANCHES", step: "START", status: "STARTED", requestId, message: `[FETCH_BRANCHES] START STARTED` });
    try {
        backendLogger.info({ module: "branch.controller", action: "FETCH_BRANCHES", step: "READ_DB", status: "STARTED", requestId, message: `[FETCH_BRANCHES] READ_DB STARTED` });
        const branches = await Branch.find();
        if (!branches || branches.length === 0) {
            return res.status(404).json({ message: 'No branches found.' });
        }
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching branches', error: error.message });
    }
};

// Add a new branch
export const addBranch = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "branch.controller", action: "ADD_BRANCH", step: "START", status: "STARTED", requestId, message: `[ADD_BRANCH] START STARTED` });
    try {
        const AdminBranch = getAdminModel(Branch);
        const { name, value } = req.body;
        
        backendLogger.info({ module: "branch.controller", action: "ADD_BRANCH", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[ADD_BRANCH] VALIDATE_INPUT STARTED` });
        if (!name || !value) {
            backendLogger.warn({ module: "branch.controller", action: "ADD_BRANCH", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Missing required fields: name or value", message: `[ADD_BRANCH] VALIDATE_INPUT FAILURE` });
            return res.status(400).json({ message: 'Branch name and value are required.' });
        }

        backendLogger.info({ module: "branch.controller", action: "ADD_BRANCH", step: "READ_DB", status: "STARTED", requestId, message: `[ADD_BRANCH] READ_DB STARTED` });
        const existingBranch = await AdminBranch.findOne({ $or: [{ name }, { value }] });
        if (existingBranch) {
            backendLogger.warn({ module: "branch.controller", action: "ADD_BRANCH", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Branch with this name or value already exists", message: `[ADD_BRANCH] READ_DB FAILURE` });
            return res.status(409).json({ message: 'Branch already exists.' });
        }

        backendLogger.info({ module: "branch.controller", action: "ADD_BRANCH", step: "WRITE_DB", status: "STARTED", requestId, message: `[ADD_BRANCH] WRITE_DB STARTED` });
        const newBranch = new AdminBranch({ name, value });
        await newBranch.save();
        backendLogger.info({ module: "branch.controller", action: "ADD_BRANCH", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 201, durationMs: Date.now() - start, message: `[ADD_BRANCH] SEND_RESPONSE SUCCESS` });
        res.status(201).json({ message: 'Branch added successfully.', branch: newBranch });
    } catch (error) {
        backendLogger.error({ module: "branch.controller", action: "ADD_BRANCH", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_BRANCH] END FAILURE` });
        res.status(500).json({ message: 'Error adding branch', error: error.message });
    }
};

// Delete a branch
export const deleteBranch = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "branch.controller", action: "DELETE_BRANCH", step: "START", status: "STARTED", requestId, message: `[DELETE_BRANCH] START STARTED` });
    try {
        const AdminBranch = getAdminModel(Branch);
        const { id } = req.params;
        
        backendLogger.info({ module: "branch.controller", action: "DELETE_BRANCH", step: "READ_DB", status: "STARTED", requestId, meta: { branchId: id }, message: `[DELETE_BRANCH] READ_DB STARTED` });
        const deletedBranch = await AdminBranch.findByIdAndDelete(id);
        if (!deletedBranch) {
            backendLogger.warn({ module: "branch.controller", action: "DELETE_BRANCH", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Branch not found", message: `[DELETE_BRANCH] READ_DB FAILURE` });
            return res.status(404).json({ message: 'Branch not found.' });
        }
        
        backendLogger.info({ module: "branch.controller", action: "DELETE_BRANCH", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_BRANCH] SEND_RESPONSE SUCCESS` });
        res.status(200).json({ message: 'Branch deleted successfully.', branch: deletedBranch });
    } catch (error) {
        backendLogger.error({ module: "branch.controller", action: "DELETE_BRANCH", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_BRANCH] END FAILURE` });
        res.status(500).json({ message: 'Error deleting branch', error: error.message });
    }
};

// Update a branch
export const updateBranch = async (req, res) => {
    const requestId = req?.requestId;
    const start = Date.now();
    backendLogger.info({ module: "branch.controller", action: "UPDATE_BRANCH", step: "START", status: "STARTED", requestId, message: `[UPDATE_BRANCH] START STARTED` });
    try {
        const AdminBranch = getAdminModel(Branch);
        const { id } = req.params;
        const { name, value } = req.body;
        
        backendLogger.info({ module: "branch.controller", action: "UPDATE_BRANCH", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[UPDATE_BRANCH] VALIDATE_INPUT STARTED` });
        if (!name && !value) {
            backendLogger.warn({ module: "branch.controller", action: "UPDATE_BRANCH", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "At least one of name or value is required", message: `[UPDATE_BRANCH] VALIDATE_INPUT FAILURE` });
            return res.status(400).json({ message: 'Branch name or value is required.' });
        }
        const updateData = {};
        if (name) updateData.name = name;
        if (value) updateData.value = value;
        
        backendLogger.info({ module: "branch.controller", action: "UPDATE_BRANCH", step: "WRITE_DB", status: "STARTED", requestId, meta: { branchId: id }, message: `[UPDATE_BRANCH] WRITE_DB STARTED` });
        const updatedBranch = await AdminBranch.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if (!updatedBranch) {
            backendLogger.warn({ module: "branch.controller", action: "UPDATE_BRANCH", step: "WRITE_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "Branch not found", message: `[UPDATE_BRANCH] WRITE_DB FAILURE` });
            return res.status(404).json({ message: 'Branch not found.' });
        }
        
        backendLogger.info({ module: "branch.controller", action: "UPDATE_BRANCH", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[UPDATE_BRANCH] SEND_RESPONSE SUCCESS` });
        res.status(200).json({ message: 'Branch updated successfully.', branch: updatedBranch });
    } catch (error) {
        backendLogger.error({ module: "branch.controller", action: "UPDATE_BRANCH", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[UPDATE_BRANCH] END FAILURE` });
        res.status(500).json({ message: 'Error updating branch', error: error.message });
    }
};