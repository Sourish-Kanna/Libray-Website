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
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Branch name is required.' });
        }

        const existingBranch = await Branch.findOne({ name });
        if (existingBranch) {
            return res.status(400).json({ message: 'Branch already exists.' });
        }

        const newBranch = new Branch({ name });
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