# FastAPI Todo Application

A simple Todo application built with FastAPI and SQLite.

## Features

- Create, read, and delete todo items
- RESTful API endpoints
- SQLite database with SQLAlchemy ORM
- Docker support

## Prerequisites

- Docker and Docker Compose installed on your system

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Start the application using Docker Compose:
```bash
docker compose up --build
```

The application will be available at `http://localhost:8001`

## API Endpoints

- `GET /todos/` - Get all todo items
- `POST /todos/` - Create a new todo item
- `DELETE /todos/{todo_id}` - Delete a todo item by ID

## API Documentation

Once the application is running, you can access:
- Swagger UI documentation at `http://localhost:8001/docs`
- ReDoc documentation at `http://localhost:8001/redoc`

## Development

The application uses:
- FastAPI for the web framework
- SQLAlchemy for database ORM
- SQLite as the database
- Docker for containerization 