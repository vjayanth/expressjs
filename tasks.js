const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/", function(req, res) {
  db.query("select * from tasks", function(err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

router.post("/addTask", async function(req, res) {
  if (!req.body.userId && !req.body.managedBy) {
    const userId = await addUser({
      name: req.body.name,
      emailId: req.body.emailId
    });
    const resMsg = await addTask({
      userId: userId,
      task: req.body.task,
      managedBy: userId
    });
    res.send(resMsg);
  } else {
    const taskBody = {
      task: req.body.task
    };
    if (req.body.managedBy && req.body.userId) {
      taskBody.userId = req.body.userId;
      taskBody.managedBy = req.body.managedBy;
    } else if (req.body.userId) {
      taskBody.userId = req.body.userId;
      taskBody.managedBy = req.body.userId;
    }
    const task = await addTask(taskBody);
    res.send(task);
  }
});

function addUser(body) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO users SET ? ", body, function(err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result.insertId);
    });
  });
}

function addTask(body) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO tasks SET ? ", body, function(err, result) {
      if (err) {
        console.log(err);
      }
      resolve({ msg: "create successfully", taskId: result.insertId });
    });
  });
}
module.exports = router;
