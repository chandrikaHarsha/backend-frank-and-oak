const express = require("express");
const {
  verifyingAuthTokenForUserUpdate,
  verifyingAuthToken,
} = require("../../../middlewares/verifyJWT");
const { addAddress, readAddress } = require("../../../controllers/controller");
const multer = require("multer");

const addressRouter = express.Router();

addressRouter.post(
  "/add-address",
  multer().none(),
  verifyingAuthTokenForUserUpdate,
  addAddress
);

addressRouter.get(
  "/read-address",
  multer().none(),
  verifyingAuthToken,
  readAddress
);

module.exports = addressRouter;
