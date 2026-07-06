const express = require("express");

const router = express.Router();

const {

  getStats,

  updateStats,

} = require("../controllers/statsController");

const auth = require("../middleware/authMiddleware");

/* Public */

router.get("/", getStats);

/* Admin */

router.put("/", auth, updateStats);

module.exports = router;