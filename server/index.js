const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config(); 
app.use(cors());
app.use(express.json());

const urlDB=`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
const db = mysql.createConnection(urlDB);

/*{user: "root",
   host: "containers-us-west-120.railway.app",
   password: "Ag68oDwFd7m7dF4BswIV",
   database: "railway",
   port:"7749"
 }*/

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const location = req.body.location;
  const timeData = req.body.timeData;

  db.query(
    "INSERT INTO customerbooking (name, email, mobile, location, timeData) VALUES (?,?,?,?,?)",
    [name, email, mobile, location, timeData],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

/*app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customerbooking", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});*/
app.get("/customers", (req, res) => {
  const email = req.query.email; // Get the email parameter from the query string
  db.query("SELECT * FROM customerbooking WHERE email=?", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const location =req.body.location;
  const timeData = req.body.timeData;
 
  db.query(
    "UPDATE customerbooking SET timeData = ? WHERE id = ?",
    [location, timeData, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM customerbooking WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(process.env.MYSQLPORT , () => {
  console.log(`Yey, your server is running on port ${process.env.MYSQLPORT}`);
});