import express from 'express';
import { getMonths, addMonth, deleteMonth } from '../controllers/monthController.js';

const router = express.Router();

// Route to fetch all months
router.get('/months', getMonths);

// Route to add a new month
router.post('/months', addMonth);

// Route to delete a month
router.delete('/months/:id', deleteMonth);

export default router;