import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Getstarted.css"; 

function Getstarted() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(formData));
    alert("Profile Created Successfully!");

    if (formData.goal === "Lose Weight") {
      navigate("/loseweight"); 
    } else if (formData.goal === "Build Muscle") {
      navigate("/build-muscle"); 
    } else if (formData.goal === "Stay Fit") {
      navigate("/stay-fit"); 
    } else {
      navigate("/dashboard"); 
    }
  };

  return (
    <div className="get-started-container">
      <h2>Get Started with Your Fitness Journey</h2>
      <form onSubmit={handleSubmit} className="get-started-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Height (cm)</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label>Fitness Goal</label>
        <select name="goal" value={formData.goal} onChange={handleChange} required>
          <option value="">Select Goal</option>
          <option value="Lose Weight">Lose Weight</option>
          <option value="Build Muscle">Build Muscle</option>
          <option value="Stay Fit">Stay Fit</option>
        </select>

        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
}

export default Getstarted;
