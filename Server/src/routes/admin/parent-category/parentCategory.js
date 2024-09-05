const express = require("express");
const { parentCategories } = require("../../../controllers/controller");

const parentCategoryRoutes = express.Router();

parentCategoryRoutes.post("/insert-parent-category", parentCategories);

module.exports = parentCategoryRoutes;
