const mongoose = require("mongoose");

const artistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You are required to have an Artist name"],
    unique: [true, "You can only have one artist with this name"],
    trim: true,
    maxlength: [50, "Your name is too long"],
  },
  yearBorn: {
    type: Number,
    required: true,
  },

  medium: {
    type: String,
    required: true,
    maxlength: [50, "can not exceed 50 characters"],
  },

  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, "Description can't be more than 500 characters"],
  },
  paintings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Painting",
    },
  ],
  totalPaintings: Number,
});

module.exports = mongoose.model("Artist", artistsSchema);
