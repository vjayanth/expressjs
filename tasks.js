const express = require("express");
const router = express.Router();
const db = require("./db");
const middleWare = require("./middleware");
router.use(middleWare);
router.get("/", function(req, res) {
  db.query("select * from tasks", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

module.exports = router;
