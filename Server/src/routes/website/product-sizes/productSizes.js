const express = require("express");
const { getSizes } = require("../../../controllers/controller");

const ProductSizesRouter = express.Router();

ProductSizesRouter.get("/get-all-sizes", getSizes);

module.exports = ProductSizesRouter;
