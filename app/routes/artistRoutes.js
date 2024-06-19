const router = require("express").Router();
const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} = require("../controller/artistController");

router.get("/", getAllArtists);

router.post("/", createArtist);

router.get("/:id", getArtistById);

router.put("/:id", updateArtist);

router.delete("/:id", deleteArtist);

module.exports = router;
