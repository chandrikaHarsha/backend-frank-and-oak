const Size = require("../../../../models/admin/size");

const getSizes = async (req, res) => {
  try {
    const response = await Size.find();
    res
      .status(200)
      .json({ message: "Available product sizes fetched.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error." });
  }
};

module.exports = { getSizes };
