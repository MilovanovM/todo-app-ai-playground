import SwiftUI

struct ContentView: View {
    @State private var todos: [Todo] = []
    @State private var newTodoText: String = ""
    @State private var isLoading = false
    @State private var errorMessage: String?
    
    private let todoService = TodoService()
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("To Do List")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                // Add Todo Form
                VStack(alignment: .leading, spacing: 10) {
                    Text("What needs to be done?")
                        .font(.headline)
                    
                    HStack {
                        TextField("Enter task", text: $newTodoText)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        Button("Add") {
                            Task {
                                await addTodo()
                            }
                        }
                        .disabled(newTodoText.isEmpty)
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(10)
                
                // Todo List
                VStack(alignment: .leading, spacing: 10) {
                    Text("Tasks")
                        .font(.headline)
                    
                    if isLoading {
                        ProgressView()
                            .frame(maxWidth: .infinity, alignment: .center)
                    } else if todos.isEmpty {
                        Text("No tasks")
                            .foregroundColor(.gray)
                            .frame(maxWidth: .infinity, alignment: .center)
                    } else {
                        List {
                            ForEach(todos) { todo in
                                HStack {
                                    Text(todo.text)
                                    Spacer()
                                    Button("Remove") {
                                        Task {
                                            await deleteTodo(id: todo.id)
                                        }
                                    }
                                    .foregroundColor(.red)
                                }
                            }
                        }
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(10)
                
                if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .padding()
                }
            }
            .padding()
            .onAppear {
                Task {
                    await fetchTodos()
                }
            }
        }
    }
    
    private func fetchTodos() async {
        isLoading = true
        errorMessage = nil
        
        do {
            todos = try await todoService.fetchTodos()
        } catch {
            errorMessage = "Failed to fetch todos: \(error.localizedDescription)"
        }
        
        isLoading = false
    }
    
    private func addTodo() async {
        guard !newTodoText.isEmpty else { return }
        
        isLoading = true
        errorMessage = nil
        
        do {
            try await todoService.addTodo(text: newTodoText)
            newTodoText = ""
            await fetchTodos()
        } catch {
            errorMessage = "Failed to add todo: \(error.localizedDescription)"
        }
        
        isLoading = false
    }
    
    private func deleteTodo(id: Int) async {
        isLoading = true
        errorMessage = nil
        
        do {
            try await todoService.deleteTodo(id: id)
            await fetchTodos()
        } catch {
            errorMessage = "Failed to delete todo: \(error.localizedDescription)"
        }
        
        isLoading = false
    }
} 