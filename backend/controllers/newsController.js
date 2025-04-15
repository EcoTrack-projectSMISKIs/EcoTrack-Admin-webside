const News = require("../models/newsModel");

// 📄 Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ Add news
const addNews = async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const newPost = await News.create({ title, content, image });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✏️ Update news
const updateNews = async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete news
const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
};