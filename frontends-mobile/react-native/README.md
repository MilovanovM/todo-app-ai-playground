# React Native Todo App

A simple cross-platform (iOS and Android) todo list application built with React Native.

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Backend server running on http://localhost:8001

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the App

### iOS

1. Install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

2. Start the iOS app:
```bash
npx react-native run-ios
```

### Android

1. Start the Android app:
```bash
npx react-native run-android
```

## Features

- Add new tasks
- View list of tasks
- Remove tasks
- Real-time updates
- Cross-platform support (iOS and Android)

## API Endpoints

The app communicates with a backend server running on http://localhost:8001:

- GET /todos/ - Fetch all todos
- POST /todos/ - Create a new todo
- DELETE /todos/{id} - Delete a todo by ID 