
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import * as apiService from '../services/api';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  isLoading: boolean;
  error: string | null;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        setIsLoading(true);
        const tasksData = await apiService.fetchTasks();
        setTasks(tasksData);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks');
        // If API fails, load from localStorage as fallback
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasksData();
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      const newTask = await apiService.createTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast.success('Task created successfully!');
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error('Failed to create task');
      
      // Fallback: create task locally if API fails
      const now = new Date().toISOString();
      const localTask: Task = {
        ...task,
        id: `task-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      setTasks(prevTasks => [...prevTasks, localTask]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      setIsLoading(true);
      const updated = await apiService.updateTask(id, updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updated : task))
      );
      toast.success('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
      
      // Fallback: update locally if API fails
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
            : task
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      await apiService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
      
      // Fallback: delete locally if API fails
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    isLoading,
    error,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
