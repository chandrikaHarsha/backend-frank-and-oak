const express = require("express");
const {
  getProducts,
  getProductById,
  getProductsByIds,
} = require("../../../controllers/controller");
const { verifyingAuthToken } = require("../../../middlewares/verifyJWT");

const ProductRouter = express.Router();

ProductRouter.get("/get-all-products", getProducts);
ProductRouter.get("/get-product-by-id/:_id", getProductById);
ProductRouter.get(
  "/get-wish-listed-products",
  verifyingAuthToken,
  getProductsByIds
);

module.exports = ProductRouter;
