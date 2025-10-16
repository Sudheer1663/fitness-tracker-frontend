import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userProfile"));

    if (savedTheme === "dark") setDarkMode(true);
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setUserName(userData?.name || "User");
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/home" className="logo">🏋️ Fitness Tracker</Link>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
        <NavLink to="/workout" className={({ isActive }) => isActive ? "active-link workout-link" : "workout-link"}>
          Workouts</NavLink>
        <NavLink to="/community" className={({ isActive }) => isActive ? "active-link" : ""}>Community</NavLink>
        <NavLink to="/challenges" className={({ isActive }) => isActive ? "active-link" : ""}>Challenges</NavLink>
          <NavLink to="/store" className={({ isActive }) => isActive ? "active-link" : ""}>Store</NavLink>
      </div>

    
      <div className="nav-right">
        {isLoggedIn ? (
          <div className="profile-menu">l
            <span className="user-name"><Link to="/profile" ><CgProfile size={35}/>{userName}</Link></span>
            <div className="dropdown">
              <button onClick={() => navigate("/profile")}>View Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="btn-navbar">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>SignUp</button>
          </div>
        )}

        <button
          className="navbar-theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
