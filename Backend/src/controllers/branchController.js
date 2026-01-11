import { Branch } from '../models/Branch.model.js';

// Fetch all branches
export const getBranches = async (req, res) => {
    try {
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
    try {
        const { name, value } = req.body;
        if (!name || !value) {
            return res.status(400).json({ message: 'Branch name and value are required.' });
        }

        const existingBranch = await Branch.findOne({ $or: [{ name }, { value }] });
        if (existingBranch) {
            return res.status(409).json({ message: 'Branch already exists.' });
        }

        const newBranch = new Branch({ name, value });
        await newBranch.save();
        res.status(201).json({ message: 'Branch added successfully.', branch: newBranch });
    } catch (error) {
        res.status(500).json({ message: 'Error adding branch', error: error.message });
    }
};

// Delete a branch
export const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBranch = await Branch.findByIdAndDelete(id);
        if (!deletedBranch) {
            return res.status(404).json({ message: 'Branch not found.' });
        }
        res.status(200).json({ message: 'Branch deleted successfully.', branch: deletedBranch });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting branch', error: error.message });
    }
};

// Update a branch
export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, value } = req.body;
        if (!name && !value) {
            return res.status(400).json({ message: 'Branch name or value is required.' });
        }
        const updateData = {};
        if (name) updateData.name = name;
        if (value) updateData.value = value;
        
        const updatedBranch = await Branch.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if (!updatedBranch) {
            return res.status(404).json({ message: 'Branch not found.' });
        }
        res.status(200).json({ message: 'Branch updated successfully.', branch: updatedBranch });
    } catch (error) {
        res.status(500).json({ message: 'Error updating branch', error: error.message });
    }
};