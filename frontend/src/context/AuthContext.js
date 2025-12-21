import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem('token'));

	useEffect(() => {
		if (token) {
			const savedEmail = localStorage.getItem('userEmail');
			setUser({ email: savedEmail });
		}
	}, [token]);

	const loginUser = (newToken, email) => {
		localStorage.setItem('token', newToken);
		localStorage.setItem('userEmail', email);
		setToken(newToken);
		setUser({ email });
	};

	const logoutUser = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userEmail');
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
