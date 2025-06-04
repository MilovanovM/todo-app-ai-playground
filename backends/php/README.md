# Laravel App Docker Setup

## Prerequisites
- Docker installed on your machine

## Quick Start

1. **Build the Docker image:**
   ```sh
   docker build -t laravel-app .
   ```

2. **Generate the application key (if not already set):**
   ```sh
   docker run --rm -v $(pwd):/var/www laravel-app php artisan key:generate
   ```

3. **Ensure the SQLite database file exists:**
   ```sh
   touch database/database.sqlite
   ```

4. **Run database migrations (optional, for a fresh setup):**
   ```sh
   docker run --rm -v $(pwd):/var/www laravel-app php artisan migrate
   ```

5. **Start the application on port 8004:**
   ```sh
   docker run --rm -it -p 8004:8004 -v $(pwd):/var/www laravel-app php artisan serve --host=0.0.0.0 --port=8004
   ```

6. **Visit the app:**
   Open your browser and go to [http://localhost:8004](http://localhost:8004)

## Notes
- The `.env` file is configured for SQLite with the path `/var/www/database/database.sqlite`.
- For production, use a web server (like Nginx) in front of PHP-FPM.
- For other database drivers, update your `.env` accordingly.
