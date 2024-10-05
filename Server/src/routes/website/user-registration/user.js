const express = require("express");
const multer = require("multer");
const {
  userPasswordHashingAndGenerateOTP,
  userRegistration,
  userLogin,
  readUser,
  updateUserInfo,
  updateUserPassword,
  userGenerateOTPForForgotPassword,
  userUpdateForgotPassword,
} = require("../../../controllers/controller");
const {
  verifyingAuthToken,
  verifyingAuthTokenForUserUpdate,
} = require("../../../middlewares/verifyJWT");

const userRouter = express.Router();

userRouter.post(
  "/generate-otp",
  multer().none(),
  userPasswordHashingAndGenerateOTP
);

userRouter.post("/user-registration", multer().none(), userRegistration);
userRouter.post("/user-login", multer().none(), userLogin);
userRouter.get("/read-user", verifyingAuthToken, readUser);
userRouter.put(
  "/update-user-data",
  multer().none(),
  verifyingAuthTokenForUserUpdate,
  updateUserInfo
);
userRouter.put(
  "/update-password",
  multer().none(),
  verifyingAuthTokenForUserUpdate,
  updateUserPassword
);

userRouter.post(
  "/forgot-password/generate-otp",
  multer().none(),
  verifyingAuthTokenForUserUpdate,
  userGenerateOTPForForgotPassword
);

userRouter.put(
  "/update-forgot-password",
  multer().none(),
  verifyingAuthTokenForUserUpdate,
  userUpdateForgotPassword
);

module.exports = userRouter;
