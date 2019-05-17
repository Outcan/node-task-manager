const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Task = require("../models/Task");

router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get /tasks?completed=true
// Pagination - limit, skip = GET /tasks?limit=10&skip=0
// Sorting - /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const sort = {};

  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true" ? true : false;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    //const tasks = await Task.find({ owner: req.user._id });
    // or
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ message: "No task found!" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const _id = req.params.id;
  const dataToUpdate = req.body;
  const updates = Object.keys(dataToUpdate);
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    // const task = await Task.findByIdAndUpdate(_id, dataToUpdate, {
    //   new: true,
    //   runValidators: true
    // });
    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    updates.forEach(update => {
      return (task[update] = req.body[update]);
    });
    await task.save();

    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findByIdAndDelete(_id);
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
