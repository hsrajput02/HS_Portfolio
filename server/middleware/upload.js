const multer = require("multer");
const path = require("path");

// Store files temporarily in uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {

  const allowedTypes = [

    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",

    "application/pdf",

  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only Images and PDF files are allowed"
      ),
      false
    );

  }

};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;