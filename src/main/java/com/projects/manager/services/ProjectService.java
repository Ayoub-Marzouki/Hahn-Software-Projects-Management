package com.projects.manager.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projects.manager.exceptions.ResourceNotFoundException;
import com.projects.manager.models.Project;
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

    public void deleteProject(long id) {
        Project project = getProjectById(id); // Fail fast if not found
        projectRepository.delete(project);
    }
}
