# Blazor To-Do List App

A simple to-do list application built with Blazor WebAssembly and Bootstrap.

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- A backend API running on `http://localhost:8001` (for handling todo CRUD operations)

## How to Run

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Run the application:**

   ```bash
   dotnet run --urls=http://localhost:8000
   ```

3. **Open your browser:**

   Navigate to [http://localhost:8000](http://localhost:8000) to view the app.

## Features

- Add new tasks via a form (POST to `http://localhost:8001/todos/`)
- View a list of tasks (GET from `http://localhost:8001/todos/`)
- Remove tasks (DELETE to `http://localhost:8001/todos/{id}`)

## Project Structure

- `Program.cs`: Entry point and app configuration
- `App.razor`: Root component
- `Shared/MainLayout.razor`: Main layout template
- `Pages/Index.razor`: Main to-do list page
- `Models/Todo.cs`: Todo item model
- `wwwroot/`: Static files (HTML, CSS, JS)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 