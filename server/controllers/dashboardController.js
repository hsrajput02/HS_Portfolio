const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Certificate = require("../models/Certificate");
const Message = require("../models/Message");

const getDashboardStats = async (req, res) => {

  try {

    const [
      projects,
      skills,
      experiences,
      certificates,
      messages,
      unreadMessages,
    ] = await Promise.all([

      Project.countDocuments(),

      Skill.countDocuments(),

      Experience.countDocuments(),

      Certificate.countDocuments(),

      Message.countDocuments(),

      Message.countDocuments({
        isRead: false,
      }),

    ]);

    res.json({

      success: true,

      data: {

        projects,

        skills,

        experiences,

        certificates,

        messages,

        unreadMessages,

      },

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  getDashboardStats,

};