package com.projects.manager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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
        return projectRepository.save(project);
    }

    public Optional<Project> getProjectById(long id) {
        return projectRepository.findById(id);
    }

    public void deleteProject(Project project) {
        projectRepository.delete(project);
    }
}
