const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongo, connectPostgres, pool } = require("./config/database");
const assignmentRoutes = require("./routes/assignmentRoutes");
const queryRoutes = require("./routes/queryRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/query", queryRoutes);

app.use("/health", (req, res) => {
  res.status(200).json({ message: "Hello Server!" });
});

const startServer = async () => {
  try {
    await connectMongo();
    console.log("Mongo Connected");

    await connectPostgres();

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1);
  }
};

startServer();
