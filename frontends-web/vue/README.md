# Vue Todo List Application

A simple Todo List application built with Vue 3 and Bootstrap 5. This application allows users to create, view, and delete tasks through a clean and responsive interface.

## Features

- Add new tasks
- View list of tasks
- Delete tasks
- Responsive design using Bootstrap 5
- Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue-todo-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run serve
```

2. Open your browser and navigate to:
```
http://localhost:8000
```

## API Endpoints

The application expects a backend API running on `http://localhost:8001` with the following endpoints:

- `GET /todos/` - Fetch all tasks
- `POST /todos/` - Create a new task
  - Request body: `{ "text": "Task description" }`
- `DELETE /todos/{id}` - Delete a task by ID

## Project Structure

```
vue-todo-app/
├── public/
│   └── index.html
├── src/
│   ├── App.vue
│   └── main.js
├── .eslintrc.js
├── babel.config.js
├── package.json
└── README.md
```

## Technologies Used

- Vue 3
- Bootstrap 5
- Axios for API requests
- ESLint for code linting
- Babel for JavaScript transpilation

## Development

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint and fix files

## License

MIT 