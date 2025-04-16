const express = require("express");
const {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  createAdmin, // new added route
} = require("../controllers/adminController");
const { getUsers } = require("../controllers/userController");
const protect = require("../middleware/auth");

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", protect, getUsers);

//  Added routes
router.get("/profile", protect, getAdminProfile);
router.put("/profile", protect, updateAdminProfile);

router.post("/create", protect, createAdmin); //  new added route

module.exports = router;