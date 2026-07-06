const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

// Public Route
router.get("/", getSettings);

// Protected Route
router.put("/", protect, updateSettings);

module.exports = router;