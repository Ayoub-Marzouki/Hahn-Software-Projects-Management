const API_URL = "http://localhost:8080/api/tasks";

const getHeaders = () => {
	const token = localStorage.getItem('token');
	return {
		"Content-Type": "application/json",
		"Authorization": token ? `Bearer ${token}` : ""
	};
};

export const createTask = async (taskData) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(taskData)
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw errorData;
		}
		return await response.json();
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};

export const updateTask = async (id, taskData) => {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "PUT",
			headers: getHeaders(),
			body: JSON.stringify(taskData)
		});
		if (!response.ok) {
			throw new Error("Failed to update task");
		}
		return await response.json();
	} catch (error) {
		console.error("Error updating task:", error);
		throw error;
	}
};

export const completeTask = async (id) => {
	try {
		const response = await fetch(`${API_URL}/${id}/complete`, {
			method: "PATCH",
			headers: getHeaders()
		});
		if (!response.ok) {
			throw new Error("Failed to mark task as completed");
		}
		return await response.json();
	} catch (error) {
		console.error("Error completing task:", error);
		throw error;
	}
};

export const deleteTask = async (id) => {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		});
		if (!response.ok) {
			throw new Error("Failed to delete task");
		}
		return true;
	} catch (error) {
		console.error("Error deleting task:", error);
		throw error;
	}
};
