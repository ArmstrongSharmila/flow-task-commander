
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
  const response = await api.get('/tasks');
  return response.data.map(normalizeTask);
};

export const fetchTask = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return normalizeTask(response.data);
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return normalizeTask(response.data);
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task);
  return normalizeTask(response.data);
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
