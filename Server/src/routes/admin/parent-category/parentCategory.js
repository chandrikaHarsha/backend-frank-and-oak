const express = require("express");
const {
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
  updateCategory,
  deleteParentCategory,
  deleteMultipleParentCategories,
  ActiveParentCategory,
} = require("../../../controllers/controller");

const parentCategoryRoutes = express.Router();

parentCategoryRoutes.post("/insert-parent-category", parentCategories);
parentCategoryRoutes.get("/read-parent-category", readParentCategory);
parentCategoryRoutes.put("/update-status/:_id", updateStatus);
parentCategoryRoutes.get(
  "/update-parent-category-by-id/:_id",
  readParentCategoryById
);
parentCategoryRoutes.put("/update-parent-category/:_id", updateCategory);
parentCategoryRoutes.delete(
  "/delete-parent-category/:_id",
  deleteParentCategory
);
parentCategoryRoutes.post(
  "/delete-parent-category",
  deleteMultipleParentCategories
);
parentCategoryRoutes.get(
  "/read-active-parent-categories",
  ActiveParentCategory
);

module.exports = parentCategoryRoutes;
