const express = require("express");
const os = require("os");
const mysql = require("mysql2/promise");
const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
});

app.get("/", async (req, res) => {
  try {
    await pool.query("INSERT INTO visits (server) VALUES (?)", [os.hostname()]);
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM visits");
    res.send(
      `Hello! You were served by ${os.hostname()} — total visits across all servers: ${
        rows[0].total
      }`
    );
  } catch (err) {
    res.status(500).send(`DB error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
