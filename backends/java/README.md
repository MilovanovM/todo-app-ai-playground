# Todo List Application

A simple async REST API for managing todo items built with Spring Boot and SQLite.

## API Endpoints

- GET /todos/ - Get all todo items
- POST /todos/ - Add a new todo item (body: {"text": "todo item text"})
- DELETE /todos/{id} - Delete a todo item by ID

## Running with Docker

1. Build the Docker image:
```bash
docker build -t todo-app .
```

2. Run the container:
```bash
docker run -p 8007:8007 todo-app
```

The application will be available at http://localhost:8007

## Running Locally

1. Build the application:
```bash
./mvnw clean package
```

2. Run the application:
```bash
java -jar target/todo-0.0.1-SNAPSHOT.jar
```

The application will be available at http://localhost:8007 