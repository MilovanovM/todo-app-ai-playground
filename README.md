# TO-DO list

This repo contains implementations of a simple to-do list app in different languages and frameworks.

The apps were created via the agentic mode in Cursor/VSCode+Copilot and use the same UI (based on Bootstrap).

All backends are on port 8001, all frontends are on port 8000. You can easily combine any frontend app with any backend
API (except Laravel, see below).

**Backends**

- [Python](https://www.python.org/) ([FastAPI](https://fastapi.tiangolo.com/))
- [Go](https://go.dev/) ([Gin](https://gin-gonic.com/))
- [ASP.NET](https://dotnet.microsoft.com/en-us/) ([Web API](https://dotnet.microsoft.com/en-us/apps/aspnet/apis))
- [PHP](https://www.php.net/) ([Laravel](https://laravel.com/)) *
- [Ruby](https://www.ruby-lang.org/) ([Rails](https://rubyonrails.org/))
- [NodeJS](https://nodejs.org/) ([Express](https://expressjs.com/))
- [Java](https://www.java.com/) ([Spring](https://spring.io/))

*) I couldn't make it work on `/todos` path, it works on `/api/todos` instead.

**Web Frontends**

- [React](https://react.dev/)
- [Angular](https://angular.dev/)
- [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)
- [Vue](https://vuejs.org/)
- [Pure JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Mobile Frontends**

- [React Native](https://reactnative.dev/)
- [Flutter](https://flutter.dev/)
- [MAUI](https://dotnet.microsoft.com/en-us/apps/maui)
- [Swift](https://www.swift.org/)
- [Kotlin](https://kotlinlang.org/)

**The prompt for backends**

```
Create a <language> app (using <framework> framework) that contains async REST API for a simple to-do list.
The database for the app is local SQLite.
Models in the app: ToDoItem (just text).
Supported API operations:
- get a list (GET /todos/)
- add a to-do item (POST /todos/, the body is JSON {"text":"to do item's text"})
- remove a to-do item (DELETE /todos/{id})
The app supports nor authentications nor authorization.
The app should be easily run via Docker (without docker compose) and it should be available by URL 'localhost' and port 8001.
```

**The prompt for web frontends**

```
Create a JavaScript app (using <framework> framework) that implements a simple to-do list.
You should use Bootstrap for the layout.
The UI should look like:
Title (H1 tag): To Do List
A form for adding a new item:
Label "What needs to be done?", then on the new line an input box, and a button called "Add". When a user presses the "Add" button we check if the input box if not empty, and then execute a POST API query to http://localhost:8001/todos/ with JSON that contains only "text" field.
Below this form is the list of added items. List can be pulled via GET API request to http://localhost:8001/todos/.
Title of the list (H2 tag): Tasks.
If there is no added tasks then show a simple text "No tasks".
If there are tasks, then show a list of tasks. Each row consists of a title of a task, and "Remove" button. When a user presses the "Remove" button, we should execute a DELETE API query to http://localhost:8001/todos/{id}
The app should be started via a simple console command, and served on port 8000
```

**The prompt for mobile apps**

```
Create a cross-platform (iOS and Android) app using <framework> framework that implements a simple to-do list.
The UI should look like:
Title: To Do List
A form for adding a new item:
Label "What needs to be done?", then on the new line an input box, and a button called "Add". When a user presses the "Add" button we check if the input box if not empty, and then execute a POST API query to http://localhost:8001/todos/ with JSON that contains only "text" field.
Below this form is the list of added items. List can be pulled via GET API request to http://localhost:8001/todos/.
Title of the list: Tasks.
If there is no added tasks then show a simple text "No tasks".
If there are tasks, then show a list of tasks. Each row consists of a title of a task, and "Remove" button. When a user presses the "Remove" button, we should execute a DELETE API query to http://localhost:8001/todos/{id}
The app should be started via a simple console command.
Please note that the API endpoint by "localhost" URL is hosted on my host machine, and should be available from within both Android and iOS simulators.
```