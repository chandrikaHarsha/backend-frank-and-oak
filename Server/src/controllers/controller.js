// admin controllers

// Admin Profile
const {
  adminRegister,
  loginAdmin,
  updateEmail,
  generateOtp,
  updateAdminProfile,
  readAdminProfileData,
} = require("./admin-panel/admin/adminControllers");

// colors
const {
  insertColor,
  readColor,
  updateColorStatus,
  readColorById,
  updateColor,
  deleteColor,
  deleteMultipleColor,
} = require("./admin-panel/colors/color");

// parentCategory controllers
const {
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
  updateCategory,
  deleteParentCategory,
  deleteMultipleParentCategories,
  ActiveParentCategory,
} = require("./admin-panel/parent-category/parentCategory");

// product Category

const {
  addProductCategory,
  readProductCategory,
  updateProductCategoryStatus,
  readProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
  multiDeleteProductCategory,
  activeProductCategory,
} = require("./admin-panel/product-category/productCategory");

// product
const {
  addProducts,
  readProducts,
  updateProductStatus,
  deleteSingleProduct,
  updateProductFindById,
  updateProduct,
  multiDeleteProduct,
} = require("./admin-panel/product/product");

// Size
const {
  Size,
  readSize,
  updateSizeStatus,
  readSizeById,
  updateSize,
  deleteSize,
  deleteMultipleSize,
} = require("./admin-panel/sizes/size");

// story controllers
const {
  addStory,
  readStory,
  updateStoryStatus,
  deleteStory,
  readStoryById,
  updateStory,
  multiDeleteStory,
} = require("./admin-panel/story/stroy");
// colors for product page
const {
  getColors,
} = require("./website/users/available-product-colors/availableProductColors");

// sizes for product page
const { getSizes } = require("./website/users/product-sizes/productSizes");

const { getProducts } = require("./website/users/products/products");

// User Address
const {
  addAddress,
  readAddress,
} = require("./website/users/user-address/userAddress");

// user controller
const {
  userPasswordHashingAndGenerateOTP,
  userRegistration,
  userLogin,
  readUser,
  updateUserInfo,
  updateUserPassword,
  userGenerateOTPForForgotPassword,
  userUpdateForgotPassword,
} = require("./website/users/user-registration/userRegistration");

module.exports = {
  adminRegister,
  loginAdmin,
  updateEmail,
  generateOtp,
  updateAdminProfile,
  readAdminProfileData,
  Size,
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
  updateCategory,
  deleteParentCategory,
  readSize,
  updateSizeStatus,
  readSizeById,
  updateSize,
  deleteSize,
  insertColor,
  readColor,
  updateColorStatus,
  readColorById,
  updateColor,
  deleteColor,
  deleteMultipleParentCategories,
  deleteMultipleSize,
  deleteMultipleColor,
  addProductCategory,
  ActiveParentCategory,
  readProductCategory,
  updateProductCategoryStatus,
  readProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
  multiDeleteProductCategory,
  activeProductCategory,
  addProducts,
  readProducts,
  updateProductStatus,
  deleteSingleProduct,
  updateProductFindById,
  updateProduct,
  multiDeleteProduct,
  addStory,
  readStory,
  updateStoryStatus,
  deleteStory,
  readStoryById,
  updateStory,
  multiDeleteStory,
  userPasswordHashingAndGenerateOTP,
  userRegistration,
  userLogin,
  readUser,
  updateUserInfo,
  updateUserPassword,
  userGenerateOTPForForgotPassword,
  userUpdateForgotPassword,
  addAddress,
  readAddress,
  getSizes,
  getColors,
  getProducts,
};
