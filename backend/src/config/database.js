const mongoose = require("mongoose");
const { Pool } = require("pg");

// MongoDB Connection
const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

// PostgreSQL Pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

const connectPostgres = async () => {
  await pool.query("SELECT 1");
  console.log("PostgreSQL Connected");
};

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  connectMongo,
  connectPostgres,
  query: (text, params) => pool.query(text, params),
  pool,
};
