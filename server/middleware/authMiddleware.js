const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = await Admin.findById(decoded.id).select("-password");

    next();

  } catch (error) {

    res.status(401).json({
      message: "Token Failed",
      error: error.message,
    });

  }

};

module.exports = protect;