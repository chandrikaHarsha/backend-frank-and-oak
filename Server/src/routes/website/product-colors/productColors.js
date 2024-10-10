const express = require("express");
const { getColors } = require("../../../controllers/controller");

const ColorRouter = express.Router();

ColorRouter.get("/get-all-colors", getColors);

module.exports = ColorRouter;
