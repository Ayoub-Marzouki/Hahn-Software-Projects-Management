package com.projects.manager.services;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.projects.manager.exceptions.ResourceNotFoundException;
import com.projects.manager.models.Project;
import com.projects.manager.models.Task;
import com.projects.manager.models.User;
import com.projects.manager.repositories.ProjectRepository;
import com.projects.manager.repositories.UserRepository;

import jakarta.validation.Valid;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<Project> getAllProjects() {
        return projectRepository.findByUser(getCurrentUser());
    }

    public Project createProject(@Valid Project project) {
        project.setUser(getCurrentUser());
        return projectRepository.save(project);
    }

    public Project updateProject(@Valid Project project) {
        Project existing = getProjectById(project.getId());

        existing.setTitle(project.getTitle());
        existing.setDescription(project.getDescription());
        return projectRepository.save(existing);
    }

    public Project getProjectById(long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with ID " + id + " not found"));
        
        if (!project.getUser().getId().equals(getCurrentUser().getId())) {
            throw new ResourceNotFoundException("Project not found"); // Hide existence if not owner
        }
        return project;
    }

    public Map<String, Object> getProjectProgress(long id) {
        Project project = getProjectById(id); // Checks ownership
        List<Task> tasks = project.getTasks();
        
        int totalTasks = 0;
        int completedTasks = 0;
        double progressPercentage = 0.0;

        if (tasks != null && !tasks.isEmpty()) {
            totalTasks = tasks.size();
            completedTasks = (int) tasks.stream()
                    .filter(task -> Boolean.TRUE.equals(task.getIsCompleted()))
                    .count();
            progressPercentage = (completedTasks * 100.0) / totalTasks;
        }

        Map<String, Object> progress = new HashMap<>();
        progress.put("projectId", id);
        progress.put("projectTitle", project.getTitle());
        progress.put("totalTasks", totalTasks);
        progress.put("completedTasks", completedTasks);
        progress.put("progressPercentage", Math.round(progressPercentage * 100.0) / 100.0);
        
        return progress;
    }

    public void deleteProject(long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
