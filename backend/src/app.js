const express = require("express");
require("dotenv").config();
const { connectMongo, connectPostgres } = require("./config/database");

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/", (req, res) => {
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
