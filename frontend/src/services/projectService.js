// In production, use environment variables to avoid hardcoding localhost (for deployment).
const API_URL = "http://localhost:8080/api/projects";

export const getAllProjects = async () => {
	try {
		const response = await fetch(API_URL);
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
		const response = await fetch(`${API_URL}/${id}`);
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
			headers: {
				"Content-Type": "application/json"
			},
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
