import Subject from '../models/Subject.model.js';

// Fetch all subjects
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found.' });
    }
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
};

// Add a new subject
export const addSubject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Subject name is required.' });
    }

    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists.' });
    }

    const newSubject = new Subject({ name });
    await newSubject.save();
    res.status(201).json({ message: 'Subject added successfully.', subject: newSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding subject', error: error.message });
  }
};

// Delete a subject
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found.' });
    }
    res.status(200).json({ message: 'Subject deleted successfully.', subject: deletedSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error: error.message });
  }
};