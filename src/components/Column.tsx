import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Column as ColumnType, Task } from '../data/mockData';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onTaskClick }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const getColumnHeaderColor = () => {
    switch (column.id) {
      case 'todo':
        return 'text-blue-600 dark:text-blue-400';
      case 'in-progress':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'review':
        return 'text-purple-600 dark:text-purple-400';
      case 'done':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  const getTaskCount = () => {
    return (
      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
        {tasks.length}
      </span>
    );
  };

  return (
    <div className="column w-full">
      <div className={`column-header ${getColumnHeaderColor()}`}>
        <div className="flex items-center">
          {column.title}
          {getTaskCount()}
        </div>
      </div>
      <div ref={setNodeRef} className="min-h-[400px] w-full">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;