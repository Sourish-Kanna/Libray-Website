import express from 'express';
import { years, addYear, deleteYear } from '../controllers/yearsController.js';

const router = express.Router();

router.get('/years', years);
router.post('/years', addYear);
router.delete('/years/:id', deleteYear);

export default router;