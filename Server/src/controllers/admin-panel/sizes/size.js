const size = require("./../../../models/admin/size");

const Size = async (req, res) => {
  try {
    const data = req.body;
    const dataToSave = new size(data);
    const response = dataToSave.save();
    res.status(200).json({ message: "Size Information Inserted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { Size };
