
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useTask } from '../contexts/TaskContext';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const { getTask, updateTask } = useTask();
  const navigate = useNavigate();
  
  const task = getTask(id!);
  
  if (!task) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-800">Task Not Found</h1>
          <p className="mt-2 text-gray-600">The task you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate('/tasks')}
            className="mt-4 px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Back to Tasks
          </button>
        </div>
      </Layout>
    );
  }
  
  const handleSubmit = (data: any) => {
    updateTask(id!, data);
    navigate('/tasks');
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Task</h1>
        <TaskForm initialData={task} onSubmit={handleSubmit} isEditing />
      </div>
    </Layout>
  );
};

export default EditTask;
