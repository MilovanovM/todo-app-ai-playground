# Todo API

A simple REST API for managing todo items built with .NET 9.0 and SQLite.

## Features

- Get all todo items (GET /todos/)
- Add a new todo item (POST /todos/)
- Delete a todo item (DELETE /todos/{id})

## Prerequisites

- .NET 9.0 SDK
- Docker (optional, for containerized deployment)

## Running Locally

1. Build the application:
```bash
dotnet build
```

2. Run the application:
```bash
dotnet run --urls="http://localhost:8003"
```

## Running with Docker

1. Build the Docker image:
```bash
docker build -t todoapi .
```

2. Run the container:
```bash
docker run -p 8003:8003 todoapi
```

## API Endpoints

### Get all todos
```bash
curl http://localhost:8003/todos
```

### Add a new todo
```bash
curl -X POST http://localhost:8003/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy groceries"}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:8003/todos/1
```

## Database

The application uses SQLite as its database. The database file (`todo.db`) is created automatically when the application starts.

## Notes

- The application runs on port 8003
- No authentication or authorization is implemented
- The database is stored locally in the application directory 