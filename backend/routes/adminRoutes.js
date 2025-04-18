const express = require("express");
const {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  createAdmin, // new added route
  getAllAdmins, // view all admins
  deleteAdmin, // delete an admin by ID
  updateAdminById, // new
  sendEmailCampaign, // added email function
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

//
router.get("/all", protect, getAllAdmins); // view all admins
router.delete("/:id", protect, deleteAdmin); // delete an admin by ID
//
//  // new
router.put("/:id", protect, updateAdminById);
// update an admin by ID

// added sendEmailCampaign function
router.post("/send-campaign", protect, sendEmailCampaign);

module.exports = router;