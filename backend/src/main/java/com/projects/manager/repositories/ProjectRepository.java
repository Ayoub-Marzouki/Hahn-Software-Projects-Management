package com.projects.manager.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projects.manager.models.Project;
import com.projects.manager.models.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}
