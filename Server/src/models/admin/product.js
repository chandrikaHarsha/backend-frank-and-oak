const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: String,
  short_description: String,
  thumbnail: String,
  hover_thumbnail: String,
  images: Object,
  price: {
    type: Number,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  },
  product_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product_category",
    required: true,
  },
  stock: {
    type: Boolean,
    default: true,
  },
  brand: String,
  size: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sizes",
      required: true,
    },
  ],
  color: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colors",
      required: true,
    },
  ],
  status: { type: Boolean, required: true, default: true },

  created_at: {
    type: Date,
  },
  update_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

productSchema.pre("save", (next) => {
  this.created_at = new Date();
  next();
});

productSchema.pre("updateOne", (next) => {
  this.updated_at = new Date();
  next();
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
