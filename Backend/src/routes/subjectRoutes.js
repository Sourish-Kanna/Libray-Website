import express from 'express';
import { getSubjects, addSubject, deleteSubject } from '../controllers/subjectController.js';

const router = express.Router();

// Route to fetch all subjects
router.get('/subjects', getSubjects);

// Route to add a new subject
router.post('/subjects', addSubject);

// Route to delete a subject
router.delete('/subjects/:id', deleteSubject);

export default router;