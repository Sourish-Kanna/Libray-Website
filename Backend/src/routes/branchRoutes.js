import express from 'express';
import { getBranches, addBranch, deleteBranch, updateBranch } from '../controllers/branchController.js';

const router = express.Router();

// Route to fetch all branches
router.get('/branches', getBranches);

// Route to add a new branch
router.post('/branches', addBranch);

// Route to delete a branch
router.delete('/branches/:id', deleteBranch);

// Route to update a branch
router.put('/branches/:id', updateBranch);

export default router;