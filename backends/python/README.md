# Todo List API

A simple REST API for managing todo items built with FastAPI and SQLite.

## Features

- Get list of todo items
- Add new todo items
- Delete todo items

## Running with Docker

1. Build the Docker image:
```bash
docker build -t todo-api .
```

2. Run the container:
```bash
docker run -p 8001:8001 todo-api
```

The API will be available at http://localhost:8001

## API Endpoints

- `GET /todos/` - Get all todo items
- `POST /todos/` - Create a new todo item
- `DELETE /todos/{todo_id}` - Delete a todo item by ID

## API Documentation

Once the application is running, you can access:
- Swagger UI documentation at http://localhost:8001/docs
- ReDoc documentation at http://localhost:8001/redoc 