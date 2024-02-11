  // adminRoutes.js
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");

const secretKey = "!@#ASD$%"; // Use your secret key

// Route to create an admin
router.post('/admins', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if an admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with the same username already exists" });
    }

    // Create a new admin
    const admin = new Admin({
      username,
      password,
    });

    await admin.save();

    // Generate a token for the new admin
    const token = jwt.sign({ username, isAdmin: true }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ admin, token });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Create an endpoint to generate an admin token
router.post('/adminT', (req, res) => {
  // Assuming the JSON body looks like: { "username": "admin", "isAdmin": true }
  const { username, isAdmin } = req.body;

  // Validate or set default values for username and isAdmin if necessary
  const adminUser = {
    username,
    isAdmin: Boolean(isAdmin),
  };

  try {
    // Sign the token with the admin user data
    const token = jwt.sign(adminUser, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error creating JWT:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// adminRoutes.js

  

module.exports = router;
