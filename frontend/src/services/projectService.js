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
