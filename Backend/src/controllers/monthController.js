import Month from '../models/Month.model.js';

// Fetch all months
export const getMonths = async (req, res) => {
  try {
    const months = await Month.find();
    if (!months || months.length === 0) {
      return res.status(404).json({ message: 'No months found.' });
    }
    res.status(200).json(months);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching months', error: error.message });
  }
};

// Add a new month
export const addMonth = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Month name is required.' });
    }

    const existingMonth = await Month.findOne({ name });
    if (existingMonth) {
      return res.status(400).json({ message: 'Month already exists.' });
    }

    const newMonth = new Month({ name });
    await newMonth.save();
    res.status(201).json({ message: 'Month added successfully.', month: newMonth });
  } catch (error) {
    res.status(500).json({ message: 'Error adding month', error: error.message });
  }
};

// Delete a month
export const deleteMonth = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMonth = await Month.findByIdAndDelete(id);
    if (!deletedMonth) {
      return res.status(404).json({ message: 'Month not found.' });
    }
    res.status(200).json({ message: 'Month deleted successfully.', month: deletedMonth });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting month', error: error.message });
  }
};