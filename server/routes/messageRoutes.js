const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

  getMessages,
  createMessage,
  deleteMessage,
  markAsRead,

} = require("../controllers/messageController");

// Public
router.post("/", createMessage);

// Admin
router.get("/", protect, getMessages);

router.delete("/:id", protect, deleteMessage);

router.put("/:id/read", protect, markAsRead);

module.exports = router;