const express = require("express");
const app = express();
const router = express.Router();
const dbUtil = require("./db");

router.get("/", function(req, res) {
  dbUtil
    .getDB()
    .collection("employee")
    .find({name:'jayanth'})
    .toArray((err, response) => {
      if (err) res.send(err);
      res.send(response);
    });
});

router.get("/addUser", function(req, res) {
  dbUtil
    .getDB()
    .collection("employee")
    .insertMany(
      [
        {
          name: "jayanth",
          mobile: "123456789",
          email: "abc@gmail.com"
        },
        {
          name: "xxx",
          mobile: "123456789",
          email: "abc@gmail.com"
        },
        {
          name: "yyy",
          mobile: "123456789",
          email: "abc@gmail.com"
        },
        {
          name: "zzz",
          mobile: "123456789",
          email: "abc@gmail.com"
        }
      ],
      (err,result) => {
        res.send(result);
      }
    );
});

module.exports = router;
