const express = require('express');
const bodyParser = require('body-parser');
const serveSwaggerUI = require('./middleware/swaggerGenerator');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
require('./database/connectDB');
const apiResponse = require('./api_response/apiResponse');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

/**
 * @swagger
 * /:
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
  const responseData = {
    message: 'Task Manager API is working!',
  };

  const formattedResponse = apiResponse.successResponse(responseData, 'Operation successful');

  res.json(formattedResponse);
});

// Serve Swagger documentation UI
serveSwaggerUI(app);

// Use admin routes with /admin prefix
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
