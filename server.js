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

app.use(express.json());

app.post("/ticket", (req, res) => {
  const ticket = req.body;
  pool.query(
    "insert into ticket (summary,priority,status) value (?,?,?)",
    [ticket.summary, ticket.priority, ticket.status],
    (error, result) => {
      if (error) {
        console.error(error);
        res.send(error);
        return;
      }

      res.send({ id: result.insertId, ...ticket });
    }
  );
});

app.put("/ticket", (req, res) => {
  const ticket = req.body;
  pool.query(
    "update ticket set ? where id = ?",
    [ticket, ticket.id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.send(error);
        return;
      }

      res.send(ticket);
    }
  );
});

app.delete("/ticket/:id", (req, res) => {
  const id = req.params.id;
  pool.query("delete from ticket where id = ?", [id], (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.send("Success");
  });
});

app.get("/all", (req, res) => {
  pool.query("select * from ticket", (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.send(result);
  });
});

app.get("/ticket/:id", (req, res) => {
  const id = req.params.id;
  pool.query("select * from ticket where id = ?", [id], (error, result) => {
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
