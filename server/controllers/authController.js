const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// Login Admin
const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// change password
// Change Password
const changePassword = async (req, res) => {

  try {

    const {

      currentPassword,

      newPassword,

      confirmPassword,

    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {

      return res.status(400).json({

        success: false,

        message: "All fields are required.",

      });

    }

    if (newPassword !== confirmPassword) {

      return res.status(400).json({

        success: false,

        message: "Passwords do not match.",

      });

    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {

      return res.status(404).json({

        success: false,

        message: "Admin not found.",

      });

    }

    const isMatch = await bcrypt.compare(

      currentPassword,

      admin.password

    );

    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message: "Current password is incorrect.",

      });

    }

    admin.password = await bcrypt.hash(

      newPassword,

      10

    );

    await admin.save();

    res.status(200).json({

      success: true,

      message: "Password updated successfully.",

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
  loginAdmin,
  changePassword
};