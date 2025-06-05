/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';

interface Todo {
  id: number;
  text: string;
}

// Use different base URLs for iOS and Android
const API_BASE_URL = Platform.select({
  ios: 'http://127.0.0.1:8001',
  android: 'http://10.0.2.2:8001',
  default: 'http://localhost:8001',
});

function App(): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos/`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Failed to fetch todos');
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/todos/`, {
        text: newTodo.trim(),
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      Alert.alert('Error', 'Failed to add todo');
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error removing todo:', error);
      Alert.alert('Error', 'Failed to remove todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text style={styles.title}>To Do List</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>What needs to be done?</Text>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Enter a new task"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>Tasks</Text>
          {todos.length === 0 ? (
            <Text style={styles.noTasks}>No tasks</Text>
          ) : (
            todos.map(todo => (
              <View key={todo.id} style={styles.todoItem}>
                <Text style={styles.todoText}>{todo.text}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeTodo(todo.id)}>
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tasksContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  noTasks: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  todoText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default App;
