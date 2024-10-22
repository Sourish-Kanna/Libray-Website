import express from "express";
import { Router } from "express";
import { 
    createPYQ, 
    getPYQ, 
    updatePYQ, 
    downloadPYQ 
} from '../controllers/pyqs.controller.js'
import {upload} from '../middlewares/multer.middleware.js';
// import {verifyJWT} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create',upload.single("questionPaper"), createPYQ);
router.get('/', getPYQ);
router.patch('/:pyqId/update',upload.single("questionPaper"), updatePYQ);
router.get('/:pyqId/download', downloadPYQ);

export default router

