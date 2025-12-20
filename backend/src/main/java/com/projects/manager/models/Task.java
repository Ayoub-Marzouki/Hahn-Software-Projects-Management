package com.projects.manager.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Title cannot be null, nor entirely blank!")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description cannot be null, nor entirely blank!")
    @Column(nullable = false)
    private String description;

    @NotNull(message = "Due Date is required")
    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private Boolean isCompleted = false;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Allow input, prevent loop in output
    private Project project;
    
}
