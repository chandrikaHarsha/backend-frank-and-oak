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

module.exports = { parentCategories };
