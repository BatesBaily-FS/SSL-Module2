const router = require("express").Router();
const {
  createPainting,
  getAllPaintings,
  getPaintingById,
  updatePainting,
  deletePainting,
} = require("../controller/paintingController");

router.get("/", getAllPaintings);

router.post("/", createPainting);

router.get("/:id", getPaintingById);

router.put("/:id", updatePainting);

router.delete("/:id", deletePainting);

module.exports = router;
