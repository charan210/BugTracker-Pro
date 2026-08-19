require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = db;

db.query("SELECT 1", (error, results) => {
  if (error) {
    console.error("Database connection failed:", error);
    return;
  }

  console.log("Database connected successfully!");
});