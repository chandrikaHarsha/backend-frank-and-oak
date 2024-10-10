const Color = require("../../../../models/admin/color");

const getColors = async (req, res) => {
  try {
    const response = await Color.find();
    res
      .status(200)
      .json({ message: "Available Product colors fetched.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { getColors };
