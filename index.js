const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("./database/employeeDb");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(bodyParser.json);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome inside Task Management",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on this ${PORT}`);
});
