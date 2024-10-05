const fs = require("fs");
require("dotenv").config();
const nodemailer = require("nodemailer");
const Admin = require("./../../../models/admin/admin");
const otpMap = require("../../../variables/variables");

const adminRegister = async () => {
  const AdminFromDB = await Admin.find();
  if (AdminFromDB.length !== 0) return console.log(AdminFromDB);

  const adminCredentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  const SaveAdminCredentials = new Admin(adminCredentials);
  const response = await SaveAdminCredentials.save();
  console.log(response);
};

const loginAdmin = async (req, res) => {
  try {
    // console.log(req.body);
    const ifValidEmail = await Admin.find({ email: req.body.email });

    if (ifValidEmail.length === 0)
      return res.status(400).json({ message: "Invalid email" });
    if (ifValidEmail[0].password !== req.body.password)
      return res.status(401).json({ message: "Invalid Password." });
    res.status(200).json({ message: "Admin Logged In", data: ifValidEmail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_APP_PASSWORD,
      },
    });

    const otp = Math.floor(Math.random() * 1000000);

    const otpMapVariable = otpMap;
    otpMapVariable.set(email, otp);
    console.log(otpMapVariable);

    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: "OTP for email update",
      text: `your otp is ${otp}. It is valid for 60s.`,
    };

    transporter.sendMail(mailOptions, (error, success) => {
      if (error)
        return res.status(500).json({ message: "OTP could not generate." });

      res.status(200).json({ message: "OTP sent successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const otpMapVariable = otpMap;
    const sentOTP = otpMapVariable.get("chandrikaharsha610@gmail.com");
    if (sentOTP !== Number(req.body.otp))
      return res.status(401).json({ message: "Enter a valid otp." });
    const response = await Admin.updateOne(req.params, {
      $set: { email: req.body.new_email },
    });
    res.status(200).json({ message: "Email updated.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const data = req.body;
    if (req.files) {
      if (req.files.logo) {
        data.logo = req.files.logo[0].filename;
      }
      if (req.files.favicon) {
        data.favicon = req.files.favicon[0].filename;
      }
      if (req.files.footer_icon) {
        data.footer_icon = req.files.footer_icon[0].filename;
      }
      if (req.files.profile) {
        data.profile = req.files.profile[0].filename;
      }
    }
    const preData = await Admin.findById(req.params._id);
    if (preData) {
      if (preData.password) {
        data.password = preData.password;
      }
      if (preData.email) {
        data.email = preData.email;
      }
      if (preData.logo) {
        if (fs.existsSync(preData.logo)) {
          fs.unlinkSync(preData.logo);
        }
      }
      if (preData.favicon) {
        if (fs.existsSync(preData.favicon)) {
          fs.unlinkSync(preData.favicon);
        }
      }
      if (preData.footer_icon) {
        if (fs.existsSync(preData.footer_icon)) {
          fs.unlinkSync(preData.footer_icon);
        }
      }
      if (preData.profile) {
        if (fs.existsSync(preData.profile)) {
          fs.unlinkSync(preData.profile);
        }
      }
    }
    const response = await Admin.updateOne(req.params, { $set: data });
    res.status(200).json({ message: "Data Received.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const readAdminProfileData = async (req, res) => {
  try {
    const response = await Admin.find();
    res
      .status(200)
      .json({ message: "Data fetched successfullly.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = {
  adminRegister,
  loginAdmin,
  updateEmail,
  generateOtp,
  updateAdminProfile,
  readAdminProfileData,
};
