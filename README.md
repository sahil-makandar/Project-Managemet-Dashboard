# Project Management Board

A modern, responsive project management board built with React, TypeScript, and Tailwind CSS. This application provides an intuitive drag-and-drop interface for managing tasks across different stages of completion.

## Features

- **Interactive Kanban Board**: Drag and drop tasks between different status columns
- **Task Management**: Create, edit, and view detailed task information
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **User Assignment**: Assign tasks to team members
- **Task Filtering**: Filter tasks by priority and assignee
- **Search Functionality**: Search for specific tasks
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Task Statistics**: View completion rates and task distribution

## Tech Stack

- **React 19**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **Vite**: For fast development and optimized builds
- **DND Kit**: For drag and drop functionality
- **Date-fns**: For date formatting and manipulation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sahil-makandar/Project-Managemet-Dashboard.git
   cd Project-Managemet-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
project-management-board/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # React components
│   ├── context/            # Context providers
│   ├── data/               # Mock data and types
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Usage

### Creating a Task

1. Click the "Add Task" button in the top right corner
2. Fill in the task details (title, description, status, priority, due date, assignee)
3. Click "Create Task"

### Moving a Task

1. Drag a task card from one column
2. Drop it into another column to change its status

### Editing a Task

1. Click on a task card to view its details
2. Click the "Edit" button
3. Modify the task details
4. Click "Update Task"

### Filtering Tasks

1. Click the filter icon in the header
2. Select priority and/or assignee filters
3. The board will update to show only matching tasks

### Searching Tasks

1. Type in the search box in the header
2. The board will update to show only tasks matching the search query

### Toggling Dark Mode

Click the sun/moon icon in the header to switch between light and dark modes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

