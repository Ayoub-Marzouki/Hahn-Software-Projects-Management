import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ProjectsManager
      </div>
      <ul className="navbar-links">
        <li>Dashboard</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
