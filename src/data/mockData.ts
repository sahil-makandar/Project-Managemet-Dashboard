import { format } from 'date-fns';

export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: User;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type BoardData = {
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: 'user-4',
    name: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export const initialBoardData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Create project plan',
      description: 'Outline the project goals, timeline, and deliverables',
      status: 'todo',
      priority: 'high',
      dueDate: format(new Date(2023, 11, 25), 'MMM dd, yyyy'),
      assignee: users[0],
    },
    'task-2': {
      id: 'task-2',
      title: 'Design UI mockups',
      description: 'Create wireframes and visual designs for the application',
      status: 'in-progress',
      priority: 'medium',
      dueDate: format(new Date(2023, 11, 20), 'MMM dd, yyyy'),
      assignee: users[1],
    },
    'task-3': {
      id: 'task-3',
      title: 'Implement authentication',
      description: 'Set up user authentication and authorization',
      status: 'review',
      priority: 'high',
      dueDate: format(new Date(2023, 11, 18), 'MMM dd, yyyy'),
      assignee: users[2],
    },
    'task-4': {
      id: 'task-4',
      title: 'Write API documentation',
      description: 'Document all API endpoints and their usage',
      status: 'done',
      priority: 'low',
      dueDate: format(new Date(2023, 11, 15), 'MMM dd, yyyy'),
      assignee: users[3],
    },
    'task-5': {
      id: 'task-5',
      title: 'Set up CI/CD pipeline',
      description: 'Configure continuous integration and deployment',
      status: 'todo',
      priority: 'medium',
      dueDate: format(new Date(2023, 11, 28), 'MMM dd, yyyy'),
      assignee: users[2],
    },
    'task-6': {
      id: 'task-6',
      title: 'Implement dashboard',
      description: 'Create the main dashboard with key metrics',
      status: 'in-progress',
      priority: 'high',
      dueDate: format(new Date(2023, 11, 22), 'MMM dd, yyyy'),
      assignee: users[0],
    },
    'task-7': {
      id: 'task-7',
      title: 'User testing',
      description: 'Conduct user testing sessions and gather feedback',
      status: 'todo',
      priority: 'medium',
      dueDate: format(new Date(2023, 12, 5), 'MMM dd, yyyy'),
      assignee: users[1],
    },
    'task-8': {
      id: 'task-8',
      title: 'Fix responsive layout',
      description: 'Address layout issues on mobile devices',
      status: 'review',
      priority: 'low',
      dueDate: format(new Date(2023, 11, 19), 'MMM dd, yyyy'),
      assignee: users[3],
    },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-5', 'task-7'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-2', 'task-6'],
    },
    'review': {
      id: 'review',
      title: 'Review',
      taskIds: ['task-3', 'task-8'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['todo', 'in-progress', 'review', 'done'],
};