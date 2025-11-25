import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
   return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">Quiz App</h1>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Take Quiz</Link>
            <Link to="/results" className="navbar-link">All Attempts</Link>
            <Link to="/add-quiz" className="navbar-link">Add Questions To Quiz</Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Navbar;