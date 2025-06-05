package com.example.todoapp

import retrofit2.Response
import retrofit2.http.*

interface TodoApiService {
    @GET("todos/")
    suspend fun getTodos(): Response<List<Todo>>

    @POST("todos/")
    suspend fun createTodo(@Body todo: Map<String, String>): Response<Todo>

    @DELETE("todos/{id}")
    suspend fun deleteTodo(@Path("id") id: Int): Response<Unit>
} 