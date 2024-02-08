const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
  res.send("it is working");
});
//register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
});
//login
router.post("/login", async (req, res) => {});
module.exports = router;
