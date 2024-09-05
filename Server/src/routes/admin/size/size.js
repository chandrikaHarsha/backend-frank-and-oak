const express = require("express");
const { Size } = require("../../../controllers/controller");

const sizeRouter = express.Router();

sizeRouter.post("/insert-size", Size);

module.exports = sizeRouter;
