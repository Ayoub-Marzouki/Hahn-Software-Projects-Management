package com.projects.manager.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.projects.manager.exceptions.ResourceNotFoundException;
import com.projects.manager.models.Project;
import com.projects.manager.models.Task;
import com.projects.manager.repositories.ProjectRepository;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProjectProgress_ShouldReturnCorrectMetrics() {
        // Arrange
        long projectId = 1L;
        Project project = new Project();
        project.setId(projectId);
        project.setTitle("Test Project");

        Task t1 = new Task(); t1.setCompleted(true);
        Task t2 = new Task(); t2.setCompleted(false);
        project.setTasks(Arrays.asList(t1, t2));

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        // Act
        Map<String, Object> progress = projectService.getProjectProgress(projectId);

        // Assert
        assertEquals(2, progress.get("totalTasks"));
        assertEquals(1, progress.get("completedTasks"));
        assertEquals(50.0, progress.get("progressPercentage"));
        verify(projectRepository).findById(projectId);
    }

    @Test
    void getProjectProgress_NoTasks_ShouldReturnZero() {
        // Arrange
        long projectId = 2L;
        Project project = new Project();
        project.setId(projectId);
        project.setTasks(Collections.emptyList());

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        // Act
        Map<String, Object> progress = projectService.getProjectProgress(projectId);

        // Assert
        assertEquals(0, progress.get("totalTasks"));
        assertEquals(0.0, progress.get("progressPercentage"));
    }

    @Test
    void getProjectById_NotFound_ShouldThrowException() {
        // Arrange
        long projectId = 99L;
        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> projectService.getProjectById(projectId));
    }
}
