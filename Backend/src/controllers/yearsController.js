import { Year } from '../models/Year.model.js';
import { getAdminModel } from '../utils/getAdminModel.js';

export const years = async (_, res) => {
    try {
        const AdminYear = getAdminModel(Year);
        // Retrieve all years from database
        const yearsFromDb = await Year.find().sort({ name: -1 });
        
        if (yearsFromDb.length === 0) {
            // If no years exist, create default years
            const currentYear = new Date().getFullYear();
            const yearArray = Array.from({ length: 10 }, (_, i) => currentYear - i);
            
            const yearDocs = yearArray.map(year => ({
                name: year.toString()
            }));
            
            await AdminYear.insertMany(yearDocs);
            const createdYears = await Year.find().sort({ name: -1 });
            
            const yearOptions = createdYears.map(year => ({
                value: year._id.toString(),
                text: year.name
            }));
            
            return res.json(yearOptions);
        }
        
        const yearOptions = yearsFromDb.map(year => ({
            value: year._id.toString(),
            text: year.name
        }));
        
        res.json(yearOptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addYear = async (req, res) => {
    try {
        const AdminYear = getAdminModel(Year);
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Year name is required' });
        }
        
        const newYear = new AdminYear({ name });
        await newYear.save();
        
        res.status(201).json(newYear);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Year already exists' });
        }
        res.status(500).json({ error: error.message });
    }
}

export const deleteYear = async (req, res) => {
    try {
        const AdminYear = getAdminModel(Year);
        const { id: name } = req.params;

        if (!name) {
            return res.status(400).json({ error: 'Year name is required' });
        }

        const deletedYear = await AdminYear.findOneAndDelete({ name });

        if (!deletedYear) {
            return res.status(404).json({ error: 'Year not found' });
        }

        res.json({ message: 'Year deleted successfully', year: deletedYear });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};