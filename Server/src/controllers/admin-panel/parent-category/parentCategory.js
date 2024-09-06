const parentCategory = require("../../../models/admin/parentCategory");

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
    res.status(200).json({ message: "Status updated.", data: "response" });
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

module.exports = {
  parentCategories,
  readParentCategory,
  updateStatus,
  readParentCategoryById,
};
