import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setUserProfile(savedProfile);
      setFormData(savedProfile);
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setUserProfile(formData);
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    alert("👋 You have been logged out!");
    navigate("/login");
  };

  if (!userProfile) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No profile found. Please complete Get Started first.</h5>
      </div>
    );
  }

  return (
    <div className={`container mt-5 profile-container ${darkMode ? "dark" : "light"}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Fitness Profile</h2>
        <div className="d-flex gap-2">
          {/* <button
            className="btn btn-outline-secondary theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button> */}


          <button className="btn btn-outline-danger" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="card shadow profile-card p-4">
        {isEditing ? (
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  className="form-control"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  className="form-control"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Goal</label>
              <select
                name="goal"
                className="form-select"
                value={formData.goal}
                onChange={handleChange}
              >
                <option value="Lose Weight">Lose Weight</option>
                <option value="Build Muscle">Build Muscle</option>
                <option value="Stay Fit">Stay Fit</option>
              </select>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-success" onClick={handleSave}>
                💾 Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Age:</strong> {userProfile.age}</p>
            <p><strong>Gender:</strong> {userProfile.gender}</p>
            <p><strong>Height:</strong> {userProfile.height} cm</p>
            <p><strong>Weight:</strong> {userProfile.weight} kg</p>
            <p><strong>Goal:</strong> {userProfile.goal}</p>

            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
