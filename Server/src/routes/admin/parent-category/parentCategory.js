const express = require("express");
const {
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
} = require("../../../controllers/controller");

const parentCategoryRoutes = express.Router();

parentCategoryRoutes.post("/insert-parent-category", parentCategories);
parentCategoryRoutes.get("/read-parent-category", readParentCategory);
parentCategoryRoutes.put("/update-status/:_id", updateStatus);
parentCategoryRoutes.get(
  "/update-parent-category-by-id/:_id",
  readParentCategoryById
);

module.exports = parentCategoryRoutes;
