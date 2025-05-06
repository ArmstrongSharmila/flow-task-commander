
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isEditing?: boolean;
}

const TaskForm = ({ initialData, onSubmit, isEditing = false }: TaskFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      deadline: initialData.deadline,
      assignedTo: initialData.assignedTo,
      status: initialData.status,
    } : {
      status: 'Pending' as const
    }
  });

  const [status, setStatus] = useState<string>(initialData?.status || 'Pending');
  
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setValue('status', value as any);
  };
  
  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Task title"
          {...register('title', { required: 'Title is required' })}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Task description"
          rows={4}
          {...register('description', { required: 'Description is required' })}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <div className="relative">
            <Input
              id="deadline"
              type="date"
              {...register('deadline', { required: 'Deadline is required' })}
              className={errors.deadline ? 'border-red-500 pl-10' : 'pl-10'}
            />
            <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            placeholder="Assignee name"
            {...register('assignedTo', { required: 'Assignee is required' })}
            className={errors.assignedTo ? 'border-red-500' : ''}
          />
          {errors.assignedTo && (
            <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
