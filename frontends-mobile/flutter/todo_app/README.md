# Flutter Todo App

A cross-platform (iOS and Android) to-do list application built with Flutter.

## Prerequisites

- Flutter SDK (latest version)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Android SDK
- iOS SDK (macOS only)
- An Android emulator or iOS simulator
- A running backend API server at `http://localhost:8001`

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd todo_app
```

2. Install dependencies:
```bash
flutter pub get
```

3. Start your backend API server at `http://localhost:8001`

## Running the App

### For Android

1. Start an Android emulator:
```bash
flutter emulators --launch <emulator-name>
```
Or start it from Android Studio.

2. Run the app:
```bash
flutter run
```
When prompted, select your Android emulator.

### For iOS (macOS only)

1. Start an iOS simulator:
```bash
open -a Simulator
```

2. Run the app:
```bash
flutter run
```
When prompted, select your iOS simulator.

## API Endpoints

The app communicates with a backend API at the following endpoints:

- GET `/todos` - Get all todos
- POST `/todos` - Create a new todo
- DELETE `/todos/{id}` - Delete a todo

## Platform-Specific Notes

### Android
- The app uses `10.0.2.2` to access the host machine's localhost
- Make sure your API server is accessible from the Android emulator

### iOS
- The app uses `localhost` to access the host machine's localhost
- Make sure your API server is accessible from the iOS simulator

## Development Commands

- `r` - Hot reload
- `R` - Hot restart
- `q` - Quit the app
- `h` - Show all commands

## Troubleshooting

1. If the app can't connect to the API:
   - Make sure your API server is running
   - Check if the API server is accessible from the emulator/simulator
   - Verify the API endpoints are correct

2. If the app doesn't build:
   - Run `flutter doctor` to check for any issues
   - Make sure all dependencies are installed
   - Check if the Flutter SDK is up to date

## License

[Your License Here]
