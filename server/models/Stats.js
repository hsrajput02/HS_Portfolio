const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(

  {

    projects: {

      type: String,

      default: "0+",

    },

    internships: {

      type: String,

      default: "0+",

    },

    technologies: {

      type: String,

      default: "0+",

    },

    dsaProblems: {

      type: String,

      default: "0+",

    },

  },

  {

    timestamps: true,

  }

);

module.exports = mongoose.model(
  "Stats",
  statsSchema
);