const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("./database/employeeDb");
require("dotenv").config();

const PORT = process.env.PORT || 3000; // Use a default port if PORT is not defined in .env

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/greet", (req, res) => {
  res.json({
    message: "Welcome inside Task Management",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
