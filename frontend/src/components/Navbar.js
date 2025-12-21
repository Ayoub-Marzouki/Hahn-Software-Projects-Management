import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './Navbar.css';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogout = () => {
    logoutUser();
    showNotification("Logged out successfully.", "info");
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ProjectsManager
      </div>
      {user && (
        <ul className="navbar-links">
          <li><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Dashboard</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
