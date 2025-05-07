
# TaskFlow API Testing Guide

This guide will help you test the TaskFlow API endpoints using Postman.

## Prerequisites
1. MongoDB installed locally or access to a MongoDB Atlas cluster
2. Node.js and npm installed
3. Postman installed (or any API testing tool)

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB
Make sure MongoDB is running locally on port 27017 or update the MONGO_URI in the `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
NODE_ENV=development
```

For MongoDB Atlas, use a connection string like:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskflow?retryWrites=true&w=majority
```

### 3. Test MongoDB Connection
```bash
npm run test-connection
```

You should see output confirming the connection was successful.

### 4. Start the Server
```bash
npm run dev
```

The server should start on port 5000.

## Testing with Postman

### Import Postman Collection
You can create a new Postman collection with the endpoints listed in `api-documentation.md`.

### Test Each Endpoint

#### 1. Get All Tasks
- **Method**: GET
- **URL**: http://localhost:5000/api/tasks
- **Expected**: Array of tasks (empty array if no tasks)

#### 2. Create a Task
- **Method**: POST
- **URL**: http://localhost:5000/api/tasks
- **Body** (JSON):
  ```json
  {
    "title": "Test Task",
    "description": "This is a test task",
    "status": "Pending",
    "assignedTo": "Test User",
    "deadline": "2025-05-15"
  }
  ```
- **Expected**: Newly created task object with ID

#### 3. Get a Task by ID
- **Method**: GET
- **URL**: http://localhost:5000/api/tasks/:id (use ID from create response)
- **Expected**: Task object with matching ID

#### 4. Update a Task
- **Method**: PUT
- **URL**: http://localhost:5000/api/tasks/:id (use ID from create response)
- **Body** (JSON):
  ```json
  {
    "title": "Updated Task",
    "status": "In Progress"
  }
  ```
- **Expected**: Updated task object

#### 5. Delete a Task
- **Method**: DELETE
- **URL**: http://localhost:5000/api/tasks/:id (use ID from create response)
- **Expected**: Success message

### Verify Frontend Integration

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In another terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Open the web application in a browser and verify that tasks are loading from the API.
