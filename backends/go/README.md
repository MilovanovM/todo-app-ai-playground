# Go Todo Backend

A simple REST API backend for a todo application built with Go, Gin, and SQLite.

## Features

- RESTful API endpoints for managing todo items
- SQLite database for data persistence
- CORS enabled for cross-origin requests
- Docker support for easy deployment

## API Endpoints

- `GET /todos/` - Get all todos
- `POST /todos/` - Create a new todo
- `DELETE /todos/:id` - Delete a todo by ID

## Prerequisites

- Docker
- Docker Compose

## Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Start the application using Docker Compose:
```bash
docker compose up --build
```

The application will be available at `http://localhost:8001`

## Development

### Project Structure

```
.
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── main.go            # Main application code
├── go.mod             # Go module file
└── data/              # SQLite database directory
```

### Building Without Docker

If you want to build and run the application without Docker:

1. Install Go 1.21 or later
2. Install SQLite development libraries
3. Run the following commands:
```bash
go mod download
go build
./main
```

## License

MIT 