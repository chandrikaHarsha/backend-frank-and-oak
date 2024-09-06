const express = require("express");
const { Size, readSize, updateSizeStatus } = require("../../../controllers/controller");

const sizeRouter = express.Router();

sizeRouter.post("/insert-size", Size);
sizeRouter.get("/read-size", readSize);
sizeRouter.put("/update-size-status/:_id",updateSizeStatus)

module.exports = sizeRouter;
