import React from 'react';
import { BoardData } from '../data/mockData';

interface TaskStatisticsProps {
  data: BoardData;
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ data }) => {
  const totalTasks = Object.keys(data.tasks).length;
  const completedTasks = data.columns['done'].taskIds.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const priorityCounts = {
    high: 0,
    medium: 0,
    low: 0
  };
  
  Object.values(data.tasks).forEach(task => {
    priorityCounts[task.priority]++;
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{completionRate}%</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{data.columns['in-progress'].taskIds.length}</p>
        </div>
      </div>
      
      <div className="mb-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tasks by Priority</h4>
        <div className="flex h-4 mb-1">
          <div 
            className="bg-red-500 dark:bg-red-600" 
            style={{ width: `${(priorityCounts.high / totalTasks) * 100}%` }}
          ></div>
          <div 
            className="bg-yellow-500 dark:bg-yellow-600" 
            style={{ width: `${(priorityCounts.medium / totalTasks) * 100}%` }}
          ></div>
          <div 
            className="bg-blue-500 dark:bg-blue-600" 
            style={{ width: `${(priorityCounts.low / totalTasks) * 100}%` }}
          ></div>
        </div>
        <div className="flex text-xs justify-between">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 dark:bg-red-600 rounded-sm mr-1"></span>
            <span className="text-gray-600 dark:text-gray-400">High: {priorityCounts.high}</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-yellow-500 dark:bg-yellow-600 rounded-sm mr-1"></span>
            <span className="text-gray-600 dark:text-gray-400">Medium: {priorityCounts.medium}</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-500 dark:bg-blue-600 rounded-sm mr-1"></span>
            <span className="text-gray-600 dark:text-gray-400">Low: {priorityCounts.low}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;