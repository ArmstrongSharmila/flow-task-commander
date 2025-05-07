
# TaskFlow API Documentation

This document outlines all API endpoints for the TaskFlow application.

Base URL: `http://localhost:5000/api`

## Authentication
No authentication is required for these endpoints at the moment.

## Task Endpoints

### 1. Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Retrieves all tasks
- **Request Body**: None
- **Response**:
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project Documentation",
      "description": "Write complete documentation for the TaskFlow project",
      "status": "In Progress",
      "assignedTo": "John Doe",
      "deadline": "2025-05-15T00:00:00.000Z",
      "createdAt": "2025-05-01T10:30:00.000Z",
      "updatedAt": "2025-05-02T14:20:00.000Z"
    }
  ]
  ```

### 2. Get Task by ID
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific task by ID
- **URL Parameters**: `id` - Task ID
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Complete Project Documentation",
    "description": "Write complete documentation for the TaskFlow project",
    "status": "In Progress",
    "assignedTo": "John Doe",
    "deadline": "2025-05-15T00:00:00.000Z",
    "createdAt": "2025-05-01T10:30:00.000Z",
    "updatedAt": "2025-05-02T14:20:00.000Z"
  }
  ```

### 3. Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task
- **Request Body**:
  ```json
  {
    "title": "Complete Project Documentation",
    "description": "Write complete documentation for the TaskFlow project",
    "status": "Pending",
    "assignedTo": "John Doe",
    "deadline": "2025-05-15T00:00:00.000Z"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Complete Project Documentation",
    "description": "Write complete documentation for the TaskFlow project",
    "status": "Pending",
    "assignedTo": "John Doe",
    "deadline": "2025-05-15T00:00:00.000Z",
    "createdAt": "2025-05-01T10:30:00.000Z",
    "updatedAt": "2025-05-01T10:30:00.000Z"
  }
  ```

### 4. Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Updates an existing task
- **URL Parameters**: `id` - Task ID
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "status": "Completed"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Updated Task Title",
    "description": "Write complete documentation for the TaskFlow project",
    "status": "Completed",
    "assignedTo": "John Doe",
    "deadline": "2025-05-15T00:00:00.000Z",
    "createdAt": "2025-05-01T10:30:00.000Z",
    "updatedAt": "2025-05-03T16:40:00.000Z"
  }
  ```

### 5. Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task
- **URL Parameters**: `id` - Task ID
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Error Responses
- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Server Error**: Internal server error

```json
{
  "message": "Error message description"
}
```

## Testing with Postman
1. Import the API collection using the endpoints listed above
2. Set the base URL to `http://localhost:5000/api`
3. Start the backend server using `npm run dev`
4. Test each endpoint with the appropriate request data
