import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  
  const [userProfile] = useState({
    name: "John Doe",
    age: 25,
    goal: "Lose 5kg",
    weight: 70,
    height: 175,
  });

  
  const [stats] = useState({
    steps: 8500,
    calories: 450,
    workoutsCompleted: 3,
  });

  
  const [recentWorkouts] = useState([
    { id: 1, type: "Running", duration: 30 },
    { id: 2, type: "Cycling", duration: 45 },
    { id: 3, type: "Yoga", duration: 60 },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>
    
      <button className="mode-btn" onClick={toggleDarkMode}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

  
      <div className="profile-card">
        <h2>Welcome, {userProfile.name}!</h2>
        <p>Age: {userProfile.age}</p>
        <p>Weight: {userProfile.weight} kg</p>
        <p>Height: {userProfile.height} cm</p>
        <p>Goal: {userProfile.goal}</p>
      </div>

      
      <div className="stats-section">
        <div className="stat-card">
          <h3>Steps</h3>
          <p>{stats.steps}</p>
        </div>
        <div className="stat-card">
          <h3>Calories</h3>
          <p>{stats.calories} kcal</p>
        </div>
        <div className="stat-card">
          <h3>Workouts Completed</h3>
          <p>{stats.workoutsCompleted}</p>
        </div>
      </div>

  
      <div className="goal-section">
        <h3>Goal Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "60%" }}></div>
        </div>
        <p>60% toward your goal</p>
      </div>

      <div className="recent-workouts">
        <h3>Recent Workouts</h3>
        <ul>
          {recentWorkouts.map((w) => (
            <li key={w.id}>
              {w.type} - {w.duration} min
            </li>
          ))}
        </ul>
      </div>

  
      <div className="quick-links">
        <button onClick={() => alert("Go to Workouts clicked!")}>Workouts</button>
        <button onClick={() => alert("Go to Get Started clicked!")}>Get Started</button>
      </div>
    </div>
  );
}

export default Dashboard;
