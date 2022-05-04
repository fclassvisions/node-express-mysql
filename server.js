const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

app.use(cors());
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

      res.send({ ...ticket, id: result.insertId });
    }
  );
});

app.put("/ticket/:id", (req, res) => {
  const id = req.params.id;
  const ticket = req.body;
  pool.query(
    "update ticket set ? where id = ?",
    [ticket, id],
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
