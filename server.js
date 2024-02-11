// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const userRoutes = require("./routes/userRoutes");
// const taskRoutes = require("./routes/taskRoutes");

// require("dotenv").config();
// require("./database/employeeDb");
// const PORT = 5000;

// app.use(bodyParser.json());
// app.use("/users", userRoutes);
// app.use("/tasks", taskRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "Task Manager API is working!",
//   });
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const serveSwaggerUI = require('./middleware/swaggerGenerator');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
require('./database/employeeDb');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Serve Swagger documentation UI
serveSwaggerUI(app); // Pass `app` object to serveSwaggerUI function

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is working!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
