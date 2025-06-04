package com.example.todo.controller;

import com.example.todo.model.ToDoItem;
import com.example.todo.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/todos")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public CompletableFuture<ResponseEntity<List<ToDoItem>>> getAllItems() {
        return toDoService.getAllItems()
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<ToDoItem>> addItem(@RequestBody ToDoItem item) {
        return toDoService.addItem(item)
                .thenApply(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public CompletableFuture<ResponseEntity<Void>> deleteItem(@PathVariable Long id) {
        return toDoService.deleteItem(id)
                .thenApply(v -> ResponseEntity.ok().build());
    }
} 