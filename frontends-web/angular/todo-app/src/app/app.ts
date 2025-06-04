import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  tasks: Task[] = [];
  newTaskText: string = '';

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    console.log('Loading tasks...');
    this.http.get<Task[]>('http://localhost:8001/todos/').subscribe({
      next: (tasks) => {
        console.log('Tasks received:', tasks);
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  addTask() {
    const text = this.newTaskText.trim();
    if (!text) return;
    this.http.post<Task>('http://localhost:8001/todos/', { text }).subscribe({
      next: () => {
        this.newTaskText = '';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  removeTask(id: number) {
    this.http.delete(`http://localhost:8001/todos/${id}`).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error removing task:', error);
      }
    });
  }
}
