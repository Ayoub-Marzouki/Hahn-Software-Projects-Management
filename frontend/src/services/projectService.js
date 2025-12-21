const API_URL = "http://localhost:8080/api/projects";

const getHeaders = () => {
	const token = localStorage.getItem('token');
	return {
		"Content-Type": "application/json",
		"Authorization": token ? `Bearer ${token}` : ""
	};
};

export const getAllProjects = async () => {
	try {
		const response = await fetch(API_URL, {
			headers: getHeaders()
		});
		if (!response.ok) {
			throw new Error("Failed to fetch projects");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

export const getProjectById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			headers: getHeaders()
		});
		if (!response.ok) {
			throw new Error("Failed to fetch project details");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching project:", error);
		throw error;
	}
};

export const createProject = async (projectData) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(projectData)
		});
		
		if (!response.ok) {
			const errorData = await response.json();
			// Throw the whole object so the UI can use the specific field messages
			throw errorData;
		}
		return await response.json();
	} catch (error) {
		console.error("Error creating project:", error);
		throw error;
	}
};

export const deleteProject = async (id) => {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
			headers: getHeaders()
		});
		if (!response.ok) {
			throw new Error("Failed to delete project");
		}
		return true; 
	} catch (error) {
		console.error("Error deleting project:", error);
		throw error;
	}
};
