const express = require("express");
const {
  Size,
  readSize,
  updateSizeStatus,
  readSizeById,
  updateSize,
  deleteSize,
  deleteMultipleSize,
} = require("../../../controllers/controller");

const sizeRouter = express.Router();

sizeRouter.post("/insert-size", Size);
sizeRouter.get("/read-size", readSize);
sizeRouter.put("/update-size-status/:_id", updateSizeStatus);
sizeRouter.get("/read-size-by-id/:_id", readSizeById);
sizeRouter.put("/update-size/:_id", updateSize);
sizeRouter.delete("/delete-size/:_id", deleteSize);
sizeRouter.post("/delete-sizes", deleteMultipleSize);

module.exports = sizeRouter;
