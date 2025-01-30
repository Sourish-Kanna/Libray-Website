// controllers/newsController.js
import { News } from "../models/news.model.js";
// Add a new news item
const addNews = async (req, res) => {
  try {
    const { title } = req.body;
    const newNews =  News({ title });
    await newNews.save();
    res.status(201).json({ message: "News added successfully", news: newNews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding news", error: error.message });
  }
};

// Delete a news item
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res
      .status(200)
      .json({ message: "News deleted successfully", news: deletedNews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting news", error: error.message });
  }
};

// Get all news items
const getAllNews = async (req, res) => {
  try {
    const newsItems = await News.find().sort({ createdAt: -1 });
    res.status(200).json(newsItems);
  } catch (error) {
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
