
import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { useTask } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import PDFGenerator from '../components/PDFGenerator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const TasksList = () => {
  const { tasks, deleteTask } = useTask();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline-asc');
  
  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'deadline-asc':
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          case 'deadline-desc':
            return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'status':
            return a.status.localeCompare(b.status);
          default:
            return 0;
        }
      });
  }, [tasks, searchQuery, statusFilter, sortBy]);
  
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Tasks</h1>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <PDFGenerator 
              tasks={filteredTasks} 
              filters={{ search: searchQuery, status: statusFilter }}
            />
            <Button asChild>
              <Link to="/tasks/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Link>
            </Button>
          </div>
        </div>
        
        <TaskFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500">Try changing your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TasksList;
