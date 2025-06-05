import Foundation

class TodoService {
    private let baseURL = "http://localhost:8001/todos"
    
    func fetchTodos() async throws -> [Todo] {
        guard let url = URL(string: baseURL) else {
            throw URLError(.badURL)
        }
        
        let (data, response) = try await URLSession.shared.data(from: url)
        
        // Print raw response data
        if let jsonString = String(data: data, encoding: .utf8) {
            print("Raw API Response:")
            print(jsonString)
        }
        
        do {
            return try JSONDecoder().decode([Todo].self, from: data)
        } catch {
            print("JSON Decoding Error: \(error)")
            if let decodingError = error as? DecodingError {
                switch decodingError {
                case .dataCorrupted(let context):
                    print("Data corrupted: \(context.debugDescription)")
                case .keyNotFound(let key, let context):
                    print("Key '\(key)' not found: \(context.debugDescription)")
                case .typeMismatch(let type, let context):
                    print("Type '\(type)' mismatch: \(context.debugDescription)")
                case .valueNotFound(let type, let context):
                    print("Value of type '\(type)' not found: \(context.debugDescription)")
                @unknown default:
                    print("Unknown decoding error")
                }
            }
            throw error
        }
    }
    
    func addTodo(text: String) async throws {
        guard let url = URL(string: baseURL) else {
            throw URLError(.badURL)
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let todoData = ["text": text]
        request.httpBody = try JSONEncoder().encode(todoData)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        // Print response for POST request
        if let jsonString = String(data: data, encoding: .utf8) {
            print("POST Response:")
            print(jsonString)
        }
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw URLError(.badServerResponse)
        }
    }
    
    func deleteTodo(id: Int) async throws {
        guard let url = URL(string: "\(baseURL)/\(id)") else {
            throw URLError(.badURL)
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        // Print response for DELETE request
        if let jsonString = String(data: data, encoding: .utf8) {
            print("DELETE Response:")
            print(jsonString)
        }
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw URLError(.badServerResponse)
        }
    }
} 