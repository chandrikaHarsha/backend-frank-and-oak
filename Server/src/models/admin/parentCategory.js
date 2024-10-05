const mongoose = require("mongoose");

const parentCategorySchema = new mongoose.Schema({
  name: "String",
  description: "String",
  status: "Boolean",
});

const parentCategory = mongoose.model(
  "parent_categories",
  parentCategorySchema
);

module.exports = parentCategory;
