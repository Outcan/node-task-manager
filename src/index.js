const express = require("express");
require("./db/mongoose");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      console.log(user);
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(400).send(error.message);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "No user found!" });
      }
      res.send(user);
    })
    .catch(error => {
      res.status(400).send(error.message);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(task => {
      res.status(201).send(task);
    })
    .catch(error => {
      res.status(400).send(error.message);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).send(tasks);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: "No task found!" });
      }
      res.status(200).send(task);
    })
    .catch(error => {
      res.status(400).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
