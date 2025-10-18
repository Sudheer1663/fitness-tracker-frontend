
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




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Profile.css";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});

//   // Fetch profile from backend on load
//   useEffect(() => {
//     axios.get("http://localhost:8080/api/profiles/1") // change 1 to logged-in user id
//       .then((res) => {
//         setProfile(res.data);
//         setFormData(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     axios.put(`http://localhost:8080/api/profiles/update/${profile.id}`, formData)
//       .then((res) => {
//         setProfile(res.data);
//         setIsEditing(false);
//         alert("✅ Profile updated successfully!");
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("❌ Failed to update profile");
//       });
//   };

//   if (!profile) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="container mt-5 profile-container">
//       <h2 className="mb-4">Profile</h2>

//       <div className="card shadow profile-card p-4">
//         {isEditing ? (
//           <>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.name || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 className="form-control"
//                 value={formData.age || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Gender</label>
//               <select
//                 name="gender"
//                 className="form-select"
//                 value={formData.gender || ""}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Height (cm)</label>
//               <input
//                 type="number"
//                 name="height"
//                 className="form-control"
//                 value={formData.height || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Weight (kg)</label>
//               <input
//                 type="number"
//                 name="weight"
//                 className="form-control"
//                 value={formData.weight || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Goal</label>
//               <input
//                 type="text"
//                 name="goal"
//                 className="form-control"
//                 value={formData.goal || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="d-flex justify-content-between mt-3">
//               <button className="btn btn-success" onClick={handleSave}>
//                 💾 Save
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setFormData(profile);
//                 }}
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <p><strong>Name:</strong> {profile.name}</p>
//             <p><strong>Age:</strong> {profile.age}</p>
//             <p><strong>Gender:</strong> {profile.gender}</p>
//             <p><strong>Height:</strong> {profile.height} cm</p>
//             <p><strong>Weight:</strong> {profile.weight} kg</p>
//             <p><strong>Goal:</strong> {profile.goal}</p>

//             <div className="mt-3">
//               <button
//                 className="btn btn-primary me-2"
//                 onClick={() => setIsEditing(true)}
//               >
//                 ✏️ Edit Profile
//               </button>

//               <button
//                 className="btn btn-warning"
//                 onClick={() => {
//                   const newGoal = prompt("Enter new goal:", profile.goal || "");
//                   if (newGoal !== null) {
//                     const updated = { ...profile, goal: newGoal };
//                     axios.put(`http://localhost:8080/api/profiles/update/${profile.id}`, updated)
//                       .then((res) => setProfile(res.data))
//                       .catch(err => console.error(err));
//                   }
//                 }}
//               >
//                 🎯 Change Goal
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;


