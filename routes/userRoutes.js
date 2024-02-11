const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAdmin = require('../middleware/isAdmin');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Check if the User routes are working.
 *     description: Returns a message indicating whether the User routes are working or not.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A success response with a message indicating the User routes are working.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User routes are working!
 */
router.get("/", isAdmin, (req, res) => {
  res.send("User routes are working!");
});
/** 
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with provided name, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid request body.
 */


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile, address } = req.body;

    // Create a new user using the User model
    const user = new User({
      name: {
        first: name.first,
        last: name.last,
      },
      email,
      password,
      mobile,
      address,
    });

    // Save the user to the database
    await user.save();

    // Send a response with the created user and a success message
    res.status(201).json({ user, message: "User Created Successfully" });
  } catch (err) {
    // If an error occurs, send a 400 response with the error message
    res.status(400).json({ error: err.message || "An error occurred during user registration." });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user.
 *     description: Login a user with provided email and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *       400:
 *         description: Invalid credentials or request body.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login , invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login , invalid credentials");
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY
    );

    res.send({ user, token, message: "Logged in successfully" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (accessible to admin only).
 *     description: Fetch all users from the database. Accessible only to admin users.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error.
 */
router.get("/all-user", isAdmin, async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the list of users as a response
    res.status(200).json({
      users,
      count: users.length,
      message: 'All Users Fetched Successfully by Admin',
    });
  } catch (err) {
    // If an error occurs, send a 500 response with the error message
    res.status(500).json({ error: err.message || 'An error occurred while fetching users.' });
  }
});

// register a user
// login a user
module.exports = router;
