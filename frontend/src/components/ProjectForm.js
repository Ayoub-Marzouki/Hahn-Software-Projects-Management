import React, { useState } from 'react';
import './ProjectForm.css';

function ProjectForm({ onSave, onCancel, errors = {} }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		
		onSave({ title, description });
	};

	return (
		<div className="form-overlay">
			<form className="project-form" onSubmit={handleSubmit}>
				<h3>Create New Project</h3>
				<div className="form-group">
					<label>Project Title *</label>
					<input 
						type="text" 
						value={title} 
						onChange={(e) => setTitle(e.target.value)} 
						placeholder="Enter project title"
						required 
						className={errors.title ? 'error-input' : ''}
					/>
					{errors.title && <span className="error-text">{errors.title}</span>}
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea 
						value={description} 
						onChange={(e) => setDescription(e.target.value)} 
						placeholder="Describe your project (optional)"
						rows="4"
						className={errors.description ? 'error-input' : ''}
					/>
					{errors.description && <span className="error-text">{errors.description}</span>}
				</div>
				<div className="form-actions">
					<button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
					<button type="submit" className="save-btn">Create Project</button>
				</div>
			</form>
		</div>
	);
}

export default ProjectForm;
