import express from 'express';
import { getYears, addYear, deleteYear } from '../controllers/yearController.js';

const router = express.Router();

// Route to fetch all years
router.get('/years', getYears);

// Route to add a new year
router.post('/years', addYear);

// Route to delete a year
router.delete('/years/:id', deleteYear);

export default router;