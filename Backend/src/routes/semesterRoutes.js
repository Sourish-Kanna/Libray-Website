import express from 'express';
import { getSemesters, addSemester, deleteSemester } from '../controllers/semesterController.js';

const router = express.Router();

// Route to fetch all semesters
router.get('/semesters', getSemesters);

// Route to add a new semester
router.post('/semesters', addSemester);

// Route to delete a semester
router.delete('/semesters/:id', deleteSemester);

export default router;