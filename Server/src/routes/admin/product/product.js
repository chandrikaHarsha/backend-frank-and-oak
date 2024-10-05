const express = require("express");
const {
  addProducts,
  readProducts,
  updateProductStatus,
  deleteSingleProduct,
  updateProductFindById,
  updateProduct,
  multiDeleteProduct,
} = require("../../../controllers/controller");
const { productStorage } = require("../../../middlewares/multer");
const multer = require("multer");

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  multer({ storage: productStorage }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "hover_thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  addProducts
);

productRouter.get("/read-products", readProducts);
productRouter.put("/update-product-status/:_id", updateProductStatus);
productRouter.delete("/delete-product/:_id", deleteSingleProduct);
productRouter.get("/update-product-by-id/:_id", updateProductFindById);
productRouter.put(
  "/update-product/:_id",
  multer({ storage: productStorage }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "hover_thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProduct
);

productRouter.put("/multi-delete-products", multiDeleteProduct);

module.exports = productRouter;
