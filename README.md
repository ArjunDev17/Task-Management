# Task-Management API

## Description

This project implements a Task Management API that allows users to perform CRUD operations on tasks. Each task includes attributes such as title, description, due date, and status.

## Requirements

### User Authentication
- User authentication is implemented to restrict access to authorized users only. Admin users have full access to all tasks.

### Task Operations
- API endpoints are provided for adding new tasks, retrieving tasks for a specific user, updating task details, marking tasks as completed, and deleting tasks.

### Database
- MongoDB is used as the NoSQL database for storing task-related data.

### Documentation
- Comprehensive API documentation covering authentication procedures, available endpoints, and request/response formats is provided.

### Additional Features
- Pagination is integrated into the task list API endpoint.
- Sorting and filtering options are available for the task list.
- Proper error handling and status codes are implemented in API responses.
- Unit tests are developed to ensure the reliability of critical components.

## Technologies Used

- Node.js
- MongoDB
- Postman
- Swagger

## Getting Started

To get started with the Task-Management API, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and configure the database connection.
4. Run the application using `npm start`.

## API Documentation

Detailed API documentation can be found in [API_Documentation.md](API_Documentation.md).

## Testing

Testing of the API endpoints can be done using Postman. Import the provided Postman collection and execute the requests.

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
