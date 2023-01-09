const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
//create connection to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});
//get
app.get("/api/get", (req, res) => {
  const q = "SELECT * FROM contactlist";
  db.query(q, (error, result) => {
    res.send(result);
  });
});
//post
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const q = "INSERT INTO contactlist(name,email,contact) VALUES (?,?,?)";
  db.query(q, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
  res.send();
});

//delete

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const qDelete = "DELETE FROM contactlist WHERE id = ?";
  db.query(qDelete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

//getforedit
// app.get("/api/get/:id", (req, res) => {
//   const id = req.params.id;
//   const q = "SELECT * FROM contactlist  WHERE id =?";
//   db.query(q, id, (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });
//put
// app.put("/api/put/:id", (req, res) => {
//   const { id } = req.params.id;
//   const { name, email, contact } = req.body;
//   const qUpdate =
//     "UPDATE contactlist SET name= ?,email=?,contact = ? WHERE id=?";
//   db.query(qUpdate, [name, email, contact, id], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//   });
//   res.send(result);
// });

app.listen(process.env.PORT || 8000, () => {
  console.log("connected!!!!!!!!!!!!");
});
