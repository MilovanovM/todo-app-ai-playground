# React Todo List Application

A simple Todo List application built with React, TypeScript, and Bootstrap. The application allows users to add and remove tasks, with data being persisted through a REST API.

## Features

- Add new tasks
- Remove existing tasks
- Responsive design using Bootstrap
- TypeScript for type safety
- REST API integration

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API server running on port 8001

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure the backend API server is running on `http://localhost:8001`
2. Start the React development server:
```bash
npm start
```
3. The application will be available at `http://localhost:8000`

## API Endpoints

The application expects the following API endpoints to be available:

- GET `http://localhost:8001/todos/` - Fetch all todos
- POST `http://localhost:8001/todos/` - Create a new todo
- DELETE `http://localhost:8001/todos/{id}` - Delete a todo by ID

## Technologies Used

- React
- TypeScript
- Bootstrap
- Axios
- Create React App
