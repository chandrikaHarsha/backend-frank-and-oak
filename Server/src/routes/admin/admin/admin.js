const express= require('express');
const { loginAdmin } = require('../../../controllers/controller');

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);



module.exports = adminRouter;