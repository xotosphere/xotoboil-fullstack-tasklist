package com.example.backend.controller;

import com.example.backend.messaging.kafka.KafkaProducer;
import com.example.backend.messaging.rabbitmq.RabbitMQProducer;
import com.example.backend.model.Task;
import com.example.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final KafkaProducer kafkaProducer;
    private final RabbitMQProducer rabbitMQProducer;

    public TaskController(TaskService taskService, KafkaProducer kafkaProducer, RabbitMQProducer rabbitMQProducer) {
        this.taskService = taskService;
        this.kafkaProducer = kafkaProducer;
        this.rabbitMQProducer = rabbitMQProducer;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        kafkaProducer.produce("New task created: " + task.getTitle());
        rabbitMQProducer.produce("New task created: " + task.getTitle());
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
