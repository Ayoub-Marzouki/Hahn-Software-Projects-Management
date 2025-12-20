package com.projects.manager.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projects.manager.exceptions.ResourceNotFoundException;
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
        // Fetch existing task to preserve relationships (like Project)
        Task existingTask = getTaskById(task.getId());
        
        // Update fields
        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setIsCompleted(task.getIsCompleted());
        
        // Note: We do NOT update 'project' here, preserving the existing link.
        
        return taskRepository.save(existingTask);
    }

    public Task getTaskById(long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with ID " + id + " not found"));
    }

    public void deleteTask(long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
