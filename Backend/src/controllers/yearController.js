import Year from '../models/Year.model.js';

// Fetch all years
export const getYears = async (req, res) => {
  try {
    const years = await Year.find();
    if (!years || years.length === 0) {
      return res.status(404).json({ message: 'No years found.' });
    }
    res.status(200).json(years);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching years', error: error.message });
  }
};

// Add a new year
export const addYear = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Year name is required.' });
    }

    const existingYear = await Year.findOne({ name });
    if (existingYear) {
      return res.status(400).json({ message: 'Year already exists.' });
    }

    const newYear = new Year({ name });
    await newYear.save();
    res.status(201).json({ message: 'Year added successfully.', year: newYear });
  } catch (error) {
    res.status(500).json({ message: 'Error adding year', error: error.message });
  }
};

// Delete a year
export const deleteYear = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedYear = await Year.findByIdAndDelete(id);
    if (!deletedYear) {
      return res.status(404).json({ message: 'Year not found.' });
    }
    res.status(200).json({ message: 'Year deleted successfully.', year: deletedYear });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting year', error: error.message });
  }
};