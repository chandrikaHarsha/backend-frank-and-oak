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

const readSize = async (req, res) => {
  try {
    const response = await size.find();
    res.status(200).json({
      message: "Size information fetched successfully.",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateSizeStatus = async (req, res) => {
  try {
    const response = await size.updateOne(req.params, {
      $set: {
        status: req.body.newStatus,
      },
    });
    res.status(200).json({ message: "Status updated.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { Size, readSize, updateSizeStatus };
