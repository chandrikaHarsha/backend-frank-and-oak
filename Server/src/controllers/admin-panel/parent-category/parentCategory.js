const parentCategory = require("../../../models/admin/parentCategory");
const Product = require("../../../models/admin/product");
const ProductCategory = require("../../../models/admin/productCategory");

const parentCategories = async (req, res) => {
  try {
    const data = req.body;
    const dataToSave = new parentCategory(data);
    const response = dataToSave.save();

    res.status(200).json({ message: "inserted", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const readParentCategory = async (req, res) => {
  try {
    const response = await parentCategory.find();
    res.status(200).json({ message: "Fetched Data", data: response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error." });
  }
};

const updateStatus = async (req, res) => {
  if (!req.params._id)
    return res.status(400).json({ message: "Please enter valid ID." });
  try {
    const response = await parentCategory.updateOne(req.params, {
      $set: { status: req.body.text },
    });
    res.status(200).json({ message: "Status updated.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const readParentCategoryById = async (req, res) => {
  try {
    const response = await parentCategory.findById(req.params._id);

    if (!response) return res.status(400).json({ message: "Id not found" });

    res.status(200).json({ message: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const response = await parentCategory.updateOne(req.params, {
      $set: {
        name,
        description,
      },
    });
    res
      .status(200)
      .json({ message: "Category updated successfully.", date: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error." });
  }
};

const deleteParentCategory = async (req, res) => {
  try {
    const response = await parentCategory.deleteOne(req.params);

    const RelationalProductCategories = await ProductCategory.find({
      parent_category: req.params._id,
    });
    await ProductCategory.deleteMany({ parent_category: req.params._id });

    const ProductCategoriesToBeDeleted = RelationalProductCategories.map(
      (ids) => ids._id
    );

    await Product.deleteMany({
      product_category: { $in: ProductCategoriesToBeDeleted },
    });

    res.status(200).json({ message: "deleted successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteMultipleParentCategories = async (req, res) => {
  try {
    const response = await parentCategory.deleteMany({
      _id: { $in: req.body._ids },
    });

    const RelationalProductCategories = await ProductCategory.find({
      parent_category: req.body._ids,
    });
    await ProductCategory.deleteMany({ parent_category: req.body._ids });

    const ProductCategoriesToBeDeleted = RelationalProductCategories.map(
      (ids) => ids._id
    );

    await Product.deleteMany({
      product_category: { $in: ProductCategoriesToBeDeleted },
    });
    res.status(200).json({ message: "deleted successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const ActiveParentCategory = async (req, res) => {
  try {
    const response = await parentCategory.find({ status: true });
    if (!response)
      return res
        .status(400)
        .json({ message: "No Active parent category found." });

    res
      .status(200)
      .json({ message: "Fetched Active parent categories.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
  updateCategory,
  deleteParentCategory,
  deleteMultipleParentCategories,
  ActiveParentCategory,
};
