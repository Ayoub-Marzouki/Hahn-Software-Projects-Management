import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { getAllProjects, createProject, deleteProject } from '../services/projectService';
import './Dashboard.css';

function Dashboard() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	
	// Custom Modal State instead of window.confirm (better UX/Anti-blocker (ads blockers))
	const [projectToDelete, setProjectToDelete] = useState(null);

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

	const handleCreateProject = async (projectData) => {
		try {
			setFormErrors({}); // Clear previous errors
			await createProject(projectData);
			setShowForm(false);
			loadProjects();
		} catch (err) {
			// err is now the JSON object from backend (or a generic error)
			if (err.title || err.description) {
				setFormErrors(err);
			} else {
				alert("Error creating project. Please try again.");
			}
		}
	};

	const handleDeleteClick = (id) => {
		setProjectToDelete(id);
	};

	const confirmDelete = async () => {
		if (!projectToDelete) return;
		try {
			await deleteProject(projectToDelete);
			setProjectToDelete(null);
			loadProjects();
		} catch (err) {
			alert("Failed to delete project.");
		}
	};

	if (loading) return <div className="dashboard-container"><p>Loading projects...</p></div>;
	if (error) return <div className="dashboard-container"><p className="error-message">{error}</p></div>;

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h2>My Projects</h2>
				<button 
					className="create-project-btn" 
					onClick={() => {
						setShowForm(true);
						setFormErrors({});
					}}
				>
					+ Create Project
				</button>
			</div>
			
			{/* Create Project Modal */}
			{showForm && (
				<ProjectForm 
					onSave={handleCreateProject} 
					onCancel={() => setShowForm(false)} 
					errors={formErrors}
				/>
			)}

			{projectToDelete && (
				<ConfirmationModal 
					message="Are you sure you want to delete this project? This action cannot be undone."
					onConfirm={confirmDelete}
					onCancel={() => setProjectToDelete(null)}
				/>
			)}

			{projects.length === 0 ? (
				<div className="no-projects">
					<p>No projects have been created yet. Create your first project!</p>
				</div>
			) : (
				<div className="projects-grid">
					{projects.map(project => (
						<ProjectCard 
							key={project.id} 
							project={project} 
							onDelete={handleDeleteClick}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default Dashboard;
