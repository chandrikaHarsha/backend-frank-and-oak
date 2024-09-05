const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema({
  size: "String",
  sizeOrder: "String",
  status: "Boolean",
});

const Size = mongoose.model("sizes", sizeSchema);

module.exports = Size;
