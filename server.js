const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/students.db");

app.get("/student", (req, res) => {
  db.all("SELECT * FROM students", (err, rows) => {
    res.status(200).json(rows);
  });
});

app.get("/student/:studentId", (req, res) => {
  db.get(
    "SELECT * FROM students WHERE id = ?",
    req.params.studentId,
    (err, row) => {
      if (err) {
        res.status(500).send("Unknown error");
      } else {
        if (row) {
          res.status(200).json(row);
        } else {
          res
            .status(404)
            .send(
              `Not Found: studentId ${req.params.studentId} does not exist`
            );
        }
      }
    }
  );
});

app.post("/student", (req, res) => {
  const sql = `INSERT INTO students VALUES (${req.body.id}, '${req.body.name}', '${req.body.email}', '${req.body.program}');`;

  db.prepare(sql).run([], function (err) {
    if (err) {
      res.status(400).send("Bad Request: productId already exists");
    } else {
      res.sendStatus(201);
    }
  });
});

app.put("/student", (req, res) => {
  const sql = `UPDATE students SET name = '${req.body.name}', email = '${req.body.email}' WHERE id = ${req.body.id};`;

  db.prepare(sql).run([], function (err) {
    if (err) {
      res.status(500).send("Unknown error");
    } else {
      if (this.changes == 1) {
        res.sendStatus(200);
      } else {
        res.status(400).send("Bad Request: studentId does not exists");
      }
    }
  });
});

app.delete("/student/:studentId", (req, res) => {
  const sql = `DELETE FROM students WHERE id = ${req.params.studentId};`;

  db.prepare(sql).run([], function (err) {
    if (err) {
      res.status(500).send("Unknown error");
    } else {
      if (this.changes == 1) {
        res.sendStatus(200);
      } else {
        res.status(400).send("Bad Request: studentId does not exist");
      }
    }
  });
});

app.listen(port, function () {
  console.log(`Express app listening on port ${port}!`);
});
