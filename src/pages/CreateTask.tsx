
import React from 'react';
import Layout from '../components/Layout';
import { useTask } from '../contexts/TaskContext';
import TaskForm from '../components/TaskForm';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const { addTask } = useTask();
  const navigate = useNavigate();
  
  const handleSubmit = (data: any) => {
    addTask(data);
    navigate('/tasks');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Create New Task</h1>
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default CreateTask;
