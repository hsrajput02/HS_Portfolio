const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    issuer: {
      type: String,
      required: true,
    },

    issueDate: {
      type: String,
      required: true,
    },

    credentialId: {
      type: String,
      default: "",
    },

    credentialUrl: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);