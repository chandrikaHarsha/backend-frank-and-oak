const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shop_for: {
    type: String,
  },
  newsletter_subscription: {
    type: Boolean,
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

userSchema.pre("save", (next) => {
  this.created_at = Date();
  next();
});
userSchema.pre("updateOne", (next) => {
  this.updated_at = Date();
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
