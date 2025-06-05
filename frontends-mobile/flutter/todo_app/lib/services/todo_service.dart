import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/todo.dart';

class TodoService {
  static String get baseUrl {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8001/todos/';
    } else {
      return 'http://127.0.0.1:8001/todos/';
    }
  }

  // Create a client that follows redirects
  final http.Client _client = http.Client();

  Future<List<Todo>> getTodos() async {
    final response = await _client.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      List<dynamic> jsonList = json.decode(response.body);
      return jsonList.map((json) => Todo.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load todos');
    }
  }

  Future<Todo> createTodo(String text) async {
    try {
      final body = json.encode({'text': text});
      print('Creating todo with body: $body');

      final response = await _client.post(
        Uri.parse(baseUrl),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: body,
      );

      print('Create response status: ${response.statusCode}');
      print('Create response headers: ${response.headers}');
      print('Create response body: ${response.body}');

      if (response.statusCode == 201 ||
          response.statusCode == 200 ||
          response.statusCode == 307) {
        // If we get a redirect, the creation was successful
        if (response.statusCode == 307) {
          // Make a GET request to fetch the newly created todo
          final getResponse = await _client.get(Uri.parse(baseUrl));
          if (getResponse.statusCode == 200) {
            List<dynamic> jsonList = json.decode(getResponse.body);
            if (jsonList.isNotEmpty) {
              // Return the last created todo
              return Todo.fromJson(jsonList.last);
            }
          }
        }
        return Todo.fromJson(json.decode(response.body));
      } else {
        throw Exception(
          'Failed to create todo: ${response.statusCode} - ${response.body}',
        );
      }
    } catch (e) {
      print('Create error: $e');
      throw Exception('Failed to create todo: $e');
    }
  }

  Future<void> deleteTodo(int id) async {
    try {
      // Remove trailing slash from baseUrl for delete operation
      final deleteUrl = baseUrl.replaceAll(RegExp(r'/$'), '');
      final response = await _client.delete(
        Uri.parse('$deleteUrl/$id'),
        headers: {'Content-Type': 'application/json'},
      );

      print('Delete response status: ${response.statusCode}');
      print('Delete response headers: ${response.headers}');
      print('Delete response body: ${response.body}');

      if (response.statusCode != 200 &&
          response.statusCode != 204 &&
          response.statusCode != 307) {
        throw Exception('Failed to delete todo: ${response.statusCode}');
      }
    } catch (e) {
      print('Delete error: $e');
      throw Exception('Failed to delete todo: $e');
    }
  }

  void dispose() {
    _client.close();
  }
}
