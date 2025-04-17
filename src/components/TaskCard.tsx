import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../data/mockData';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityBadgeClass = () => {
    switch (task.priority) {
      case 'low':
        return 'badge badge-low';
      case 'medium':
        return 'badge badge-medium';
      case 'high':
        return 'badge badge-high';
      default:
        return 'badge';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card"
      onClick={() => onClick(task)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
        <span className={getPriorityBadgeClass()}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {task.dueDate}
        </div>
        <div className="flex items-center">
          <img 
            src={task.assignee.avatar} 
            alt={task.assignee.name} 
            className="w-6 h-6 rounded-full"
            title={task.assignee.name}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;