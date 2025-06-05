# Todo List Application

A simple async REST API for managing todo items built with Spring Boot and SQLite.

## API Endpoints

- GET /todos/ - Get all todo items
- POST /todos/ - Add a new todo item (body: {"text": "todo item text"})
- DELETE /todos/{id} - Delete a todo item by ID

## Running the Application

### Using Docker Compose (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
docker compose up
```

This will build and start the application. The API will be available at http://localhost:8001

To stop the application:
```bash
docker compose down
```

### Using Docker

1. Build the Docker image:
```bash
docker build -t todo-app .
```

2. Run the container:
```bash
docker run -p 8001:8001 todo-app
```

The application will be available at http://localhost:8001

### Running Locally

1. Build the application:
```bash
./mvnw clean package
```

2. Run the application:
```bash
java -jar target/todo-0.0.1-SNAPSHOT.jar
```

The application will be available at http://localhost:8001