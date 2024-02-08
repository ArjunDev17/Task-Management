const express = require("express");
// const User = require("../models/user");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("task rout is working is working");
});

//crud
module.exports = router;
