const Certificate = require("../models/Certificate");

// Get All
const getCertificates = async (req, res) => {
  try {

    const certificates = await Certificate.find().sort({
      order: 1,
    });

    res.json({
      success: true,
      data: certificates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Create
const createCertificate = async (req, res) => {
  try {

    const certificate = await Certificate.create(req.body);

    res.status(201).json({
      success: true,
      data: certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update
const updateCertificate = async (req, res) => {
  try {

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json({
      success: true,
      data: certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete
const deleteCertificate = async (req, res) => {
  try {

    await Certificate.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Certificate deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};