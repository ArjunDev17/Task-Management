// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');

// const serveSwaggerUI = require('./middleware/swaggerGenerator');
// const userRoutes = require('./routes/userRoutes');
// // const swaggerJSDoc=require('swagger-jsdoc');
// const taskRoutes = require('./routes/taskRoutes');
// // const swaggerui=require('swagger-ui-express');
// require('dotenv').config();
// require('./database/employeeDb');
// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(bodyParser.json());
// app.use('/users', userRoutes);
// app.use('/tasks', taskRoutes);

// // Serve Swagger documentation UI


// /**
//  * @swagger
//  * /:
//  *   get:
//  *     summary: Check if the Task Manager API is working.
//  *     description: Returns a message indicating whether the Task Manager API is working or not.
//  *     responses:
//  *       200:
//  *         description: A success response with a message indicating the API is working.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Task Manager API is working!
//  */
// app.get('/welcome', (req, res) => {
//   res.json({
//     message: 'Task Manager API is working!',
//   });
// });
// serveSwaggerUI(app); // Pass `app` object to serveSwaggerUI function

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
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

/**
 * @swagger
 * /welcome:
 *   get:
 *     summary: Check if the Task Manager API is working.
 *     description: Returns a message indicating whether the Task Manager API is working or not.
 *     responses:
 *       200:
 *         description: A success response with a message indicating the API is working.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task Manager API is working!
 */
app.get('/welcome', (req, res) => {
  res.json({
    message: 'Task Manager API is working!',
  });
});

// Serve Swagger documentation UI
serveSwaggerUI(app); // Pass `app` object to serveSwaggerUI function

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
