const mongoose = require("mongoose");
const {
  adminRegister,
} = require("../controllers/admin-panel/admin/adminControllers");
require("dotenv").config();

url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@frankandoak.1nytz.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=${process.env.DATABASE_APP_NAME}`;

mongoose
  .connect(url)
  .then(() => {
    console.log("database connected");
    adminRegister();
  })
  .catch((error) => {
    console.log("Something went wrong", error);
  });
