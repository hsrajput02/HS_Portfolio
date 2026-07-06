const Experience = require("../models/Experience");

// Get All
const getExperiences = async (req, res) => {
  try {

    const experiences = await Experience.find().sort({
      order: 1,
    });

    res.json({
      success: true,
      data: experiences,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Create
const createExperience = async (req, res) => {
  try {

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update
const updateExperience = async (req, res) => {
  try {

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json({
      success: true,
      data: experience,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete
const deleteExperience = async (req, res) => {
  try {

    await Experience.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Experience deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};