import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import { useNotification } from '../context/NotificationContext';
import './Auth.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loginUser } = useAuth();
	const navigate = useNavigate();
	const { showNotification } = useNotification();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await login(email, password);
			loginUser(data.token, data.email);
			showNotification("Login successful!", "success");
			navigate('/');
		} catch (err) {
			showNotification(err.error || "Login failed", "error");
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Login</h2>
				
				<div className="form-group">
					<label>Email</label>
					<input 
						type="email" 
						value={email} 
						onChange={(e) => setEmail(e.target.value)} 
						required 
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input 
						type="password" 
						value={password} 
						onChange={(e) => setPassword(e.target.value)} 
						required 
					/>
				</div>
				<button type="submit" className="auth-btn">Login</button>
				<p className="auth-link">
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
