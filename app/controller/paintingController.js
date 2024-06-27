const Paintings = require("../models/Paintings");
const Artist = require("../models/Artists");

const getAllPaintings = async (req, res) => {
  let queryString = JSON.stringify(req.query);

  queryString = queryString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  query = Paintings.find(JSON.parse(queryString));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = Paintings.find({}).sort(sortBy);
  } else {
    query = Paintings.find({});
  }

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = Paintings.find({}).select(fields);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  query.skip(skip).limit(limit);

  const painting = await query;

  try {
    res.status(200).json({
      data: painting,
      success: true,
      message: `${req.method} - request to Painting endpoint`,
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

const createPainting = async (req, res) => {
  try {
    const { painting } = req.body;
    const user = await Artist.findById(painting.artist);

    if (!user) {
      return res.status(404).json({ error: "Artist not found" });
    }

    painting.artist = user;
    const paintingData = new Paintings(painting);
    user.paintings.push(paintingData._id);
    user.totalPaintings = user.paintings.length;
    const queries = [paintingData.save(), user.save()];
    await Promise.all(queries);

    res.status(201).json({
      data: paintingData,
      success: true,
      message: `${req.method} - request to Paintings endpoint`,
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

const getPaintingById = async (req, res) => {
  const { id } = req.params;

  try {
    const painting = await Paintings.findById(id);
    res.status(200).json({
      data: painting,
      success: true,
      message: `${req.method} - request to Paintings endpoint`,
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

const updatePainting = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPainting = await Paintings.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      data: updatedPainting,
      success: true,
      message: `${req.method} - request to Painting endpoint`,
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

const deletePainting = async (req, res) => {
  const { id } = req.params;

  try {
    const paintings = await Paintings.findByIdAndDelete(id, req.body);
    res.status(200).json({
      id,
      success: true,
      message: `${req.method} - request to Paintings endpoint`,
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
  createPainting,
  getAllPaintings,
  getPaintingById,
  updatePainting,
  deletePainting,
};
