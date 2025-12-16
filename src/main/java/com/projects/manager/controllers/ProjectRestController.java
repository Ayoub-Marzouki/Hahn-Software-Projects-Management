package com.projects.manager.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projects.manager.models.Project;
import com.projects.manager.models.Task;
import com.projects.manager.services.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
public class ProjectRestController {
    private final ProjectService projectService;

    public ProjectRestController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable long id, @Valid @RequestBody Project project) {
        project.setId(id);
        return ResponseEntity.ok(projectService.updateProject(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project with ID " + id + " deleted successfully");
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<Map<String, Object>> getProjectProgress(@PathVariable long id) {
        Project project = projectService.getProjectById(id);
        
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

        return ResponseEntity.ok(progress);
    }
}