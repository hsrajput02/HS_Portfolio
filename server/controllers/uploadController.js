const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const isPdf =
      req.file.mimetype === "application/pdf";

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "portfolio",

        resource_type: isPdf
          ? "raw"
          : "image",
      }
    );

    // Delete the temporary local file
    fs.unlinkSync(req.file.path);

    res.status(200).json({

  success: true,

  fileUrl: result.secure_url,

  public_id: result.public_id,

});

  } catch (error) {

    // Clean up temp file if upload fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadFile,
};