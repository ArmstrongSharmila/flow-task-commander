
# TaskFlow Backend

This is the backend API for the TaskFlow application.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

3. The server will run on port 5000 by default. You can change this by setting the PORT environment variable.

## API Endpoints

- `GET /api/tasks`: Get all tasks
- `GET /api/tasks/:id`: Get a task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task
