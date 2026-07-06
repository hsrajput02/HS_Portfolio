const Setting = require("../models/Settings");

// GET Settings
const getSettings = async (req, res) => {

  try {

    let settings = await Setting.findOne();

    if (!settings) {

      settings = await Setting.create({});

    }

    res.status(200).json({

      success: true,
      data: settings,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

// UPDATE Settings
const updateSettings = async (req, res) => {

  try {

    let settings = await Setting.findOne();

    if (!settings) {

      settings = await Setting.create(req.body);

    } else {

      settings = await Setting.findByIdAndUpdate(

        settings._id,

        req.body,

        {
          returnDocument: "after",
          runValidators: true,
        }

      );

    }

    res.status(200).json({

      success: true,
      data: settings,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

module.exports = {

  getSettings,
  updateSettings,

};