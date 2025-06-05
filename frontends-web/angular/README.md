# TodoApp

A simple Todo application built with Angular that allows users to manage their tasks. The application consists of a frontend built with Angular and a backend API.

## Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v20.0.0 or higher)
- Backend API server running on port 8001

## Project Structure

- Frontend: Angular application running on port 8000
- Backend: API server running on port 8001

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Start the backend API server (make sure it's running on port 8001)

3. Start the Angular development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:8000/`

The application will automatically reload whenever you modify any of the source files.

## Features

- View list of tasks
- Add new tasks
- Remove existing tasks
- Real-time updates

## Development

### Code scaffolding

To generate a new component:
```bash
ng generate component component-name
```

For a complete list of available schematics, run:
```bash
ng generate --help
```

### Building

To build the project:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

To run unit tests:
```bash
ng test
```

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview](https://angular.dev/tools/cli)
