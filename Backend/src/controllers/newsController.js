// controllers/newsController.js
import { News } from "../models/news.model.js";
import { getAdminModel } from '../utils/getAdminModel.js';
import { backendLogger } from '../utils/logger.js';
// Add a new news item
const addNews = async (req, res) => {
  const requestId = req?.requestId;
  const start = Date.now();
  backendLogger.info({ module: "news.controller", action: "ADD_NEWS", step: "START", status: "STARTED", requestId, message: `[ADD_NEWS] START STARTED` });
  try {
    const AdminNews = getAdminModel(News);
    const { title } = req.body;
    
    backendLogger.info({ module: "news.controller", action: "ADD_NEWS", step: "VALIDATE_INPUT", status: "STARTED", requestId, message: `[ADD_NEWS] VALIDATE_INPUT STARTED` });
    if (!title) {
      backendLogger.warn({ module: "news.controller", action: "ADD_NEWS", step: "VALIDATE_INPUT", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "News title is required", message: `[ADD_NEWS] VALIDATE_INPUT FAILURE` });
      return res.status(400).json({ message: "News title is required" });
    }
    
    backendLogger.info({ module: "news.controller", action: "ADD_NEWS", step: "WRITE_DB", status: "STARTED", requestId, message: `[ADD_NEWS] WRITE_DB STARTED` });
    const newNews = new AdminNews({ title });
    await newNews.save();
    backendLogger.info({ module: "news.controller", action: "ADD_NEWS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 201, durationMs: Date.now() - start, message: `[ADD_NEWS] SEND_RESPONSE SUCCESS` });
    res.status(201).json({ message: "News added successfully", news: newNews });
  } catch (error) {
    backendLogger.error({ module: "news.controller", action: "ADD_NEWS", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[ADD_NEWS] END FAILURE` });
    res
      .status(500)
      .json({ message: "Error adding news", error: error.message });
  }
};

// Delete a news item
const deleteNews = async (req, res) => {
  const requestId = req?.requestId;
  const start = Date.now();
  backendLogger.info({ module: "news.controller", action: "DELETE_NEWS", step: "START", status: "STARTED", requestId, message: `[DELETE_NEWS] START STARTED` });
  try {
    const AdminNews = getAdminModel(News);
    const { id } = req.params;
    
    backendLogger.info({ module: "news.controller", action: "DELETE_NEWS", step: "READ_DB", status: "STARTED", requestId, meta: { newsId: id }, message: `[DELETE_NEWS] READ_DB STARTED` });
    const deletedNews = await AdminNews.findByIdAndDelete(id);
    if (!deletedNews) {
      backendLogger.warn({ module: "news.controller", action: "DELETE_NEWS", step: "READ_DB", status: "FAILURE", requestId, errorCode: "VALIDATION_ERROR", errorMessage: "News not found", message: `[DELETE_NEWS] READ_DB FAILURE` });
      return res.status(404).json({ message: "News not found" });
    }
    backendLogger.info({ module: "news.controller", action: "DELETE_NEWS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[DELETE_NEWS] SEND_RESPONSE SUCCESS` });
    res
      .status(200)
      .json({ message: "News deleted successfully", news: deletedNews });
  } catch (error) {
    backendLogger.error({ module: "news.controller", action: "DELETE_NEWS", step: "END", status: "FAILURE", requestId, errorCode: "INTERNAL_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[DELETE_NEWS] END FAILURE` });
    res
      .status(500)
      .json({ message: "Error deleting news", error: error.message });
  }
};

// Get all news items
const getAllNews = async (req, res) => {
  const requestId = req?.requestId;
  const start = Date.now();
  backendLogger.info({ module: "news.controller", action: "FETCH_NEWS", step: "START", status: "STARTED", requestId, message: `[FETCH_NEWS] START STARTED` });
  try {
    backendLogger.info({ module: "news.controller", action: "FETCH_NEWS", step: "READ_DB", status: "STARTED", requestId, message: `[FETCH_NEWS] READ_DB STARTED` });
    const newsItems = await News.find().sort({ createdAt: -1 });
    backendLogger.info({ module: "news.controller", action: "FETCH_NEWS", step: "SEND_RESPONSE", status: "SUCCESS", requestId, statusCode: 200, durationMs: Date.now() - start, message: `[FETCH_NEWS] SEND_RESPONSE SUCCESS` });
    res.status(200).json(newsItems);
  } catch (error) {
    backendLogger.error({ module: "news.controller", action: "FETCH_NEWS", step: "END", status: "FAILURE", requestId, errorCode: "DB_ERROR", errorMessage: error.message, durationMs: Date.now() - start, message: `[FETCH_NEWS] END FAILURE` });
    res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
};

export {
  getAllNews,
  deleteNews,
  addNews,
};
