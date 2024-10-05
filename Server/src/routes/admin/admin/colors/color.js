const express = require("express");
const {
  insertColor,
  readColor,
  updateColorStatus,
  readColorById,
  updateColor,
  deleteColor,
  deleteMultipleColor,
} = require("../../../../controllers/controller");

const colorRouter = express.Router();

colorRouter.post("/insert-color", insertColor);
colorRouter.get("/read-color", readColor);
colorRouter.put("/update-color-status/:_id", updateColorStatus);
colorRouter.get("/read-color-by-id/:_id", readColorById);
colorRouter.put("/update-color/:_id", updateColor);
colorRouter.delete("/delete-color/:_id", deleteColor);
colorRouter.post("/delete-colors", deleteMultipleColor);

module.exports = colorRouter;
