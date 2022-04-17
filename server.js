const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

app.get("/", (req, res) => {
  pool.query("select * from test", (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
