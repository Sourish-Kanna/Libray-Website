import { Semester } from '../models/Semester.model.js';
import { getAdminModel } from '../utils/getAdminModel.js';

// Fetch all semesters
export const getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find();
        if (!semesters || semesters.length === 0) {
            return res.status(404).json({ message: 'No semesters found.' });
        }
        res.status(200).json(semesters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching semesters', error: error.message });
    }
};

// Add a new semester
export const addSemester = async (req, res) => {
    try {
        const AdminSemester = getAdminModel(Semester);
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Semester name is required.' });
        }

        const existingSemester = await AdminSemester.findOne({ name });
        if (existingSemester) {
            return res.status(400).json({ message: 'Semester already exists.' });
        }

        const newSemester = new AdminSemester({ name });
        await newSemester.save();
        res.status(201).json({ message: 'Semester added successfully.', semester: newSemester });
    } catch (error) {
        res.status(500).json({ message: 'Error adding semester', error: error.message });
    }
};

// Delete a semester
export const deleteSemester = async (req, res) => {
    try {
        const AdminSemester = getAdminModel(Semester);
        const { id } = req.params;
        const deletedSemester = await AdminSemester.findByIdAndDelete(id);
        if (!deletedSemester) {
            return res.status(404).json({ message: 'Semester not found.' });
        }
        res.status(200).json({ message: 'Semester deleted successfully.', semester: deletedSemester });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting semester', error: error.message });
    }
};