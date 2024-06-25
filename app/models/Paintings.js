const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema({
  paintingName: {
    type: String,
    required: true,
    unique: true,
    maxlength: [50, "Name can not exceed 50 characters"],
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },

  dateReleased: {
    type: String,
    required: true,
  },

  medium: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
    maxlength: [100, "Name can not exceed 50 characters"],
  },
});

module.exports = mongoose.model("Painting", paintingSchema);
