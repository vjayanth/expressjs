const express = require("express");
const app = express();
const tasks = require("./tasks");
const users = require("./users");

app.use("/tasks", tasks);
app.use("/users", users);
app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(3000, () => {
  console.log("Server Started");
});
