# Todo List iOS App

A simple iOS todo list application built with SwiftUI that communicates with a local API server.

## Requirements

- Xcode 13.0 or later
- iOS 15.0 or later
- Swift 5.5 or later

## Setup

1. Open the project in Xcode
2. Make sure your API server is running on `http://localhost:8001`
3. Build and run the project in the iOS Simulator

## Features

- Add new tasks
- View list of tasks
- Remove tasks
- Real-time updates
- Error handling
- Loading states

## API Endpoints

The app communicates with the following endpoints:

- GET `http://localhost:8001/todos/` - Fetch all todos
- POST `http://localhost:8001/todos/` - Create a new todo
- DELETE `http://localhost:8001/todos/{id}` - Delete a todo

## Note

Make sure your API server is running and accessible from the iOS Simulator. The app uses `localhost` to connect to your host machine's API server. 