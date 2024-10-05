const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  product_category_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  thumbnail: String,
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parent_categories",
    required: true,
  },
  description: String,
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

const ProductCategory = mongoose.model(
  "product_category",
  productCategorySchema
);

module.exports = ProductCategory;
