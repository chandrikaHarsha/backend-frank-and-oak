const express = require("express");
const {
  addProductCategory,
  readProductCategory,
  updateProductCategoryStatus,
  readProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
  multiDeleteProductCategory,
  activeProductCategory,
} = require("../../../../controllers/controller");
const { ProductCategory } = require("../../../../middlewares/multer");

const productCategoryRouter = express.Router();

productCategoryRouter.post(
  "/add-product-category",
  ProductCategory,
  addProductCategory
);

productCategoryRouter.get("/read-product-category", readProductCategory);
productCategoryRouter.put(
  "/update-product-category-status/:_id",
  updateProductCategoryStatus
);

productCategoryRouter.get(
  "/read-product-category-by-id/:_id",
  readProductCategoryById
);

productCategoryRouter.put(
  "/update-product-category/:_id",
  ProductCategory,
  updateProductCategory
);

productCategoryRouter.delete(
  "/delete-product-category/:_id",
  deleteProductCategory
);

productCategoryRouter.put(
  "/multi-delete-product-categories",
  multiDeleteProductCategory
);

productCategoryRouter.get("/active-product-categories", activeProductCategory);

module.exports = productCategoryRouter;
