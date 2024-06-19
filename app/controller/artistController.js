const Artists = require("../models/Artists");

const getAllArtists = async (req, res) => {
  const artists = await Artists.find({});

  try {
    res.status(200).json({
      data: artists,
      success: true,
      message: `${req.method} - request to Artist endpoint`,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      console.error("Error Validation!", error);
      res.status(422).json(error);
    } else {
      console.error(error);
      res.status(500).json(error);
    }
  }
};

const createArtist = async (req, res) => {
  const { artist } = req.body;

  try {
    const newArtist = await Artists.create(artist);
    console.log("data >>>", newArtist);
    res.status(200).json({
      success: true,
      message: `${req.method} - request to Artist endpoint`,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      console.error("Error Validation!", error);
      res.status(422).json(error);
    } else {
      console.error(error);
      res.status(500).json(error);
    }
  }
};

const getArtistById = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artists.findById(id, req.body, { found: true });
    res.status(200).json({
      id,
      success: true,
      message: `${req.method} - request to Artist endpoint`,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      console.error("Error Validation!", error);
      res.status(422).json(error);
    } else {
      console.error(error);
      res.status(500).json(error);
    }
  }
};

const updateArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artists.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: artist,
      success: true,
      message: `${req.method} - request to Artist endpoint`,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      console.error("Error Validation!", error);
      res.status(422).json(error);
    } else {
      console.error(error);
      res.status(500).json(error);
    }
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artists.findByIdAndDelete(id, req.body, {
      deleted: true,
    });
    res.status(200).json({
      id,
      success: true,
      message: `${req.method} - request to Artist endpoint`,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      console.error("Error Validation!", error);
      res.status(422).json(error);
    } else {
      console.error(error);
      res.status(500).json(error);
    }
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
