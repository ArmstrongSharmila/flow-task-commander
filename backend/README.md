
# TaskFlow Backend

This is the backend API for the TaskFlow application using MongoDB.

## Getting Started

1. Install MongoDB on your local machine or use MongoDB Atlas.

2. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskflow
   NODE_ENV=development
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

5. The server will run on port 5000 by default.

## API Endpoints

- `GET /api/tasks`: Get all tasks
- `GET /api/tasks/:id`: Get a task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

## File Structure

- `server.js` - Main entry point
- `models/` - MongoDB schemas
- `routes/` - API route definitions
- `controllers/` - Route handling logic
- `middlewares/` - Custom middleware functions
