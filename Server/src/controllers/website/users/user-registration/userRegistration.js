const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const User = require("./../../../../models/users/user");
const otpMap = require("../../../../variables/variables");
const userPasswordHashingAndGenerateOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_APP_PASSWORD,
      },
    });
    const otp = Math.floor(Math.random() * 1000000);

    const storeOTP = otpMap;
    storeOTP.set(email, otp);

    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: "OTP verification for Frank and oak website user registration.",
      text: `Your otp is ${otp}. it is valid for 60s.`,
    };
    transporter.sendMail(mailOptions, (error, success) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
      }
      res
        .status(200)
        .json({ message: "Mail sent for OTP based user verification." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const userRegistration = async (req, res) => {
  try {
    const { password, otp, ...data } = req.body;
    const storedOTP = otpMap;
    const verifyOTP = storedOTP.get(data.email);
    if (Number(otp) != verifyOTP) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const saltRound = 10;
    bcrypt.hash(password, saltRound, async (error, hash) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Password not hashed." });
      } else {
        data.password = hash;
      }
      //   console.log("USER: ", data);
      //   console.log("Form: ", req.body);
      const dataToSave = new User(data);
      const response = await dataToSave.save();

      const { password, ...responseWithoutPassword } = response._doc;

      res.status(200).json({
        message: "User registered successfully.",
        data: responseWithoutPassword,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal service error." });
  }
};

const userLogin = async (req, res) => {
  try {
    const data = req.body;
    const userAuthentication = await User.findOne({ email: data.email });
    if (!userAuthentication) {
      res.status(401).json({ message: "User doesn't exist." });
    }
    const { password, ...userWithoutPassword } = userAuthentication._doc;
    // const hashedPassword = userAuthentication.password;
    bcrypt.compare(req.body.password, password, (error, success) => {
      if (error) {
        res.status(400).json({ message: "Password doesn't match." });
      } else {
        JWT.sign(
          userWithoutPassword,
          process.env.JWT_ACCESS_KEY,
          (error, token) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: "Token not generated" });
            } else {
              res
                .status(200)
                .json({ message: "Logged in successfully.", auth: token });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const readUser = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "User not found." });
    }
    const response = await User.findById({ _id: req.user._id });
    res.status(200).json({ message: "Fetched Successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const updateUserInfo = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "User not found." });
    }
    const updatedData = JSON.parse(req.body.body);

    const response = await User.updateOne(
      { _id: req.user._id },
      { $set: updatedData }
    );
    res.status(200).json({ message: "Fetched Successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "User not found." });
    }
    const updatedData = JSON.parse(req.body.body);
    const { password, confirm_password } = updatedData;
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(401).json({ message: "Wrong Password." });
    } else {
      const hashedPassword = await bcrypt.hash(confirm_password, 10);
      const response = await User.updateOne(
        { _id: req.user._id },
        {
          $set: { password: hashedPassword },
        }
      );
      res
        .status(200)
        .json({ message: "Password Updated Successfully.", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const userGenerateOTPForForgotPassword = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "User not found." });
    }
    // console.log(req.body);
    const email = req.body.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_APP_PASSWORD,
      },
    });
    const otp = Math.floor(Math.random() * 1000000);

    const storeOTP = otpMap;
    storeOTP.set(email, otp);

    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: "OTP verification for Frank and oak website user registration.",
      text: `Your otp is ${otp}. it is valid for 60s.`,
    };
    transporter.sendMail(mailOptions, (error, success) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
      }
      res
        .status(200)
        .json({ message: "Mail sent for OTP based user verification." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const userUpdateForgotPassword = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not found." });
    }
    const { email, password, otp } = JSON.parse(req.body.body);
    const storedOTP = otpMap;
    const verifyOTP = storedOTP.get(email);
    if (Number(otp) != verifyOTP) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      res.status(500).json({ message: "Password not hashed." });
    } else {
      // console.log(hashedPassword);
      // console.log(req.user._id);
      const response = await User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      res
        .status(200)
        .json({ message: "Password updated successfully.", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  userPasswordHashingAndGenerateOTP,
  userRegistration,
  userLogin,
  readUser,
  updateUserInfo,
  updateUserPassword,
  userGenerateOTPForForgotPassword,
  userUpdateForgotPassword,
};
