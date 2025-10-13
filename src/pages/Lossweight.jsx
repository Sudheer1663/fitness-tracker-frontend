import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loseweight.css";

const exerciseImages = {
  "Jumping Jacks": "https://img.icons8.com/color/96/000000/jumping-jacks.png",
  "Burpees": "https://img.icons8.com/color/96/000000/burpee.png",
  "Mountain Climbers": "https://img.icons8.com/color/96/000000/mountain-climber.png",
  "High Knees": "https://img.icons8.com/color/96/000000/high-knee.png",
  "Squat Jumps": "https://img.icons8.com/color/96/000000/squat.png",
  "Lunges": "https://img.icons8.com/color/96/000000/lunge.png",
  "Plank": "https://img.icons8.com/color/96/000000/plank.png",
  "Jump Rope": "https://img.icons8.com/color/96/000000/jump-rope.png",
  "Bicycle Crunches": "https://img.icons8.com/color/96/000000/bicycle-crunch.png",
  "Side Lunges": "https://img.icons8.com/color/96/000000/side-lunge.png",
  "Butt Kicks": "https://img.icons8.com/color/96/000000/butt-kick.png",
  "Step-Ups": "https://img.icons8.com/color/96/000000/step-up.png",
};

function Loseweight() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const exercises = [
    { id: 1, name: "Jumping Jacks", duration: "10 min", cost: "$5", difficulty: "Beginner" },
    { id: 2, name: "Burpees", duration: "15 min", cost: "$7", difficulty: "Advanced" },
    { id: 3, name: "Mountain Climbers", duration: "12 min", cost: "$6", difficulty: "Intermediate" },
    { id: 4, name: "High Knees", duration: "8 min", cost: "$4", difficulty: "Beginner" },
    { id: 5, name: "Squat Jumps", duration: "10 min", cost: "$5", difficulty: "Intermediate" },
    { id: 6, name: "Lunges", duration: "15 min", cost: "$6", difficulty: "Intermediate" },
    { id: 7, name: "Plank", duration: "5 min", cost: "$4", difficulty: "Beginner" },
    { id: 8, name: "Jump Rope", duration: "10 min", cost: "$5", difficulty: "Intermediate" },
    { id: 9, name: "Bicycle Crunches", duration: "12 min", cost: "$6", difficulty: "Advanced" },
    { id: 10, name: "Side Lunges", duration: "10 min", cost: "$5", difficulty: "Intermediate" },
    { id: 11, name: "Butt Kicks", duration: "8 min", cost: "$4", difficulty: "Beginner" },
    { id: 12, name: "Step-Ups", duration: "12 min", cost: "$6", difficulty: "Intermediate" },
  ];

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredExercises = exercises
    .filter((ex) => selectedDifficulty === "All" || ex.difficulty === selectedDifficulty)
    .filter((ex) => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`container my-5 loseweight-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lose Weight Exercises</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      
      <div className="mb-3">
        <label className="form-label me-3 fw-bold">Filter by Difficulty:</label>
        {difficulties.map((level) => (
          <button
            key={level}
            className={`btn btn-sm me-2 mb-2 ${
              selectedDifficulty === level
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setSelectedDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>

      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredExercises.map((ex) => (
          <div key={ex.id} className="col-sm-6 col-lg-4 mb-4">
            <div className="card exercise-card h-100 text-center shadow-sm p-3">
              <img
                src={exerciseImages[ex.name]}
                alt={ex.name}
                className="card-img-top mx-auto"
                style={{ width: "80px", height: "80px", marginTop: "10px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{ex.name}</h5>
                <p className="card-text mb-1">Duration: {ex.duration}</p>
                <p className="card-text mb-3">Cost: {ex.cost}</p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => alert(`${ex.name} added to plan!`)}
                >
                  Add to Plan
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredExercises.length === 0 && (
          <p className="text-muted">No exercises match your search or filter.</p>
        )}
      </div>
    </div>
  );
}

export default Loseweight;
