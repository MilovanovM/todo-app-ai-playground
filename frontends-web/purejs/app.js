document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');
    const API_URL = 'http://localhost:8001/todos';

    // Load todos when page loads
    loadTodos();

    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('todoText');
        const text = input.value.trim();

        if (text) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                });

                if (response.ok) {
                    input.value = '';
                    loadTodos();
                } else {
                    console.error('Failed to add todo');
                }
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    });

    // Load todos from API
    async function loadTodos() {
        try {
            const response = await fetch(API_URL);
            const todos = await response.json();

            todoList.innerHTML = '';
            
            if (todos.length === 0) {
                todoList.innerHTML = '<p class="text-muted">No tasks</p>';
                return;
            }

            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';
                todoItem.innerHTML = `
                    <span>${todo.text}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Remove</button>
                `;
                todoList.appendChild(todoItem);
            });
        } catch (error) {
            console.error('Error loading todos:', error);
            todoList.innerHTML = '<p class="text-danger">Error loading tasks</p>';
        }
    }

    // Delete todo
    window.deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                loadTodos();
            } else {
                console.error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
}); 