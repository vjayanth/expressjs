const express = require("express");
const router = express.Router();
const validate = require("./validate");
const db = require("./db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
  req.body.password = await bcrypt.hashSync(req.body.password, 10);
  const user = await createUser(res, req.body);
  res.send(user);
});

router.post("/login", async function(req, res) {
  if (!validate.validateEmail(req.body.emailId)) {
    res.status(400);
    res.send({ msg: "Please enter valid email ID" });
  }
  const user = await findUser(req.body);
  if (user.length == 0) {
    res.send({ msg: "No User found" });
    res.status(404);
  } else {
    const result = bcrypt.compareSync(req.body.password, user[0].password);
    if (result) {
      const payload = {
        user: user[0].emailId,
        name: user[0].name
      };
      console.log(payload);
      const token = jwt.sign(payload, "firstApplication", {
        expiresIn: 5
      });

      res.send({ msg: "User Authentication Successful", token: token });
    } else {
      res.status(401);
      res.send({ msg: "User Authentication Failed" });
    }
  }
});



function findUser(body) {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from user where user.emailId = ?",
      body.emailId,
      function(err, results) {
        resolve(results);
      }
    );
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
