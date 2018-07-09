const express = require("express");
const router = express.Router();
const validate = require("./validate");
const db = require("./db");
const bcrypt = require("bcrypt");

router.post("/signup", async function(req, res) {
  if (!validate.validateEmail(req.body.emailId)) {
    res.status(400);
    res.send({ msg: "Please Enter valid Email Id" });
  }
  if (!validate.validateMobile(req.body.phoneNumber)) {
    res.status(400);
    res.send({ msg: "Please Enter valid Mobile Number" });
  }
  if (!validate.validateString(req.body.password, 6)) {
    res.status(400);
    res.send({ msg: "Please Enter valid Password" });
  }
  if (!validate.validateString(req.body.name, 3)) {
    res.status(400);
    res.send({ msg: "Please Enter valid Name" });
  }
  req.body.password = await hashPassword(req.body);
  const user = await createUser(res, req.body);
  res.send(user);
});
function hashPassword(body) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(body.password, 10, function(err, hash) {
      if (err) {
        console.log(err);
      }
      console.log(hash);
      resolve(hash);
    });
  });
}
function createUser(res, body) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO user SET ? ", body, function(err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
}

module.exports = router;
