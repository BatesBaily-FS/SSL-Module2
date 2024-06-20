const Paintings = require("../models/Paintings");

const getAllPaintings = async (req, res) => {
  const paintings = await Paintings.find({});

  try {
    res.status(200).json({
      data: paintings,
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
    const newPainting = await Paintings.create(req.body.painting);
    console.log("data >>>", newPainting);
    res.status(200).json({
      data: newPainting,
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
