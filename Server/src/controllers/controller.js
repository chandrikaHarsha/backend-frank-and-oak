// Admin Profile
const {
  adminRegister,
  loginAdmin,
  updateEmail,
  generateOtp,
  updateAdminProfile,
} = require("./admin-panel/admin/adminControllers");
const {
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
} = require("./admin-panel/parent-category/parentCategory");
// Size
const { Size } = require("./admin-panel/sizes/size");
// admin controllers

module.exports = {
  adminRegister,
  loginAdmin,
  updateEmail,
  generateOtp,
  updateAdminProfile,
  Size,
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
};
