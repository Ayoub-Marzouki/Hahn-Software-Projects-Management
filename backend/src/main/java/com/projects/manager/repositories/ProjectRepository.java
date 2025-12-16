package com.projects.manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projects.manager.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
