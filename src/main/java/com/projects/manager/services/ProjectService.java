package com.projects.manager.services;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.projects.manager.exceptions.ResourceNotFoundException;
import com.projects.manager.models.Project;
import com.projects.manager.models.Task;
import com.projects.manager.repositories.ProjectRepository;

import jakarta.validation.Valid;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(@Valid Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(@Valid Project project) {
        // Ensure existance before update
        getProjectById(project.getId());
        return projectRepository.save(project);
    }

    public Project getProjectById(long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with ID " + id + " not found"));
    }

    public Map<String, Object> getProjectProgress(long id) {
        Project project = getProjectById(id);
        List<Task> tasks = project.getTasks();
        
        int totalTasks = 0;
        int completedTasks = 0;
        double progressPercentage = 0.0;

        if (tasks != null && !tasks.isEmpty()) {
            totalTasks = tasks.size();
            completedTasks = (int) tasks.stream().filter(Task::isCompleted).count();
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
        Project project = getProjectById(id); // Fail fast if not found
        projectRepository.delete(project);
    }
}
