const express = require("express");
const { getProducts } = require("../../../controllers/controller");

const ProductRouter = express.Router();

ProductRouter.get("/get-all-products", getProducts);

module.exports = ProductRouter;
