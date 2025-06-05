package com.example.todoapp

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.todoapp.databinding.ActivityMainBinding
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var todoAdapter: TodoAdapter
    private lateinit var apiService: TodoApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupApiService()
        setupRecyclerView()
        setupAddButton()
        loadTodos()
    }

    private fun setupApiService() {
        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8001/") // 10.0.2.2 points to host machine's localhost
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        apiService = retrofit.create(TodoApiService::class.java)
    }

    private fun setupRecyclerView() {
        todoAdapter = TodoAdapter(onDeleteClick = { todo ->
            deleteTodo(todo)
        })
        binding.todoRecyclerView.apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            adapter = todoAdapter
        }
    }

    private fun setupAddButton() {
        binding.addButton.setOnClickListener {
            val todoText = binding.todoInput.text.toString().trim()
            if (todoText.isNotEmpty()) {
                addTodo(todoText)
                binding.todoInput.text.clear()
            }
        }
    }

    private fun loadTodos() {
        lifecycleScope.launch {
            try {
                val response = apiService.getTodos()
                if (response.isSuccessful) {
                    val todos = response.body() ?: emptyList()
                    updateTodoList(todos)
                } else {
                    showError("Failed to load todos")
                }
            } catch (e: Exception) {
                showError("Error: ${e.message}")
            }
        }
    }

    private fun addTodo(text: String) {
        lifecycleScope.launch {
            try {
                val response = apiService.createTodo(mapOf("text" to text))
                if (response.isSuccessful) {
                    loadTodos()
                } else {
                    showError("Failed to add todo")
                }
            } catch (e: Exception) {
                showError("Error: ${e.message}")
            }
        }
    }

    private fun deleteTodo(todo: Todo) {
        lifecycleScope.launch {
            try {
                val response = apiService.deleteTodo(todo.id)
                if (response.isSuccessful) {
                    loadTodos()
                } else {
                    showError("Failed to delete todo")
                }
            } catch (e: Exception) {
                showError("Error: ${e.message}")
            }
        }
    }

    private fun updateTodoList(todos: List<Todo>) {
        todoAdapter.updateTodos(todos)
        binding.emptyStateText.visibility = if (todos.isEmpty()) View.VISIBLE else View.GONE
        binding.todoRecyclerView.visibility = if (todos.isEmpty()) View.GONE else View.VISIBLE
    }

    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
} 