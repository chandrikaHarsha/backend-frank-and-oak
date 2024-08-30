const express = require("express");
const adminRouter = require("./routes/admin/admin/admin");

const allRoutes = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();


// ADMIN PANEL ROUTES
adminRouter.use('/admin', adminRouter);



// WEBSITE ROUTES



allRoutes.use('/admin-panel', adminRouter);
allRoutes.use('frankandoak-services', websiteRouter);

module.exports = allRoutes;
