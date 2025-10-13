import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buildmuscle.css";

function Buildmuscle() {
  const [darkMode, setDarkMode] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("None");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const exercises = [
    { id: 1, name: "Bench Press", duration: 15, cost: 8, level: "Intermediate" },
    { id: 2, name: "Bicep Curls", duration: 10, cost: 5, level: "Beginner" },
    { id: 3, name: "Deadlift", duration: 20, cost: 10, level: "Advanced" },
    { id: 4, name: "Squats", duration: 15, cost: 7, level: "Beginner" },
    { id: 5, name: "Pull Ups", duration: 12, cost: 6, level: "Advanced" },
    { id: 6, name: "Shoulder Press", duration: 10, cost: 5, level: "Intermediate" },
    { id: 7, name: "Lunges", duration: 12, cost: 6, level: "Beginner" },
    { id: 8, name: "Tricep Dips", duration: 10, cost: 5, level: "Intermediate" },
    { id: 9, name: "Leg Press", duration: 15, cost: 8, level: "Advanced" },
    { id: 10, name: "Chest Fly", duration: 12, cost: 6, level: "Intermediate" },
    { id: 11, name: "Lat Pulldown", duration: 12, cost: 6, level: "Intermediate" },
    { id: 12, name: "Plank", duration: 5, cost: 3, level: "Beginner" },
  ];

  let filteredExercises = exercises.filter(
    (ex) =>
      (levelFilter === "All" || ex.level === levelFilter) &&
      ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (sortOption === "DurationAsc") filteredExercises.sort((a, b) => a.duration - b.duration);
  else if (sortOption === "DurationDesc") filteredExercises.sort((a, b) => b.duration - a.duration);
  else if (sortOption === "CostAsc") filteredExercises.sort((a, b) => a.cost - b.cost);
  else if (sortOption === "CostDesc") filteredExercises.sort((a, b) => b.cost - a.cost);

  const resetFilters = () => {
    setLevelFilter("All");
    setSearchTerm("");
    setSortOption("None");
  };

  return (
    <div className={`container py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>💪 Build Muscle Exercises</h2>
        <div className="d-flex align-items-center gap-2 mt-2 mt-md-0 flex-wrap">
          <select
            className="form-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            type="text"
            className="form-control"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="None">Sort By</option>
            <option value="DurationAsc">Duration ↑</option>
            <option value="DurationDesc">Duration ↓</option>
            <option value="CostAsc">Cost ↑</option>
            <option value="CostDesc">Cost ↓</option>
          </select>

          <button
            className="btn btn-outline-primary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button className="btn btn-warning" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="row">
        {filteredExercises.length === 0 ? (
          <div className="col-12">
            <div className={`card p-5 text-center ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"} no-exercise-card`}>
              <h4 className="animate-pulse">😔 No exercises found</h4>
              <p>Try changing the filters or search term.</p>
            </div>
          </div>
        ) : (
          filteredExercises.map((ex) => (
            <div key={ex.id} className="col-md-4 mb-4">
              <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ex.name}</h5>
                  <p className="card-text mb-1">Duration: {ex.duration} min</p>
                  <p className="card-text mb-1">Cost: ${ex.cost}</p>
                  <p className="card-text mb-3">Level: {ex.level}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => alert(`${ex.name} added to plan!`)}
                  >
                    Add to Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Buildmuscle;
