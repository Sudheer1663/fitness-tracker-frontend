// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Profile.css";
// import { AuthContext } from "../contexts/Authcontext";

// const API_BASE_URL = "http://localhost:8080/api/profiles";

// function Profile() {
//   const { user, logout } = useContext(AuthContext);
//   const [profileData, setProfileData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Initialize with user data
//   useEffect(() => {
//     if (user) {
//       // Set basic user info immediately
//       setProfileData({
//         userId: user.id,
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         age: null,
//         gender: null,
//         height: null,
//         weight: null,
//         goal: null,
//         profileId: null
//       });
//       // Then try to load fitness profile
//       fetchProfile();
//     }
//   }, [user]);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       console.log("Fetching profile for user:", user.id);
      
//       const response = await fetch(`${API_BASE_URL}/user/${user.id}`);
//       console.log("Response status:", response.status);
      
//       // Check if response is OK and has content
//       if (response.status === 204 || response.headers.get('content-length') === '0') {
//         // No content - this is fine, just means no profile exists
//         console.log("No profile exists yet");
//         return;
//       }
      
//       if (!response.ok) {
//         // Handle 404 and other errors gracefully
//         if (response.status === 404) {
//           console.log("Profile not found - this is normal for new users");
//           return;
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const responseText = await response.text();
//       console.log("Raw response:", responseText);
      
//       if (responseText) {
//         const data = JSON.parse(responseText);
//         console.log("Parsed profile data:", data);
        
//         // Update profile data with fitness information
//         setProfileData(prev => ({
//           ...prev,
//           ...data
//         }));
//       }
      
//     } catch (error) {
//       console.error("Fetch profile error:", error);
//       // Don't show error for empty responses or 404 - it's normal
//       if (!error.message.includes('JSON') && !error.message.includes('404')) {
//         setError("Error loading fitness profile: " + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prevData => ({
//       ...prevData,
//       [name]: name === 'age' || name === 'height' || name === 'weight' 
//         ? (value === "" ? null : parseFloat(value))
//         : value
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // Prepare profile data for backend (only fitness fields)
//       const profileToSave = {
//         age: profileData.age,
//         gender: profileData.gender,
//         height: profileData.height,
//         weight: profileData.weight,
//         goal: profileData.goal
//       };

//       console.log("Saving profile:", profileToSave);

//       const response = await fetch(`${API_BASE_URL}/user/${user.id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profileToSave),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const savedData = await response.json();
//       console.log("Profile saved successfully:", savedData);
      
//       setProfileData(prev => ({
//         ...prev,
//         ...savedData
//       }));
      
//       setIsEditing(false);
//       alert("✅ Profile updated successfully!");
      
//     } catch (error) {
//       console.error("Save profile error:", error);
//       setError("Error saving profile: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProfile = async () => {
//     if (window.confirm("Are you sure you want to delete your fitness profile? Your user account will remain.")) {
//       try {
//         if (profileData.profileId) {
//           const response = await fetch(`${API_BASE_URL}/delete/${profileData.profileId}`, {
//             method: 'DELETE',
//           });
          
//           if (response.ok) {
//             alert("Fitness profile deleted successfully!");
//             // Reset profile data but keep user info
//             setProfileData(prev => ({
//               ...prev,
//               age: null,
//               gender: null,
//               height: null,
//               weight: null,
//               goal: null,
//               profileId: null
//             }));
//           } else {
//             setError("Failed to delete profile");
//           }
//         }
//       } catch (error) {
//         setError("Error deleting profile: " + error.message);
//       }
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (!user) {
//     return (
//       <div className="text-center mt-5 text-muted">
//         <h5>No user found. Please log in first.</h5>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5 profile-container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Welcome, {profileData.name || user.name} 👋</h2>
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>

//       {error && (
//         <div className="alert alert-warning" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="card shadow profile-card p-4">
//         {/* User Information - Always Visible */}
//         <div className="user-info-section mb-4 p-3 bg-light rounded">
//           <h5 className="mb-3">👤 User Information</h5>
//           <div className="row">
//             <div className="col-md-4">
//               <p><strong>Name:</strong> {profileData.name || "Not available"}</p>
//             </div>
//             <div className="col-md-4">
//               <p><strong>Email:</strong> {profileData.email || "Not available"}</p>
//             </div>
//             <div className="col-md-4">
//               <p><strong>Phone:</strong> {profileData.phone || "Not provided"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Fitness Profile Section */}
//         <h5 className="mb-3">💪 Fitness Profile</h5>
        
//         {loading ? (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2 text-muted">Loading profile...</p>
//           </div>
//         ) : isEditing ? (
//           <>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   className="form-control"
//                   value={profileData.age || ""}
//                   onChange={handleChange}
//                   min="1"
//                   max="120"
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Gender</label>
//                 <select
//                   name="gender"
//                   className="form-control"
//                   value={profileData.gender || ""}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="MALE">Male</option>
//                   <option value="FEMALE">Female</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Height (cm)</label>
//                 <input
//                   type="number"
//                   name="height"
//                   className="form-control"
//                   value={profileData.height || ""}
//                   onChange={handleChange}
//                   step="0.1"
//                   min="0"
//                   placeholder="e.g., 175.5"
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Weight (kg)</label>
//                 <input
//                   type="number"
//                   name="weight"
//                   className="form-control"
//                   value={profileData.weight || ""}
//                   onChange={handleChange}
//                   step="0.1"
//                   min="0"
//                   placeholder="e.g., 70.5"
//                 />
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Fitness Goal</label>
//               <select
//                 name="goal"
//                 className="form-control"
//                 value={profileData.goal || ""}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Goal</option>
//                 <option value="WEIGHT_LOSS">Weight Loss</option>
//                 <option value="MUSCLE_GAIN">Muscle Gain</option>
//                 <option value="MAINTENANCE">Maintenance</option>
//                 <option value="ENDURANCE">Endurance</option>
//                 <option value="FLEXIBILITY">Flexibility</option>
//               </select>
//             </div>

//             <div className="d-flex justify-content-between mt-4">
//               <button 
//                 className="btn btn-success" 
//                 onClick={handleSave}
//                 disabled={loading}
//               >
//                 {loading ? "⏳ Saving..." : "💾 Save Profile"}
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   setIsEditing(false);
//                   fetchProfile();
//                 }}
//                 disabled={loading}
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="row">
//               <div className="col-md-6">
//                 <p><strong>Age:</strong> {profileData.age || "Not provided"}</p>
//                 <p><strong>Gender:</strong> {profileData.gender || "Not provided"}</p>
//               </div>
//               <div className="col-md-6">
//                 <p><strong>Height:</strong> {profileData.height ? `${profileData.height} cm` : "Not provided"}</p>
//                 <p><strong>Weight:</strong> {profileData.weight ? `${profileData.weight} kg` : "Not provided"}</p>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-12">
//                 <p><strong>Goal:</strong> {profileData.goal ? profileData.goal.replace(/_/g, ' ') : "Not provided"}</p>
//               </div>
//             </div>

//             <div className="text-center mt-4">
//               <button
//                 className="btn btn-primary me-2"
//                 onClick={() => setIsEditing(true)}
//               >
//                 {profileData.profileId ? "✏️ Edit Profile" : "➕ Create Fitness Profile"}
//               </button>
//               {profileData.profileId && (
//                 <button
//                   className="btn btn-outline-danger"
//                   onClick={handleDeleteProfile}
//                 >
//                   🗑️ Delete Fitness Profile
//                 </button>
//               )}
//             </div>
            
//             {/* Help text for new users */}
//             {!profileData.profileId && (
//               <div className="alert alert-info mt-3">
//                 <small>
//                   💡 <strong>No fitness profile yet!</strong> Click "Create Fitness Profile" to add your fitness information.
//                 </small>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;




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











import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import { AuthContext } from "../contexts/Authcontext";

const API_BASE_URL = "http://localhost:8080/api/profiles";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialize with user data
  useEffect(() => {
    if (user) {
      // Set basic user info immediately
      setProfileData({
        userId: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: null,
        gender: null,
        height: null,
        weight: null,
        goal: null,
        profileId: null
      });
      // Then try to load fitness profile
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`${API_BASE_URL}/user/${user.id}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Profile data loaded:", data);
        
        // Update profile data with fitness information
        setProfileData(prev => ({
          ...prev,
          ...data
        }));
      } else if (response.status === 404) {
        console.log("No profile exists yet - this is normal");
        // Keep the existing user data, no error needed
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      console.error("Fetch profile error:", error);
      // Don't show error for network issues - user can still create profile
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? (value === "" ? null : parseFloat(value))
        : value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      // Prepare profile data for backend
      const profileToSave = {
        age: profileData.age,
        gender: profileData.gender,
        height: profileData.height,
        weight: profileData.weight,
        goal: profileData.goal
      };

      console.log("Saving profile data:", profileToSave);

      let response;
      
      if (profileData.profileId) {
        // Update existing profile using PUT
        response = await fetch(`${API_BASE_URL}/update/${profileData.profileId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileToSave),
        });
      } else {
        // Create new profile using POST to /add with userId included
        const newProfile = {
          ...profileToSave,
          userId: user.id,
          name: user.name // Include name if your Profile entity has it
        };
        
        response = await fetch(`${API_BASE_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProfile),
        });
      }

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const savedData = await response.json();
      console.log("Profile saved successfully:", savedData);
      
      // Update local state
      setProfileData(prev => ({
        ...prev,
        ...savedData,
        profileId: savedData.id || savedData.profileId
      }));
      
      setIsEditing(false);
      alert("✅ Profile saved successfully!");
      
    } catch (error) {
      console.error("Save error:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your fitness profile? Your user account will remain.")) {
      try {
        if (profileData.profileId) {
          const response = await fetch(`${API_BASE_URL}/delete/${profileData.profileId}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            alert("Fitness profile deleted successfully!");
            // Reset profile data but keep user info
            setProfileData(prev => ({
              ...prev,
              age: null,
              gender: null,
              height: null,
              weight: null,
              goal: null,
              profileId: null
            }));
          } else {
            setError("Failed to delete profile");
          }
        }
      } catch (error) {
        setError("Error deleting profile: " + error.message);
      }
    }
  };

  // Add this function to calculate BMI
const calculateBMI = () => {
  if (profileData.height && profileData.weight) {
    const heightInMeters = profileData.height / 100;
    const bmi = (profileData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  }
  return null;
};

// Display BMI in the profile
{profileData.height && profileData.weight && (
  <p><strong>BMI:</strong> {calculateBMI()} </p>
)}

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No user found. Please log in first.</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5 profile-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {profileData.name || user.name} 👋</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow profile-card p-4">
        {/* User Information - Always Visible */}
        <div className="user-info-section mb-4 p-3 bg-light rounded">
          <h5 className="mb-3">👤 User Information</h5>
          <div className="row">
            <div className="col-md-4">
              <p><strong>Name:</strong> {profileData.name || "Not available"}</p>
            </div>
            <div className="col-md-4">
              <p><strong>Email:</strong> {profileData.email || "Not available"}</p>
            </div>
            <div className="col-md-4">
              <p><strong>Phone:</strong> {profileData.phone || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Fitness Profile Section */}
        <h5 className="mb-3">💪 Fitness Profile</h5>
        
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        ) : isEditing ? (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={profileData.age || ""}
                  onChange={handleChange}
                  min="1"
                  max="120"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-control"
                  value={profileData.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
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
                  value={profileData.height || ""}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  placeholder="e.g., 175.5"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  className="form-control"
                  value={profileData.weight || ""}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  placeholder="e.g., 70.5"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Fitness Goal</label>
              <select
                name="goal"
                className="form-control"
                value={profileData.goal || ""}
                onChange={handleChange}
              >
                <option value="">Select Goal</option>
                <option value="WEIGHT_LOSS">Weight Loss</option>
                <option value="MUSCLE_GAIN">Muscle Gain</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="ENDURANCE">Endurance</option>
                <option value="FLEXIBILITY">Flexibility</option>
              </select>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button 
                className="btn btn-success" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "⏳ Saving..." : "💾 Save Profile"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                disabled={loading}
              >
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Age:</strong> {profileData.age || "Not provided"}</p>
                <p><strong>Gender:</strong> {profileData.gender || "Not provided"}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Height:</strong> {profileData.height ? `${profileData.height} cm` : "Not provided"}</p>
                <p><strong>Weight:</strong> {profileData.weight ? `${profileData.weight} kg` : "Not provided"}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p><strong>Goal:</strong> {profileData.goal ? profileData.goal.replace(/_/g, ' ') : "Not provided"}</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-primary me-2"
                onClick={() => setIsEditing(true)}
              >
                {profileData.profileId ? "✏️ Edit Profile" : "➕ Create Fitness Profile"}
              </button>
              {profileData.profileId && (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleDeleteProfile}
                >
                  🗑️ Delete Fitness Profile
                </button>
              )}
            </div>
            
            {/* Help text for new users */}
            {!profileData.profileId && (
              <div className="alert alert-info mt-3">
                <small>
                  💡 <strong>No fitness profile yet!</strong> Click "Create Fitness Profile" to add your fitness information.
                </small>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;