
import axios from 'axios';
import { Task } from '../contexts/TaskContext';

// Set the base URL to your backend API
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Convert MongoDB _id to id for frontend consistency
const normalizeTask = (task: any): Task => {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    assignedTo: task.assignedTo,
    deadline: task.deadline,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('/tasks');
    return response.data.map(normalizeTask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const fetchTask = async (id: string): Promise<Task> => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return normalizeTask(response.data);
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  try {
    const response = await api.post('/tasks', task);
    return normalizeTask(response.data);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  try {
    const response = await api.put(`/tasks/${id}`, task);
    return normalizeTask(response.data);
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};
