const express = require("express");
const multer = require("multer");
const { storyStorage } = require("../../../middlewares/multer");
const {
  addStory,
  readStory,
  updateStoryStatus,
  deleteStory,
  readStoryById,
  updateStory,
  multiDeleteStory,
} = require("../../../controllers/controller");

const storyRouter = express.Router();

storyRouter.post(
  "/add-story",
  multer({ storage: storyStorage }).fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  addStory
);
storyRouter.get("/read-stories", readStory);
storyRouter.put("/update-status/:_id", updateStoryStatus);
storyRouter.delete("/delete-story/:_id", deleteStory);
storyRouter.get("/read-story-by-id/:_id", readStoryById);
storyRouter.put(
  "/update-story/:_id",
  multer({ storage: storyStorage }).fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateStory
);

storyRouter.put("/multi-delete",multiDeleteStory)

module.exports = storyRouter;
