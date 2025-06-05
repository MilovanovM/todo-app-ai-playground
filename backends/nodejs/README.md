# Todo List REST API

A simple REST API for managing todo items built with Node.js, Express, and SQLite.

## API Endpoints

- `GET /todos/` - Get all todo items
- `POST /todos/` - Create a new todo item
  - Body: `{ "text": "Your todo text" }`
- `DELETE /todos/:id` - Delete a todo item by ID

## Running the Application

### Using Docker

1. Build the Docker image:
```bash
docker build -t todo-app .
```

2. Run the container:
```bash
docker run -p 8001:8001 todo-app
```

The API will be available at `http://localhost:8001`

### Using Docker Compose

1. Build and run the containers:
```bash
docker compose up --build
```

2. The API will be available at `http://localhost:8001`

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the application:
```bash
npm start
```

The API will be available at `http://localhost:8001` 