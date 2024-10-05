const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
  color: "String",
  colorCode: "String",
  status: "Boolean",
});

const Color = mongoose.model("colors", colorSchema);

module.exports = Color;
