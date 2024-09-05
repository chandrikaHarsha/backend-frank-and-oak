const express = require("express");
const adminRouter = require("./routes/admin/admin/admin");
const sizeRouter = require("./routes/admin/size/size");
const parentCategoryRoutes = require("./routes/admin/parent-category/parentCategory");

const allRoutes = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();

// ADMIN PANEL ROUTES
adminRouter.use("/admin", adminRouter);
adminRouter.use("/size", sizeRouter);
adminRouter.use("/parent-category", parentCategoryRoutes);


// WEBSITE ROUTES

allRoutes.use("/admin-panel", adminRouter);
allRoutes.use("frankandoak-services", websiteRouter);

module.exports = allRoutes;
