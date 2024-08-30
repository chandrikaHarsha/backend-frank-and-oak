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
      text: `your otp is ${otp}. It is valid for 30s.`,
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
    const { _id } = req.params;
    const otpMapVariable = otpMap;
    console.log(_id, otpMapVariable.get("chandrikaharsha610@gmail.com"));
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { adminRegister, loginAdmin, updateEmail, generateOtp };
