const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({

  heroBadge: {
  type: String,
  default: "B.Tech CSE Student",
},

  name: String,

  heroTitles: {

    type: [String],

    default: [

      "Full Stack MERN Developer",

      "Web Developer",

      "AI Enthusiast",

      "Problem Solver",

      "Tech Explorer",

    ],

  },

  tagline: String,

  footerTagline: {
  type: String,
  default: "Full Stack MERN Developer • AI Enthusiast • Google Student Ambassador",
},

  about: String,

  email: String,

  phone: String,

  location: String,

  whatsapp: String,

  github: String,

  linkedin: String,

  instagram: String,

  resume: String,

  heroImage: String,


});

module.exports = mongoose.model(
  "Setting",
  settingSchema
);