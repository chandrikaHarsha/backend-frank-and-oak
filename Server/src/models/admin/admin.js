const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  profile: String,
  fb: String,
  instagram: String,
  LinkedIn: String,
  twitter: String,
  youtube: String,
  pinterest: String,
  logo: String,
  favicon: String,
  footer_icon: String,
  password: String,
  email: String,
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;
