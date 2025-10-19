require("dotenv").config(); //load env variables

const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); //import the db connection function
const Task = require("./models/Task"); //import the Task model
const { checkJwt } = require("./config/auth0");

const app = express();
const PORT = process.env.PORT || 5000;

//connect to the database
connectDB();

//middleware
app.use(cors()); //allow React to connect
app.use(express.json());

// //fake api for momemnt
// let tasks = [
//   { id: 1, title: "Task One", completed: true },
//   { id: 2, title: "Task Two", completed: false },
//   { id: 3, title: "Task Three", completed: false },
// ];

//api routes
// first route, get all tasks
//protected routes

app.get("/api/tasks", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub; //extract userId from token
    const tasks = await Task.find({ userId }); // Fetch all tasks from the database
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get a single task by id
app.get("/api/tasks/:id", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const task = await Task.findOne({
      _id: req.params.id,
      userId: userId, //make sure taks belongs to this user
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - Create new task
app.post("/api/tasks", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed || false,
      userId: userId, //assign task to this user
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Update a task - if only belongs to this user
app.put("/api/tasks/:id", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    //check if the task exists and belongs to user
    const task = await Task.findOne({
      _id: req.params.id,
      userId: userId,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    //update the task
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // if (!updatedTask) {
    //   return res.status(404).json({ message: "Task not found" });
    // }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete task
app.delete("/api/tasks/:id", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const deletedTask = await Task.findByIdAndDelete({
      _id: req.params.id,
      userId: userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted", task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
