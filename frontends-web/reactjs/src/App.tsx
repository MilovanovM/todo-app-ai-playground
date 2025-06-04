import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8001/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await axios.post('http://localhost:8001/todos/', {
        text: newTodo
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleRemoveTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8001/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To Do List</h1>
      
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="mb-3">
          <label htmlFor="newTodo" className="form-label">What needs to be done?</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              id="newTodo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter new task"
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      <h2 className="mb-3">Tasks</h2>
      {todos.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              {todo.text}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
