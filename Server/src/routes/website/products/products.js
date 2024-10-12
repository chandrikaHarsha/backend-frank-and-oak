const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../../../controllers/controller");

const ProductRouter = express.Router();

ProductRouter.get("/get-all-products", getProducts);
ProductRouter.get("/get-product-by-id/:_id", getProductById);

module.exports = ProductRouter;
