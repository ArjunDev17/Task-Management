const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require('../middleware/isAdmin');
const Task = require("../models/task");

/**
 * @swagger
 * /tasks/task:
 *   get:
 *     summary: Retrieve all tasks.
 *     description: Retrieve all tasks for an authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized access.
 */
router.get("/tas",isAdmin, (req, res) => {
  res.json({
    message: "Task routes are working!",
   
  });
});
router.get("/allT", isAdmin, async (req, res) => {
  console.log('Received token:', req.header('Authorization'));
  try {
    console.log('Received token:', req.header('Authorization'));
    
    // Add this line to log the decoded payload
    console.log('Decoded payload:', req.user);

    const tasks = await Task.find();
    res.status(200).json({
      tasks,
      count: tasks.length,
      message: 'All tasks Fetched Successfully by Admin',
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred while fetching tasks.' });
  }
});

// CRUD tasks for authenticated users
/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Create a new task.
 *     description: Create a new task for an authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Invalid request body.
 */
router.post("/add", auth, async (req, res) => {
  try {
    // Check if a task with the same title and owner already exists
    const existingTask = await Task.findOne({
      title: req.body.title,
      owner: req.user._id,
    });

    if (existingTask) {
      // Task with the same title and owner already exists
      return res.status(400).json({ message: "Task with the same title and owner already exists" });
    }

    // Create a new task if it doesn't exist
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });

    await task.save();
    res.status(201).json({ task, message: "Task Created Successfully" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

/**
 * @swagger
 * /tasks/user-tasks:
 *   get:
 *     summary: Retrieve tasks for the authenticated user.
 *     description: Retrieve tasks for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TasksResponse'
 *       500:
 *         description: Server error.
 */
router.get('/user-tasks', auth, isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find();

    // Reverse the order of tasks
    const reversedTasks = tasks.reverse();

    res.status(200).json({
      tasks: reversedTasks,
      count: tasks.length,
      message: 'All Tasks Fetched Successfully',
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});
//fetch a task by id
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a task by ID.
 *     description: Retrieve a task by its ID for an authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
router.get("/:id", auth, async (req, res) => {
  const taskid = req.params.id;

  try {
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task, message: "Task Fetched Successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

// update a task by id
router.patch("/:id", auth, async (req, res) => {
  const taskid = req.params.id;
  const updates = Object.keys(req.body);
 
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Updates" });
  }

  try {
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.json({
      message: "Task Updated Successfully",
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

// delete a task by id
router.delete("/:id", auth, async (req, res) => {
  const taskid = req.params.id;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskid,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task, message: "Task Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});





module.exports = router;

