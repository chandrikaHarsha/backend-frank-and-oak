const Address = require("../../../../models/users/address");

const addAddress = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: "User does not exist." });
    }
    const data = JSON.parse(req.body.body);
    if (data) {
      data.user_id = req.user._id;
    }
    const responseToSave = new Address(data);
    const response = await responseToSave.save();
    res
      .status(200)
      .json({ message: "Address added successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const readAddress = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: "User does not exist." });
    }
    const response = await Address.find({ user_id: req.user._id });
    res
      .status(200)
      .json({ message: "Address added successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addAddress,
  readAddress,
};
