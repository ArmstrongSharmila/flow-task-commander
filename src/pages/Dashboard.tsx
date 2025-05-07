
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import TaskStats from '../components/TaskStats';
import TaskCard from '../components/TaskCard';
import PDFGenerator from '../components/PDFGenerator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, deleteTask, isLoading, error } = useTask();
  
  // Get recent tasks (up to 5)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);
  
  // Get upcoming deadlines (up to 5)
  const upcomingTasks = [...tasks]
    .filter(task => task.status !== 'Completed' && new Date(task.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary-purple" />
          <span className="ml-2 text-lg">Loading dashboard...</span>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <div className="flex space-x-4">
            <PDFGenerator tasks={tasks} />
            <Button asChild>
              <Link to="/tasks/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Link>
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
            <h3 className="font-medium">Error loading tasks</h3>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-1">Showing tasks from local storage as fallback</p>
          </div>
        )}
        
        <TaskStats tasks={tasks} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Tasks</h2>
              <Button variant="ghost" asChild>
                <Link to="/tasks">View All</Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onDelete={deleteTask} />
                ))
              ) : (
                <p className="text-gray-500">No recent tasks found.</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
              <Button variant="ghost" asChild>
                <Link to="/tasks">View All</Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onDelete={deleteTask} />
                ))
              ) : (
                <p className="text-gray-500">No upcoming deadlines.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
