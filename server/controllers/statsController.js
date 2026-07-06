const Stats = require("../models/Stats");

/*  
   Get Stats
  */

const getStats = async (req, res) => {

  try {

    let stats = await Stats.findOne();

    if (!stats) {

      stats = await Stats.create({

        projects: "10+",

        internships: "2+",

        technologies: "12+",

        dsaProblems: "250+",

      });

    }

    res.status(200).json({

      success: true,

      data: stats,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/*  
   Update Stats
  */

const updateStats = async (req, res) => {

  try {

    let stats = await Stats.findOne();

    if (!stats) {

      stats = await Stats.create(req.body);

    }

    else {

      stats = await Stats.findByIdAndUpdate(

        stats._id,

        req.body,

        {

          new: true,

          runValidators: true,

        }

      );

    }

    res.status(200).json({

      success: true,

      message: "Stats updated successfully.",

      data: stats,

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

  getStats,

  updateStats,

};