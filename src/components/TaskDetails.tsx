import React from 'react';
import { Task } from '../data/mockData';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose, onEdit }) => {
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

  const getStatusBadgeClass = () => {
    switch (task.status) {
      case 'todo':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'review':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'review':
        return 'Review';
      case 'done':
        return 'Done';
      default:
        return task.status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass()}`}>
                {getStatusText()}
              </span>
              <span className={getPriorityBadgeClass()}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
            
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <p className="mb-4">{task.description}</p>
              
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Due: <strong>{task.dueDate}</strong></span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <div className="flex items-center">
                  <img 
                    src={task.assignee.avatar} 
                    alt={task.assignee.name} 
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>Assigned to: <strong>{task.assignee.name}</strong></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md shadow-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;