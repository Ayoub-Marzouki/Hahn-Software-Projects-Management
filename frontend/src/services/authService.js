const API_URL = "http://localhost:8080/api/auth";

export const login = async (email, password) => {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});
		if (!response.ok) throw await response.json();
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const register = async (email, password) => {
	try {
		const response = await fetch(`${API_URL}/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});
		if (!response.ok) throw await response.json();
		return await response.json();
	} catch (error) {
		throw error;
	}
};
