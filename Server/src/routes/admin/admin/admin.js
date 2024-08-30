const express = require("express");
const { loginAdmin, generateOtp, updateEmail } = require("../../../controllers/controller");

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/generate-otp", generateOtp);
adminRouter.post("/update-email/:_id", updateEmail);

module.exports = adminRouter;
