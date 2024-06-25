const express = require("express");
const Painting = require("../models/Paintings");
const router = express.Router();
const Messages = require("../messages/messages");
const {
  createArtist,
  getAllArtists,
  getArtistById,
  deleteArtist,
  updateArtist,
} = require("../controller/artistController");

router.get("/", getAllArtists);

router.post("/", createArtist);

router.get("/:id", getArtistById);

router.delete("/:id", deleteArtist);

router.put("/:id", updateArtist);

module.exports = router;
