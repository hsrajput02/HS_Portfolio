const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

  getCertificates,

  createCertificate,

  updateCertificate,

  deleteCertificate,

} = require("../controllers/certificateController");

router.get("/", getCertificates);

router.post("/", protect, createCertificate);

router.put("/:id", protect, updateCertificate);

router.delete("/:id", protect, deleteCertificate);

module.exports = router;