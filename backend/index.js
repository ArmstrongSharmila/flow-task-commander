
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data file path
const dataFilePath = path.join(__dirname, 'data', 'tasks.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize tasks data if file doesn't exist
if (!fs.existsSync(dataFilePath)) {
  const initialData = [];
  fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
}

// Read tasks from file
const getTasks = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks data:', error);
    return [];
  }
};

// Write tasks to file
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error saving tasks data:', error);
  }
};

// Routes
// Get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

// Get task by id
app.get('/api/tasks/:id', (req, res) => {
  const tasks = getTasks();
  const task = tasks.find(task => task.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const tasks = getTasks();
  const now = new Date().toISOString();
  
  const newTask = {
    ...req.body,
    id: `task-${uuidv4()}`,
    createdAt: now,
    updatedAt: now
  };
  
  tasks.push(newTask);
  saveTasks(tasks);
  
  res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const updatedTask = {
    ...tasks[taskIndex],
    ...req.body,
    id: req.params.id,
    updatedAt: new Date().toISOString()
  };
  
  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  
  res.json(updatedTask);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = getTasks();
  const taskExists = tasks.some(task => task.id === req.params.id);
  
  if (!taskExists) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks = tasks.filter(task => task.id !== req.params.id);
  saveTasks(tasks);
  
  res.json({ message: 'Task deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
