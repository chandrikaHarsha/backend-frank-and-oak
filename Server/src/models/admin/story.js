const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: String,
  image: String,
  banner: String,
  status: Boolean,
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

storySchema.pre("save", (next) => {
  this.created_at = new Date();
  next();
});

storySchema.pre("updateOne", (next) => {
  this.updated_at = new Date();
  next();
});

const Story = mongoose.model("stories", storySchema);

module.exports = Story;
