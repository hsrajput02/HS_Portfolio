const Skill = require("../models/Skill");

// Get All Skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Skill
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Skill
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Skill
const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};