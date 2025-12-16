package com.projects.manager.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Title cannot be null, nor entirely blank!")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Title cannot be null, nor entirely blank!")
    @Column(nullable = false)
    private String description;

    @NotBlank(message = "Title cannot be null, nor entirely blank!")
    @Column(nullable = false)
    private String dueDate;

    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    
}
