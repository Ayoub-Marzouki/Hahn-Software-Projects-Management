import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../services/projectService';
import './Dashboard.css';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-container"><p>Loading projects...</p></div>;
  if (error) return <div className="dashboard-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Projects</h2>
        <button className="create-project-btn">+ Create Project</button>
      </div>
      
      {projects.length === 0 ? (
        <div className="no-projects">
          <p>No projects have been created yet. Create your first project!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
