# Todo List API

A simple REST API for managing todo items built with Go and Gin framework.

## Features

- Get all todo items
- Add new todo items
- Delete todo items
- SQLite database for data persistence
- Docker support for easy deployment

## API Endpoints

- `GET /todos/` - Get all todo items
- `POST /todos/` - Create a new todo item
  - Request body: `{"text": "Your todo text"}`
- `DELETE /todos/{id}` - Delete a todo item by ID

## Running the Application

### Using Docker (Recommended)

1. Make sure you have Docker installed
2. Run the following commands in the project directory:
   ```bash
   # Build the Docker image
   docker build -t todo-app .
   
   # Run the container
   docker run -p 8002:8002 -v $(pwd)/data:/app/data todo-app
   ```
3. The API will be available at `http://localhost:8002`

### Manual Build

1. Make sure you have Go 1.21 or later installed
2. Run the following commands:
   ```bash
   go mod download
   go run main.go
   ```
3. The API will be available at `http://localhost:8002`

## Example Usage

### Get all todos
```bash
curl http://localhost:8002/todos/
```

### Create a new todo
```bash
curl -X POST http://localhost:8002/todos/ \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries"}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:8002/todos/1
``` 