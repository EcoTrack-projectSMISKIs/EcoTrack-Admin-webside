const express = require("express");
const { adminLogin } = require("../controllers/adminController");
const { getUsers } = require("../controllers/userController");
const protect = require("../middleware/auth");

const router = express.Router();

router.post("/admin/login", adminLogin);
router.get("/users", protect, getUsers);

module.exports = router;