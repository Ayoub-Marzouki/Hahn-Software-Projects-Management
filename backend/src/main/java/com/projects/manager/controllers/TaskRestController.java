package com.projects.manager.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projects.manager.models.Task;
import com.projects.manager.services.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
public class TaskRestController {
    private final TaskService taskService;

    public TaskRestController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@RequestParam(required = false) Long projectId) {
        if (projectId != null) {
            return ResponseEntity.ok(taskService.getTasksByProjectId(projectId));
        }
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable long id, @Valid @RequestBody Task task) {
        task.setId(id);
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> markTaskAsCompleted(@PathVariable long id) {
        Task task = taskService.getTaskById(id);
        task.setIsCompleted(true);
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task with ID " + id + " deleted successfully");
    }
}