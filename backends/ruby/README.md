# Todo List API

A simple REST API for managing todo items built with Ruby on Rails.

## Features

- List all todo items
- Add new todo items
- Delete todo items
- SQLite database
- Docker support

## API Endpoints

- `GET /todos` - List all todo items
- `POST /todos` - Create a new todo item
  - Request body: `{"text": "your todo item text"}`
- `DELETE /todos/:id` - Delete a todo item by ID

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Start the application:
   ```bash
   docker compose up
   ```

   This will:
   - Build the Docker image
   - Start the Rails server
   - Make the API available at `http://localhost:8005`

3. To stop the application:
   ```bash
   docker compose down
   ```

## Development

The application is configured to run in development mode with hot-reloading enabled. Any changes to the source code will be automatically reflected in the running application.

## API Examples

### List all todos
```bash
curl http://localhost:8005/todos
```

### Create a new todo
```bash
curl -X POST http://localhost:8005/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries"}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:8005/todos/1
```

## Project Structure

- `app/controllers/todos_controller.rb` - API endpoints implementation
- `app/models/to_do_item.rb` - Todo item model
- `config/routes.rb` - API routes configuration
- `Dockerfile` - Docker image configuration
- `docker-compose.yml` - Docker Compose configuration
