const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/", function(req, res) {
  db.query("select * from users", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

router.get("/task/:id", function(req, res) {
  console.log(req.params.id);
  const query1 =
     "select users.name as Name,users.emailId as Email , \
     tasks.task as Task from \
     tasks  INNER  JOIN users ON tasks.userId =  users.userId where tasks.managedBy = ?"
  db.query(query1,[req.params.id,req.params.id], function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

router.get("/addUser", function(req, res) {});

module.exports = router;
