const mongoose = require("mongoose");
const { created_at } = require("./user");

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  contact_number: {
    type: Number,
    required: true,
  },
  shipping_address: {
    type: Boolean,
    required: true,
    default: false,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

addressSchema.pre("save", (next) => {
  this.created_at = new Date();
  next();
});

addressSchema.pre("updateOne", (next) => {
  this.updated_at = new Date();
  next();
});

const Address = mongoose.model("addresses", addressSchema);

module.exports = Address;
