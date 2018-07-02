const express = require("express");
const app = express();
const router = express.Router();
const db = require("./db");

router.get("/", async function(req, res) {
  const a = 2;

  const b = await doA(a);
  console.log(b);

  const c = await doB(b);
  console.log(c);

  const d = await doC(c);

  res.send({ value: d });
});

function doA(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(a * a), 100);
  });
}

function doB(b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(b * b), 100);
  });
}

function doC(c) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(c * c), 100);
  });
}

module.exports = router;
