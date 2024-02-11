const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./swaggerOptions'); // Import your Swagger options

const specs = swaggerJsdoc(options);

function serveSwaggerUI(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = serveSwaggerUI;
