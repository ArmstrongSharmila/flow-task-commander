
import React from 'react';
import { Task } from '../contexts/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Clock, Loader2 } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalTasks}</div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-yellow-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <Clock className="mr-3 h-5 w-5 text-yellow-500" />
          <div className="text-3xl font-bold">{pendingTasks}</div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <Loader2 className="mr-3 h-5 w-5 text-blue-500" />
          <div className="text-3xl font-bold">{inProgressTasks}</div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <CheckSquare className="mr-3 h-5 w-5 text-green-500" />
          <div className="text-3xl font-bold">{completedTasks}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
