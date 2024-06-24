package com.example.backend.service;

import com.example.backend.model.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
    Task createTask(Task task);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
}
