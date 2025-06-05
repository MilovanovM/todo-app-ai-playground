# Todo API

A simple REST API for managing todo items built with .NET 9.0 and SQLite.

## Features

- Get all todo items (GET /todos/)
- Add a new todo item (POST /todos/)
- Delete a todo item (DELETE /todos/{id})

## Prerequisites

- .NET 9.0 SDK (for local development)
- Docker and Docker Compose (for containerized deployment)

## Running the Application

### Option 1: Local Development

1. Build the application:
```bash
dotnet build
```

2. Run the application:
```bash
dotnet run --urls="http://localhost:8001"
```

### Option 2: Docker Compose (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
docker compose up
```

This will build and start the application in a container, making it available at http://localhost:8001.

### Option 3: Manual Docker Build

1. Build the Docker image:
```bash
docker build -t todoapi .
```

2. Run the container:
```bash
docker run -p 8001:8001 todoapi
```

## API Endpoints

### Get all todos
```bash
curl http://localhost:8001/todos
```

### Add a new todo
```bash
curl -X POST http://localhost:8001/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy groceries"}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:8001/todos/1
```

## Database

The application uses SQLite as its database. The database file (`todo.db`) is created automatically when the application starts.

## Notes

- The application runs on port 8001
- No authentication or authorization is implemented
- The database is stored locally in the application directory 