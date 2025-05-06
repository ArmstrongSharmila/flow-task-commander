
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

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
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load from localStorage on initialization
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : getSampleTasks();
  });

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success('Task created successfully!');
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
    toast.success('Task updated successfully!');
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
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
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Sample tasks for initial demo
function getSampleTasks(): Task[] {
  const now = new Date().toISOString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  return [
    {
      id: 'task-1',
      title: 'Design Task Management Dashboard',
      description: 'Create wireframes and mockups for the task management dashboard with focus on user experience.',
      deadline: tomorrow.toISOString().split('T')[0],
      assignedTo: 'Sarah Johnson',
      status: 'In Progress',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'task-2',
      title: 'Implement User Authentication',
      description: 'Set up Google OAuth 2.0 authentication for the application.',
      deadline: nextWeek.toISOString().split('T')[0],
      assignedTo: 'Michael Chen',
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'task-3',
      title: 'Create PDF Report Generator',
      description: 'Develop functionality to export tasks as PDF reports with proper formatting.',
      deadline: nextWeek.toISOString().split('T')[0],
      assignedTo: 'Alex Rodriguez',
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
    },
  ];
}
