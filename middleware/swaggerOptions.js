const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Task Manager API',
        version: '1.0.0',
        description: 'API documentation for Task Manager',
      },
      // Other Swagger definition options like basePath, host, etc.
    },
    apis: ['./routes/*.js'], // Path to the API route files
  };
  
  module.exports = swaggerOptions;
  