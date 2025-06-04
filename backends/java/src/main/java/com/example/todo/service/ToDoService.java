package com.example.todo.service;

import com.example.todo.model.ToDoItem;
import com.example.todo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class ToDoService {
    
    @Autowired
    private ToDoRepository toDoRepository;

    @Async
    public CompletableFuture<List<ToDoItem>> getAllItems() {
        return CompletableFuture.completedFuture(toDoRepository.findAll());
    }

    @Async
    public CompletableFuture<ToDoItem> addItem(ToDoItem item) {
        return CompletableFuture.completedFuture(toDoRepository.save(item));
    }

    @Async
    public CompletableFuture<Void> deleteItem(Long id) {
        toDoRepository.deleteById(id);
        return CompletableFuture.completedFuture(null);
    }
} 