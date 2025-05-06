
import React from 'react';
import { Task } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Edit, Trash2, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'status-badge status-pending';
      case 'In Progress':
        return 'status-badge status-inprogress';
      case 'Completed':
        return 'status-badge status-completed';
      default:
        return 'status-badge status-pending';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="task-card">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <div className={getStatusClass(task.status)}>{task.status}</div>
      </div>
      
      <p className="mt-2 text-gray-600 line-clamp-2">{task.description}</p>
      
      <div className="mt-4 flex flex-wrap gap-y-2 text-sm text-gray-500">
        <div className="flex items-center mr-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(task.deadline)}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{task.assignedTo}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <Link 
          to={`/tasks/${task.id}/edit`}
          className="p-2 text-gray-500 hover:text-primary-purple hover:bg-gray-100 rounded-full"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
