import React, { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent, 
  DragOverlay, 
  DragStartEvent, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { BoardData, Task, User, users } from '../data/mockData';
import { format } from 'date-fns';
import TaskDetails from './TaskDetails';

interface BoardProps {
  data: BoardData;
  onBoardUpdate: (newData: BoardData) => void;
}

const Board: React.FC<BoardProps> = ({ data: initialData, onBoardUpdate }) => {
  const [boardData, setBoardData] = useState<BoardData>(initialData);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = Object.values(boardData.tasks).find(task => task.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Find the task that's being dragged
    const task = boardData.tasks[activeId];
    if (!task) return;
    
    // If dropping over a task
    if (boardData.tasks[overId]) {
      const overTask = boardData.tasks[overId];
      
      // If the task is already in the same column, do nothing
      if (task.status === overTask.status) return;
      
      // Move the task to the new column
      const sourceColumn = boardData.columns[task.status];
      const destinationColumn = boardData.columns[overTask.status];
      
      const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== activeId);
      const destinationTaskIndex = destinationColumn.taskIds.indexOf(overId);
      const newDestinationTaskIds = [...destinationColumn.taskIds];
      newDestinationTaskIds.splice(destinationTaskIndex, 0, activeId);
      
      const newBoardData = {
        ...boardData,
        tasks: {
          ...boardData.tasks,
          [activeId]: {
            ...task,
            status: overTask.status,
          },
        },
        columns: {
          ...boardData.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            taskIds: newSourceTaskIds,
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            taskIds: newDestinationTaskIds,
          },
        },
      };
      
      setBoardData(newBoardData);
      onBoardUpdate(newBoardData);
    } 
    // If dropping over a column
    else if (boardData.columns[overId]) {
      // If the task is already in the same column, do nothing
      if (task.status === overId) return;
      
      // Move the task to the new column
      const sourceColumn = boardData.columns[task.status];
      const destinationColumn = boardData.columns[overId];
      
      const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== activeId);
      const newDestinationTaskIds = [...destinationColumn.taskIds, activeId];
      
      const newBoardData = {
        ...boardData,
        tasks: {
          ...boardData.tasks,
          [activeId]: {
            ...task,
            status: overId as Task['status'],
          },
        },
        columns: {
          ...boardData.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            taskIds: newSourceTaskIds,
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            taskIds: newDestinationTaskIds,
          },
        },
      };
      
      setBoardData(newBoardData);
      onBoardUpdate(newBoardData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Find the columns
    const activeColumn = Object.values(boardData.columns).find(
      column => column.taskIds.includes(activeId)
    );
    
    const overColumn = Object.values(boardData.columns).find(
      column => column.taskIds.includes(overId) || column.id === overId
    );
    
    if (!activeColumn || !overColumn) return;
    
    // If the task is dropped in the same column but in a different position
    if (activeColumn.id === overColumn.id && boardData.tasks[overId]) {
      const newTaskIds = [...activeColumn.taskIds];
      const oldIndex = newTaskIds.indexOf(activeId);
      const newIndex = newTaskIds.indexOf(overId);
      
      const reorderedTaskIds = arrayMove(newTaskIds, oldIndex, newIndex);
      
      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [activeColumn.id]: {
            ...activeColumn,
            taskIds: reorderedTaskIds,
          },
        },
      };
      
      setBoardData(newBoardData);
      onBoardUpdate(newBoardData);
    }
    
    setActiveTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleEditTask = () => {
    setIsDetailsModalOpen(false);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'> & { id?: string }) => {
    let newBoardData: BoardData;
    
    // Format the date
    const formattedDueDate = format(new Date(taskData.dueDate), 'MMM dd, yyyy');
    
    // If editing an existing task
    if (isEditing && selectedTask) {
      newBoardData = {
        ...boardData,
        tasks: {
          ...boardData.tasks,
          [selectedTask.id]: {
            ...taskData,
            id: selectedTask.id,
            dueDate: formattedDueDate,
          } as Task,
        },
      };
    } 
    // If creating a new task
    else {
      const newTaskId = `task-${Date.now()}`;
      const newTask: Task = {
        ...taskData,
        id: newTaskId,
        dueDate: formattedDueDate,
      } as Task;
      
      const columnId = newTask.status;
      const column = boardData.columns[columnId];
      
      newBoardData = {
        ...boardData,
        tasks: {
          ...boardData.tasks,
          [newTaskId]: newTask,
        },
        columns: {
          ...boardData.columns,
          [columnId]: {
            ...column,
            taskIds: [...column.taskIds, newTaskId],
          },
        },
      };
    }
    
    setBoardData(newBoardData);
    onBoardUpdate(newBoardData);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md shadow-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Task
        </button>
      </div>
      
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {boardData.columnOrder.map(columnId => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map(taskId => boardData.tasks[taskId]);
            
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onTaskClick={handleTaskClick}
              />
            );
          })}
        </div>
        
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} onClick={() => {}} /> : null}
        </DragOverlay>
      </DndContext>
      
      {isModalOpen && (
        <TaskModal
          task={isEditing ? selectedTask : undefined}
          onSave={handleSaveTask}
          onClose={() => setIsModalOpen(false)}
          isEditing={isEditing}
        />
      )}
      
      {isDetailsModalOpen && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setIsDetailsModalOpen(false)}
          onEdit={handleEditTask}
        />
      )}
    </>
  );
};

export default Board;