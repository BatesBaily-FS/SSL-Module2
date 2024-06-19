const express = require("express");
const router = express.Router();
const artistRoutes = require("./artistRoutes");
const paintingRoutes = require("./paintingRoutes");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - Request made` });
});

router.use("/artist", artistRoutes);
router.use("/painting", paintingRoutes);

module.exports = router;
