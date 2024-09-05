const express = require("express");
const {
  loginAdmin,
  generateOtp,
  updateEmail,
  updateAdminProfile,
} = require("../../../controllers/controller");
const AdminProfile = require("../../../middlewares/multer");

// Admin Profile
const adminRouter = express.Router();
adminRouter.post("/login", loginAdmin);
adminRouter.post("/generate-otp", generateOtp);
adminRouter.post("/update-email/:_id", updateEmail);
adminRouter.put("/update-admin-profile/:_id", AdminProfile, updateAdminProfile);


module.exports = adminRouter;
