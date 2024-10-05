const Product = require("../../../models/admin/product");
const ProductCategory = require("../../../models/admin/productCategory");

const addProductCategory = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.thumbnail = req.file.filename;
    }
    // console.log(data);
    const dataToSave = new ProductCategory(data);
    const response = await dataToSave.save();

    res.status(200).json({
      message: "Product Category Added Successfully.",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const readProductCategory = async (req, res) => {
  try {
    const response = await ProductCategory.find().populate("parent_category");
    const path = `${req.protocol}://${req.get("host")}/frankandoak/`;

    res.status(200).json({
      message: "Product Category Added Successfully.",
      data: response,
      path: path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const updateProductCategoryStatus = async (req, res) => {
  try {
    const response = await ProductCategory.updateOne(req.params, {
      $set: { status: req.body.newStatus },
    });

    res.status(200).json({
      message: "Product Category Added Successfully.",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const readProductCategoryById = async (req, res) => {
  try {
    const response = await ProductCategory.findById(req.params).populate(
      "parent_category"
    );
    const path = `${req.protocol}://${req.get("host")}/frankandoak/`;

    res.status(200).json({
      message: "Product Category Added Successfully.",
      data: response,
      filepath: path,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const updateProductCategory = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.thumbnail = req.file.filename;
    }
    const response = await ProductCategory.updateOne(req.params, {
      $set: data,
    });
    // console.log(data, req.params);
    res.status(200).json({
      message: "Product category updated successfully.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const response = await ProductCategory.deleteOne(req.params);

    await Product.deleteMany({ product_category: req.params._id });
    res.status(200).json({
      message: "Product Category deleted successfully.",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const multiDeleteProductCategory = async (req, res) => {
  try {
    const response = await ProductCategory.deleteMany({
      _id: { $in: req.body._ids },
    });

    await Product.deleteMany({ product_category: req.body._ids });
    res.status(200).json({
      message: "dProduct Categories Deleted Successfully.",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const activeProductCategory = async (req, res) => {
  try {
    const response = await ProductCategory.find({ status: true });

    if (!response)
      return res
        .status(404)
        .json({ message: "No Active Parent Categories found." });

    res
      .status(200)
      .json({ message: "Active Parent Categories fetched.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addProductCategory,
  readProductCategory,
  updateProductCategoryStatus,
  readProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
  multiDeleteProductCategory,
  activeProductCategory,
};
