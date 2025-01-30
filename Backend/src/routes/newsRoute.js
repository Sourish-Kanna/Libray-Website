// routes/newsRoutes.js
import express from 'express'
const router = express.Router();
import  {
    getAllNews,
    deleteNews,
    addNews,
}
from '../controllers/newsController.js'

// Add a new news item
router.post('/', addNews);

// Delete a news item
router.delete('/:id', deleteNews);

// Get all news items
router.get('/', getAllNews);

export default router
