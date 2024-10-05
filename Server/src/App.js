const express = require("express");
const adminRouter = require("./routes/admin/admin/admin");
const sizeRouter = require("./routes/admin/size/size");
const parentCategoryRoutes = require("./routes/admin/parent-category/parentCategory");
const colorRouter = require("./routes/admin/admin/colors/color");
const productCategoryRouter = require("./routes/admin/admin/product-category/productCategory");
const productRouter = require("./routes/admin/product/product");
const storyRouter = require("./routes/admin/story/story");
const userRouter = require("./routes/website/user-registration/user");
const addressRouter = require("./routes/website/user-address/userAddress");

const allRoutes = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();

// ADMIN PANEL ROUTES
adminRouter.use("/admin", adminRouter);
adminRouter.use("/size", sizeRouter);
adminRouter.use("/parent-category", parentCategoryRoutes);
adminRouter.use("/color", colorRouter);
adminRouter.use("/product-category", productCategoryRouter);
adminRouter.use("/products", productRouter);
adminRouter.use("/stories", storyRouter);

// WEBSITE ROUTES
websiteRouter.use("/users", userRouter);
websiteRouter.use("/address", addressRouter);

allRoutes.use("/admin-panel", adminRouter);
allRoutes.use("/frankandoak-services", websiteRouter);

module.exports = allRoutes;
