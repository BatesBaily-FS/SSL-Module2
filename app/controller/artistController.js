const Artists = require("../models/Artists");

const getAllArtists = async (req, res) => {
  let queryString = JSON.stringify(req.query);

  queryString = queryString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  query = Artists.find(JSON.parse(queryString));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = Artists.find({}).sort(sortBy);
  } else {
    query = Artists.find({});
  }

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = Artists.find({}).select(fields);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  query.skip(skip).limit(limit);

  const artists = await query;

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
    res.status(201).json({
      success: true,
      message: `${req.method} - request to Artist endpoint`,
      data: {
        _id: newArtist._id,
        name: newArtist.name,
        yearBorn: newArtist.yearBorn,
      },
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
    const artist = await Artists.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
