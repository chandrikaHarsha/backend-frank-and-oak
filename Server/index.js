const express = require("express");
const cors = require("cors");
const allRoutes = require("./src/App");
require("dotenv").config();
require("./src/db/config");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", allRoutes);
app.use("/frankandoak", express.static("src/uploads/"));
app.use("/frankandoak/products", express.static("src/uploads/products/"));
app.use("/frankandoak/story", express.static("src/uploads/stories/"));

app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
