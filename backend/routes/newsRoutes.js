const express = require("express");
const {
  getAllNews,
  addNews,
  deleteNews,
  updateNews,
} = require("../controllers/newsController");

const router = express.Router();

router.get("/", getAllNews);
router.post("/", addNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;