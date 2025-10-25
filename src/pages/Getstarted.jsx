// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../contexts/Authcontext"; // to get logged-in user
// import "./Getstarted.css";

// function Getstarted() {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext); // logged-in user
//   const [formData, setFormData] = useState({
//     age: "",
//     gender: "",
//     height: "",
//     weight: "",
//     goal: "",
//   });
//   const [loading, setLoading] = useState(true); // check if profile exists

//   // Check if profile exists on page load
//   useEffect(() => {
//     const checkProfile = async () => {
//       if (!user || !user.id) return;
//       try {
//         const res = await axios.get(`http://localhost:8080/api/profiles/${user.id}`);
//         if (res.data) {
//           // Profile exists → redirect to selected goal page
//           const goal = res.data.goal;
//           if (goal === "Lose Weight") navigate("/loseweight");
//           else if (goal === "Build Muscle") navigate("/build-muscle");
//           else if (goal === "Stay Fit") navigate("/stay-fit");
//           else navigate("/dashboard");
//         } else {
//           // No profile → show form
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Error checking profile:", err);
//         setLoading(false);
//       }
//     };

//     checkProfile();
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !user.id) {
//       alert("User not logged in!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/profiles/add/${user.id}`,
//         formData
//       );

//       alert("Profile Created Successfully!");

//       // Redirect based on selected goal
//       const goal = formData.goal;
//       if (goal === "Lose Weight") navigate("/loseweight");
//       else if (goal === "Build Muscle") navigate("/build-muscle");
//       else if (goal === "Stay Fit") navigate("/stay-fit");
//       else navigate("/dashboard");
//     } catch (err) {
//       console.error("Failed to create profile!", err);
//       alert(
//         err.response?.data || "Failed to create profile! Please try again."
//       );
//     }
//   };

//   if (loading) return <p>Loading...</p>; // show loading while checking

//   return (
//     <div className="get-started-container">
//       <h2>Get Started with Your Fitness Journey</h2>
//       <form onSubmit={handleSubmit} className="get-started-form">
//         <label>Age</label>
//         <input type="number" name="age" value={formData.age} onChange={handleChange} required />

//         <label>Gender</label>
//         <select name="gender" value={formData.gender} onChange={handleChange} required>
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Height (cm)</label>
//         <input type="number" name="height" value={formData.height} onChange={handleChange} required />

//         <label>Weight (kg)</label>
//         <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

//         <label>Fitness Goal</label>
//         <select name="goal" value={formData.goal} onChange={handleChange} required>
//           <option value="">Select Goal</option>
//           <option value="Lose Weight">Lose Weight</option>
//           <option value="Build Muscle">Build Muscle</option>
//           <option value="Stay Fit">Stay Fit</option>
//         </select>

//         <button type="submit">Save & Continue</button>
//       </form>
//     </div>
//   );
// }

// export default Getstarted;
















































// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Getstarted.css";

// function Getstarted() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     age: "",
//     gender: "",
//     height: "",
//     weight: "",
//     goal: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Optional: if you want to hide form if goal already selected
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userProfile"));
//     const goal = localStorage.getItem("userGoal");

//     if (user?.getstarted && goal) {
//       if (goal === "Lose Weight") navigate("/loseweight");
//       else if (goal === "Build Muscle") navigate("/build-muscle");
//       else if (goal === "Stay Fit") navigate("/stay-fit");
//     }
//   }, [navigate]);



//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("userProfile"));

//   // If user is NOT logged in, redirect to signup/login
//   if (!user) {
//     navigate("/signup"); // or "/login" depending on your route
//     return;
//   }

//   // If user already completed getstarted, go to goal page
//   const goal = localStorage.getItem("userGoal");
//   if (user.getstarted && goal) {
//     if (goal === "Lose Weight") navigate("/loseweight");
//     else if (goal === "Build Muscle") navigate("/build-muscle");
//     else if (goal === "Stay Fit") navigate("/stay-fit");
//   }
// }, [navigate]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1️⃣ Save profile
//       const res = await axios.post("http://localhost:8080/api/profiles/add", formData);

//       // 2️⃣ Update user's getstarted flag
//       const userId = JSON.parse(localStorage.getItem("userProfile"))?.id;
//       if (userId) {
//         await axios.put(`http://localhost:8080/user/${userId}/getstarted`);
//         // Update localStorage user
//         const updatedUser = { ...JSON.parse(localStorage.getItem("userProfile")), getstarted: true };
//         localStorage.setItem("userProfile", JSON.stringify(updatedUser));
//       }

//       // 3️⃣ Save goal in localStorage
//       localStorage.setItem("userGoal", formData.goal);

//       alert("Profile Created Successfully!");

//       // 4️⃣ Navigate to goal page
//       if (formData.goal === "Lose Weight") navigate("/loseweight");
//       else if (formData.goal === "Build Muscle") navigate("/build-muscle");
//       else if (formData.goal === "Stay Fit") navigate("/stay-fit");
//       else navigate("/dashboard");

//     } catch (err) {
//       console.error("Failed to create profile!", err);
//       alert("Failed to create profile! Please try again.");
//     }
//   };


//   if (loading) return <p>Saving your profile...</p>;

//   return (
//     <div className="get-started-container">
//       <h2>Get Started with Your Fitness Journey</h2>
//       <form onSubmit={handleSubmit} className="get-started-form">
//         <label>Age</label>
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={handleChange}
//           required
//         />

//         <label>Gender</label>
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Height (cm)</label>
//         <input
//           type="number"
//           name="height"
//           value={formData.height}
//           onChange={handleChange}
//           required
//         />

//         <label>Weight (kg)</label>
//         <input
//           type="number"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//           required
//         />

//         <label>Fitness Goal</label>
//         <select
//           name="goal"
//           value={formData.goal}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Goal</option>
//           <option value="Lose Weight">Lose Weight</option>
//           <option value="Build Muscle">Build Muscle</option>
//           <option value="Stay Fit">Stay Fit</option>
//         </select>

//         <button type="submit">Save & Continue</button>
//       </form>
//     </div>
//   );
// }

// export default Getstarted;







import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Getstarted.css";

function Getstarted() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
  });
  const [loading, setLoading] = useState(false);
  const [isChangingGoal, setIsChangingGoal] = useState(false);

  // Check if user is changing goal or starting fresh
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const existingGoal = localStorage.getItem("userGoal");

    // If user is NOT logged in, redirect to signup/login
    if (!user) {
      navigate("/signup");
      return;
    }

    // If user already has a goal and is coming to change it
    if (user.getstarted && existingGoal) {
      setIsChangingGoal(true);
      
      // Pre-fill form with existing data if available
      // You might want to fetch the existing profile data here
      const existingProfile = JSON.parse(localStorage.getItem("userProfileData"));
      if (existingProfile) {
        setFormData({
          age: existingProfile.age || "",
          gender: existingProfile.gender || "",
          height: existingProfile.height || "",
          weight: existingProfile.weight || "",
          goal: existingGoal || "",
        });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = JSON.parse(localStorage.getItem("userProfile"))?.id;
      
      if (isChangingGoal) {
        // 🔄 UPDATE EXISTING PROFILE - Change Goal
        await axios.put(`http://localhost:8080/api/profiles/user/${userId}`, {
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          goal: formData.goal
        });
        
        alert("Goal Updated Successfully!");
      } else {
        // 🆕 CREATE NEW PROFILE - First Time
        // 1️⃣ Save profile
        await axios.post("http://localhost:8080/api/profiles/add", {
          ...formData,
          userId: userId
        });

        // 2️⃣ Update user's getstarted flag
        await axios.put(`http://localhost:8080/user/${userId}/getstarted`);
        
        // Update localStorage user
        const updatedUser = { 
          ...JSON.parse(localStorage.getItem("userProfile")), 
          getstarted: true 
        };
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        
        alert("Profile Created Successfully!");
      }

      // 3️⃣ Save goal in localStorage
      localStorage.setItem("userGoal", formData.goal);

      // 4️⃣ Navigate to goal page
      navigateToGoalPage(formData.goal);

    } catch (err) {
      console.error("Failed to save profile!", err);
      alert("Failed to save profile! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToGoalPage = (goal) => {
    if (goal === "Lose Weight") navigate("/loseweight");
    else if (goal === "Build Muscle") navigate("/build-muscle");
    else if (goal === "Stay Fit") navigate("/stay-fit");
    else navigate("/dashboard");
  };

  const handleCancel = () => {
    // Go back to previous page or current goal page
    const currentGoal = localStorage.getItem("userGoal");
    if (currentGoal) {
      navigateToGoalPage(currentGoal);
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="get-started-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{isChangingGoal ? "Updating your goal..." : "Creating your profile..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="get-started-container">
      <h2>
        {isChangingGoal ? "🎯 Change Your Fitness Goal" : "Get Started with Your Fitness Journey"}
      </h2>
      
      {isChangingGoal && (
        <div className="info-banner">
          <p>You're updating your fitness goal. This will help us personalize your workout plans.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="get-started-form">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="10"
            max="100"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="100"
            max="250"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="30"
            max="300"
          />
        </div>

        <div className="form-group">
          <label>Fitness Goal</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
          >
            <option value="">Select Goal</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Stay Fit">Stay Fit</option>
          </select>
        </div>

        <div className="form-buttons">
          {isChangingGoal && (
            <button 
              type="button" 
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-submit">
            {isChangingGoal ? "Update Goal" : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Getstarted;