require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");
const connectDB = require("./config/db");

const createAdmin = async () => {

  try {

    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || "Admin";

    if (!email || !password) {

      console.log("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
      process.exit(1);

    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {

      console.log("Admin already exists");
      process.exit();

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({

      name,
      email,
      password: hashedPassword,

    });

    console.log("Admin Created Successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

};

createAdmin();