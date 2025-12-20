import React, { useState } from 'react';
import '../components/ProjectForm.css'; // Reuse existing styles

function TaskForm({ onSave, onCancel }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim() || !dueDate) return;
		
		onSave({ title, description, dueDate });
	};

	return (
		<div className="form-overlay">
			<form className="project-form" onSubmit={handleSubmit}>
				<h3>Add New Task</h3>
				<div className="form-group">
					<label>Task Title *</label>
					<input 
						type="text" 
						value={title} 
						onChange={(e) => setTitle(e.target.value)} 
						placeholder="Enter task title"
						required 
					/>
				</div>
				<div className="form-group">
					<label>Description *</label>
					<textarea 
						value={description} 
						onChange={(e) => setDescription(e.target.value)} 
						placeholder="Task details"
						rows="3"
						required
					/>
				</div>
				<div className="form-group">
					<label>Due Date *</label>
					<input 
						type="date" 
						value={dueDate} 
						onChange={(e) => setDueDate(e.target.value)} 
						required 
					/>
				</div>
				<div className="form-actions">
					<button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
					<button type="submit" className="save-btn">Add Task</button>
				</div>
			</form>
		</div>
	);
}

export default TaskForm;
