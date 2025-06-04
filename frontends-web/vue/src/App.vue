<template>
  <div class="container mt-5">
    <h1>To Do List</h1>
    
    <!-- Add Todo Form -->
    <div class="card mb-4">
      <div class="card-body">
        <label for="newTodo" class="form-label">What needs to be done?</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="newTodo"
            v-model="newTodoText"
            @keyup.enter="addTodo"
            placeholder="Enter a new task"
          >
          <button class="btn btn-primary" @click="addTodo">Add</button>
        </div>
      </div>
    </div>

    <!-- Todo List -->
    <h2>Tasks</h2>
    <div v-if="todos.length === 0" class="alert alert-info">
      No tasks
    </div>
    <div v-else class="list-group">
      <div v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ todo.text }}</span>
        <button class="btn btn-danger btn-sm" @click="removeTodo(todo.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      newTodoText: ''
    }
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:8001/todos/');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      if (!this.newTodoText.trim()) return;
      
      try {
        await axios.post('http://localhost:8001/todos/', {
          text: this.newTodoText
        });
        this.newTodoText = '';
        await this.fetchTodos();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async removeTodo(id) {
      try {
        await axios.delete(`http://localhost:8001/todos/${id}`);
        await this.fetchTodos();
      } catch (error) {
        console.error('Error removing todo:', error);
      }
    }
  },
  mounted() {
    this.fetchTodos();
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

.container {
  max-width: 800px;
}

.list-group-item {
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.btn-danger {
  transition: all 0.2s;
}

.btn-danger:hover {
  transform: scale(1.05);
}
</style> 