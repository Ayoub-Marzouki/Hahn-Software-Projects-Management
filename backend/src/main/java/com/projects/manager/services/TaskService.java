package com.projects.manager.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projects.manager.exceptions.ResourceNotFoundException;
import com.projects.manager.models.Task;
import com.projects.manager.repositories.TaskRepository;
import jakarta.validation.Valid;
import com.projects.manager.models.User;
import com.projects.manager.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<Task> getAllTasks() {
        User currentUser = getCurrentUser();
        return taskRepository.findAll().stream()
                .filter(t -> t.getProject().getUser().getId().equals(currentUser.getId()))
                .toList();
    }

    public Task createTask(@Valid Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(@Valid Task task) {
        Task existingTask = getTaskById(task.getId());
        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setIsCompleted(task.getIsCompleted());

        return taskRepository.save(existingTask);
    }

    public Task getTaskById(long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with ID " + id + " not found"));
        
        if (!task.getProject().getUser().getId().equals(getCurrentUser().getId())) {
            throw new ResourceNotFoundException("Task not found");
        }
        return task;
    }

    public void deleteTask(long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId).stream()
                .filter(t -> t.getProject().getUser().getId().equals(getCurrentUser().getId()))
                .toList();
    }
}
