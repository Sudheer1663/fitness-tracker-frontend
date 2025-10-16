
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import { AuthContext } from "../contexts/Authcontext";

function Profile() {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData); 
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No profile found. Please log in first.</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5 profile-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user.name || "User"} 👋</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          🚪 Logout
        </button>
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
                value={formData.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-success" onClick={handleSave}>
                💾 Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user); 
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email || "Not provided"}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || "Not provided"}
            </p>

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




