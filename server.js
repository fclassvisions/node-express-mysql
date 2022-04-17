const express = require("express");
const mysql = require("mysql2");

const app = express();
const pool = mysql.createPool({
  host: "localhost",
  database: "sqltestdb",
  user: "sqltester",
  password: "mysecret1",
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
