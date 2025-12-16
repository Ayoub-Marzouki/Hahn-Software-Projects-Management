package com.projects.manager.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projects.manager.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    public List<Task> findByProjectId(long id);
}
