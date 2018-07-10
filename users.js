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

module.exports = router;
