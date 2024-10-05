const Color = require("../../../models/admin/color");

const insertColor = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    const dataToSave = new Color(data);
    const response = dataToSave.save();

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

const readColor = async (req, res) => {
  try {
    const response = await Color.find();

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

const updateColorStatus = async (req, res) => {
  try {
    const response = await Color.updateOne(req.params, {
      $set: { status: req.body.newStatus },
    });

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

const readColorById = async (req, res) => {
  try {
    const response = await Color.findById(req.params._id);
    // console.log(response);

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

const updateColor = async (req, res) => {
  try {
    const { color, colorCode } = req.body;
    const response = await Color.updateOne(req.params, {
      $set: { color, colorCode },
    });

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

const deleteColor = async (req, res) => {
  try {
    const response = await Color.deleteOne(req.params);

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

const deleteMultipleColor = async (req, res) => {
  try {
    const response = await Color.deleteMany({ _id: { $in: req.body._ids } });

    res
      .status(200)
      .json({ message: "Color inserted successfully.", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.log(error);
  }
};

module.exports = {
  insertColor,
  readColor,
  updateColorStatus,
  readColorById,
  updateColor,
  deleteColor,
  deleteMultipleColor,
};
