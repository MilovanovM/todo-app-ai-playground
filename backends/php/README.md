# Laravel App Docker Setup

## Prerequisites
- Docker installed on your machine
- Docker Compose installed on your machine

## Quick Start

1. **Start the application:**
   ```sh
   docker compose up --build
   ```

2. **Visit the app:**
   Open your browser and go to [http://localhost:8001](http://localhost:8001)

## Additional Commands

- **Stop the application:**
  ```sh
  docker compose down
  ```

- **View logs:**
  ```sh
  docker compose logs -f
  ```

## Notes
- The application uses SQLite as the database, configured in the `.env` file.
- The database file is located at `database/database.sqlite`.
- For production, use a web server (like Nginx) in front of PHP-FPM.
- For other database drivers, update your `.env` and `docker-compose.yml` accordingly.
