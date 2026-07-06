const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const statsRoutes = require("./routes/statsRoutes");
const settingRoutes = require("./routes/settingRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Portfolio API Running 🚀"
    });
});

module.exports = app;