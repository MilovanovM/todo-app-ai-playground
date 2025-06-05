# Todo List Application

A simple todo list application built with pure JavaScript and Bootstrap. The application communicates with a backend API to manage todo items.

## Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)
- A running backend API server on port 8001

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure your backend API server is running on `http://localhost:8001`
2. Start the frontend server:
```bash
npm start
```
3. Open your browser and navigate to `http://localhost:8000`

## Features

- Add new todo items
- View list of todos
- Remove todo items
- Responsive design using Bootstrap
- Real-time updates when adding or removing items

## API Endpoints

The application expects the following API endpoints to be available on the backend:

- `GET http://localhost:8001/todos/` - Get all todos
- `POST http://localhost:8001/todos/` - Create a new todo
- `DELETE http://localhost:8001/todos/{id}` - Delete a todo by ID

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - Custom styles
- `app.js` - Application logic
- `server.js` - Express server for serving static files
- `package.json` - Project dependencies and scripts 