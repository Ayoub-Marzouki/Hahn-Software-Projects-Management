package com.projects.manager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projects.manager.models.Task;
import com.projects.manager.repositories.TaskRepository;
import jakarta.validation.Valid;

@Service
public class TaskService {
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(@Valid Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(@Valid Task task) {
        return taskRepository.save(task);
    }

    public Optional<Task> getTaskById(long id) {
        return taskRepository.findById(id);
    }

    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
