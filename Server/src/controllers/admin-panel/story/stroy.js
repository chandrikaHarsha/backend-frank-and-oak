const Story = require("../../../models/admin/story");
const path = require("path");
const fs = require("fs");

const addStory = async (req, res) => {
  try {
    const data = req.body;
    if (req.files) {
      if (req.files.image) {
        data.image = req.files.image[0].filename;
      }
      if (req.files.banner) {
        data.banner = req.files.banner[0].filename;
      }
    }
    const dataToSave = new Story(data);
    const response = await dataToSave.save();

    res
      .status(200)
      .json({ message: "Story Added Successfully.", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const readStory = async (req, res) => {
  try {
    const response = await Story.find();
    const filename = `${req.protocol}://${req.get("host")}/frankandoak/story`;
    res
      .status(200)
      .json({ message: "Story Fetched.", data: response, filename: filename });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateStoryStatus = async (req, res) => {
  try {
    const response = await Story.updateOne(req.params, {
      $set: { status: req.body.newStatus },
    });
    res.status(200).json({ message: "Status Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStory = async (req, res) => {
  try {
    const response = await Story.deleteOne(req.params);
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const readStoryById = async (req, res) => {
  try {
    const response = await Story.findById(req.params._id);
    const filename = `${req.protocol}://${req.get("host")}/frankandoak/story`;
    res.status(200).json({
      message: "Fetched successfully.",
      data: response,
      filename: filename,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateStory = async (req, res) => {
  try {
    const data = req.body;
    if (req.files) {
      if (req.files.image) {
        data.image = req.files.image[0].filename;
      }
      if (req.files.banner) {
        data.banner = req.files.banner[0].filename;
      }
    }
    const response = await Story.updateOne(req.params, {
      $set: data,
    });
    res.status(200).json({
      message: "Story updated successfully.",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const multiDeleteStory = async (req, res) => {
  try {
    const response = await Story.deleteMany({ _id: { $in: req.body._ids } });
    res.status(200).json({ message: "deleted successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addStory,
  readStory,
  updateStoryStatus,
  deleteStory,
  readStoryById,
  updateStory,
  multiDeleteStory,
};
