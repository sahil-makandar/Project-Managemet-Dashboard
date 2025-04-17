import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Board from './components/Board';
import TaskStatistics from './components/TaskStatistics';
import { initialBoardData, BoardData } from './data/mockData';

function App() {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);
  // Remove the unused searchQuery declaration or use it
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const handleBoardUpdate = (newData: BoardData) => {
    setBoardData(newData);
  };

  const handleSearch = (query: string) => {
    // We need to use the query parameter somewhere
    console.log('Searching for:', query);
    // You could filter tasks here based on the query
  };

  const handleFilterChange = (type: string, value: string) => {
    if (type === 'priority') {
      setPriorityFilter(value);
    } else if (type === 'assignee') {
      setAssigneeFilter(value);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          currentPriorityFilter={priorityFilter}
          currentAssigneeFilter={assigneeFilter}
        />
        <main className="container mx-auto px-4 pb-8 max-w-full">
          <TaskStatistics data={boardData} />
          <Board 
            data={boardData} 
            onBoardUpdate={handleBoardUpdate} 
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
