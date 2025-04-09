import express from "express";
import {
  getAllNews,
  addNews,
  deleteNews,
  updateNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.post("/", addNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;