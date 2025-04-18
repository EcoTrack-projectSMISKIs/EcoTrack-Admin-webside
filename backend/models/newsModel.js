const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Optional image URL
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);