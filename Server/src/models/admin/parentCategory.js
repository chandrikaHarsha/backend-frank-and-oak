const mongoose = require("mongoose");

const parentCategorySchema = mongoose.Schema({
  name: "String",
  description: "String",
  status: "String",
});

const parentCategory = mongoose.model(
  "parent_categories",
  parentCategorySchema
);

module.exports = parentCategory;
