import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import { useNotification } from '../context/NotificationContext';
import './Auth.css';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { showNotification } = useNotification();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await register(email, password);
			showNotification("Registration successful! Please login.", "success");
			navigate('/login');
		} catch (err) {
			const msg = err.email || err.message || "Registration failed";
			showNotification(msg, "error");
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Register</h2>
				
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
				<button type="submit" className="auth-btn">Register</button>
				<p className="auth-link">
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;
