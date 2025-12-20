import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

function ProjectCard({ project, onDelete }) {
  const { id, title, description, tasks } = project;
  
  // Calculate progress locally for display
  const totalTasks = tasks ? tasks.length : 0;
  const completedTasks = tasks ? tasks.filter(t => t.isCompleted).length : 0;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="project-card">
      <div className="card-header">
        <h3 className="project-title">{title}</h3>
        <div className="header-actions">
          <span className="project-percentage-chip">{percentage}%</span>
          <button 
            className="delete-btn" 
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(id);
            }}
            title="Delete Project"
          >
            &times;
          </button>
        </div>
      </div>
      <p className="project-desc">{description || "No description provided."}</p>
      
      <div className="project-progress">
        <span className="task-count">
          {totalTasks > 0 ? (
            `${completedTasks}/${totalTasks} tasks completed`
          ) : (
            "No tasks yet"
          )}
        </span>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <Link to={`/project/${id}`} className="view-details-btn">View Details</Link>
    </div>
  );
}

export default ProjectCard;
