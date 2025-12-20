import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import { createTask, deleteTask, updateTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import ConfirmationModal from '../components/ConfirmationModal';
import './ProjectDetails.css';

function ProjectDetails() {
	const { id } = useParams();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	const [showTaskForm, setShowTaskForm] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState(null);

	const loadProject = async () => {
		try {
			const data = await getProjectById(id);
			setProject(data);
		} catch (err) {
			setError("Failed to load project details.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProject();
	}, [id]);

	const handleAddTask = async (taskData) => {
		try {
			// Backend expects project object to link the task
			const payload = {
				...taskData,
				project: { id: parseInt(id) }
			};
			await createTask(payload);
			setShowTaskForm(false);
			loadProject(); // Refresh to see new task
		} catch (err) {
			alert("Failed to create task.");
		}
	};

	const handleToggleTask = async (task) => {
		try {
			const updatedTask = {
				...task,
				isCompleted: !task.isCompleted
			};
			// We use updateTask which maps to PUT /api/tasks/{id}
			await updateTask(task.id, updatedTask);
			loadProject();
		} catch (err) {
			alert("Failed to update task status.");
		}
	};

	const handleDeleteTask = async () => {
		if (!taskToDelete) return;
		try {
			await deleteTask(taskToDelete);
			setTaskToDelete(null);
			loadProject();
		} catch (err) {
			alert("Failed to delete task.");
		}
	};

	if (loading) return <div className="details-container"><p>Loading...</p></div>;
	if (error) return <div className="details-container"><p className="error">{error}</p></div>;
	if (!project) return <div className="details-container"><p>Project not found.</p></div>;

	return (
		<div className="details-container">
			<Link to="/" className="back-link">&larr; Back to Dashboard</Link>
			
			<div className="details-header">
				<h1>{project.title}</h1>
				<p>{project.description || "No description provided."}</p>
			</div>

			<div className="tasks-section">
				<div className="tasks-header">
					<h2>Tasks</h2>
					<button 
						className="add-task-btn"
						onClick={() => setShowTaskForm(true)}
					>
						+ Add Task
					</button>
				</div>

				<ul className="tasks-list">
					{project.tasks && project.tasks.length > 0 ? (
						project.tasks.map(task => {
							const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
							return (
								<li key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
									<div className="task-info-wrapper">
										<input 
											type="checkbox" 
											className="task-checkbox"
											checked={task.isCompleted}
											onChange={() => handleToggleTask(task)}
										/>
										<div className="task-info">
											<span className="task-title">{task.title}</span>
											<span className="task-due">
												Due: {task.dueDate}
												{isOverdue && <span className="overdue-tag"> (Overdue)</span>}
											</span>
										</div>
									</div>
									<div className="task-actions">
										<button 
											className="delete-task-btn"
											onClick={() => setTaskToDelete(task.id)}
										>
											&times;
										</button>
									</div>
								</li>
							);
						})
					) : (
						<li className="no-tasks">No tasks found. Add your first task!</li>
					)}
				</ul>
			</div>

			{/* Task Form Modal */}
			{showTaskForm && (
				<TaskForm 
					onSave={handleAddTask} 
					onCancel={() => setShowTaskForm(false)} 
				/>
			)}

			{/* Delete Confirmation Modal */}
			{taskToDelete && (
				<ConfirmationModal 
					message="Are you sure you want to delete this task?"
					onConfirm={handleDeleteTask}
					onCancel={() => setTaskToDelete(null)}
				/>
			)}
		</div>
	);
}

export default ProjectDetails;
