// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Loseweight.css";

// const exerciseImages = {
//   "Jumping Jacks": "https://img.icons8.com/color/96/000000/jumping-jacks.png",
//   "Burpees": "https://img.icons8.com/color/96/000000/burpee.png",
//   "Mountain Climbers": "https://img.icons8.com/color/96/000000/mountain-climber.png",
//   "High Knees": "https://img.icons8.com/color/96/000000/high-knee.png",
//   "Squat Jumps": "https://img.icons8.com/color/96/000000/squat.png",
//   "Lunges": "https://img.icons8.com/color/96/000000/lunge.png",
//   "Plank": "https://img.icons8.com/color/96/000000/plank.png",
//   "Jump Rope": "https://img.icons8.com/color/96/000000/jump-rope.png",
//   "Bicycle Crunches": "https://img.icons8.com/color/96/000000/bicycle-crunch.png",
//   "Side Lunges": "https://img.icons8.com/color/96/000000/side-lunge.png",
//   "Butt Kicks": "https://img.icons8.com/color/96/000000/butt-kick.png",
// };

// function Loseweight() {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(false);
//   const [selectedDifficulty, setSelectedDifficulty] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") setDarkMode(true);
//   }, []);

//   useEffect(() => {
//     document.body.className = darkMode ? "dark-mode" : "";
//   }, [darkMode]);

//   const exercises = [
//     { id: 1, name: "Jumping Jacks", duration: "10 min", cost: "$0", difficulty: "Beginner" },
//     { id: 2, name: "Burpees", duration: "15 min", cost: "$0", difficulty: "Advanced" },
//     { id: 3, name: "Mountain Climbers", duration: "12 min", cost: "$0", difficulty: "Intermediate" },
//     { id: 4, name: "High Knees", duration: "8 min", cost: "$0", difficulty: "Beginner" },
//     { id: 5, name: "Squat Jumps", duration: "10 min", cost: "$0", difficulty: "Intermediate" },
//     { id: 6, name: "Lunges", duration: "15 min", cost: "$0", difficulty: "Intermediate" },
//     { id: 7, name: "Plank", duration: "5 min", cost: "$0", difficulty: "Beginner" },
//     { id: 8, name: "Jump Rope", duration: "10 min", cost: "$0", difficulty: "Intermediate" },
//     { id: 9, name: "Bicycle Crunches", duration: "12 min", cost: "$0", difficulty: "Advanced" },
//     { id: 10, name: "Side Lunges", duration: "10 min", cost: "$0", difficulty: "Intermediate" },
//     { id: 11, name: "Butt Kicks", duration: "8 min", cost: "$0", difficulty: "Beginner" },
//   ];

//   const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

//   const filteredExercises = exercises
//     .filter((ex) => selectedDifficulty === "All" || ex.difficulty === selectedDifficulty)
//     .filter((ex) => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className={`loseweight-page ${darkMode ? "dark-mode" : "light-mode"}`}>
//       {/* ✅ Navbar */}
//       <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm fixed-top`}>
//         <div className="container-fluid">
//           <button className="btn btn-outline-secondary me-3" onClick={() => navigate("/home")}>
//             ⬅ Back
//           </button>

//           <a className="navbar-brand fw-bold" href="#">
//             🏋️‍♀️ Lose Weight
//           </a>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarContent"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               {difficulties.map((level) => (
//                 <li key={level} className="nav-item me-2">
//                   <button
//                     className={`btn btn-sm ${selectedDifficulty === level ? "btn-primary" : "btn-outline-primary"}`}
//                     onClick={() => setSelectedDifficulty(level)}
//                   >
//                     {level}
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <form className="d-flex me-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search exercises..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </form>

//             <button
//               className={`btn btn-${darkMode ? "light" : "dark"}`}
//               onClick={() => {
//                 setDarkMode(!darkMode);
//                 localStorage.setItem("theme", darkMode ? "light" : "dark");
//               }}
//             >
//               {darkMode ? "☀ Light" : "🌙 Dark"}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ✅ Content Section */}
//       <div className="container my-5 pt-5">
//         <div className="row mt-5">
//           {filteredExercises.map((ex) => (
//             <div key={ex.id} className="col-sm-6 col-lg-4 mb-4">
//               <div className="card exercise-card h-100 text-center shadow-sm p-3">
//                 <img
//                   src={exerciseImages[ex.name]}
//                   alt={ex.name}
//                   className="card-img-top mx-auto"
//                   style={{ width: "80px", height: "80px", marginTop: "10px" }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{ex.name}</h5>
//                   <p className="card-text mb-1">Duration: {ex.duration}</p>
//                   <p className="card-text mb-3">Cost: {ex.cost}</p>
//                   <button
//                     className="btn btn-success mt-auto"
//                     onClick={() => alert(`${ex.name} added to plan!`)}
//                   >
//                     Add to Plan
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {filteredExercises.length === 0 && (
//             <p className="text-muted text-center">No exercises match your search or filter.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loseweight;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
};

function Loseweight() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
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
    { id: 1, name: "Jumping Jacks", duration: 10, cost: 0, difficulty: "Beginner", type: "Cardio" },
    { id: 2, name: "Burpees", duration: 15, cost: 0, difficulty: "Advanced", type: "Strength" },
    { id: 3, name: "Mountain Climbers", duration: 12, cost: 0, difficulty: "Intermediate", type: "Cardio" },
    { id: 4, name: "High Knees", duration: 8, cost: 0, difficulty: "Beginner", type: "Cardio" },
    { id: 5, name: "Squat Jumps", duration: 10, cost: 0, difficulty: "Intermediate", type: "Strength" },
    { id: 6, name: "Lunges", duration: 15, cost: 0, difficulty: "Intermediate", type: "Strength" },
    { id: 7, name: "Plank", duration: 5, cost: 0, difficulty: "Beginner", type: "Flexibility" },
    { id: 8, name: "Jump Rope", duration: 10, cost: 0, difficulty: "Intermediate", type: "Cardio" },
    { id: 9, name: "Bicycle Crunches", duration: 12, cost: 0, difficulty: "Advanced", type: "Strength" },
    { id: 10, name: "Side Lunges", duration: 10, cost: 0, difficulty: "Intermediate", type: "Strength" },
    { id: 11, name: "Butt Kicks", duration: 8, cost: 0, difficulty: "Beginner", type: "Cardio" },
  ];

  // 🔍 Filtering and Sorting Logic
  let filteredExercises = exercises.filter(
    (ex) =>
      (difficultyFilter === "All" || ex.difficulty === difficultyFilter) &&
      (typeFilter === "All" || ex.type === typeFilter) &&
      ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "DurationAsc") filteredExercises.sort((a, b) => a.duration - b.duration);
  else if (sortOption === "DurationDesc") filteredExercises.sort((a, b) => b.duration - a.duration);
  else if (sortOption === "CostAsc") filteredExercises.sort((a, b) => a.cost - b.cost);
  else if (sortOption === "CostDesc") filteredExercises.sort((a, b) => b.cost - a.cost);

  const resetFilters = () => {
    setDifficultyFilter("All");
    setTypeFilter("All");
    setSearchTerm("");
    setSortOption("None");
  };

  const countByDifficulty = (level) => filteredExercises.filter((ex) => ex.difficulty === level).length;

  return (
    <div className={`loseweight-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* ✅ Navbar Section */}
      <nav
        className={`navbar navbar-expand-lg fixed-top ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm`}
      >
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>

          <a className="navbar-brand fw-bold me-4" href="#">
            🏋️‍♀️ Lose Weight
          </a>

          <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
            {/* Difficulty Filter */}
            <select
              className="form-select form-select-sm"
              style={{ width: "130px" }}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Type Filter */}
            <select
              className="form-select form-select-sm"
              style={{ width: "130px" }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
            </select>

            {/* Search */}
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              style={{ width: "160px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Sort Option */}
            <select
              className="form-select form-select-sm"
              style={{ width: "130px" }}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="None">Sort By</option>
              <option value="DurationAsc">Duration ↑</option>
              <option value="DurationDesc">Duration ↓</option>
              <option value="CostAsc">Cost ↑</option>
              <option value="CostDesc">Cost ↓</option>
            </select>

            {/* Reset Button */}
            <button className="btn btn-warning btn-sm" onClick={resetFilters}>
              Reset
            </button>

            {/* Dark Mode Toggle */}
          </div>
        </div>
      </nav>

      {/* ✅ Main Content Section */}
      <div className="container pt-5 mt-5">
        <div className="my-4">
          <h4>
            Total Exercises Found: {filteredExercises.length} &nbsp;|&nbsp;
            <span className="text-success">Beginner: {countByDifficulty("Beginner")}</span> &nbsp;|&nbsp;
            <span className="text-warning">Intermediate: {countByDifficulty("Intermediate")}</span> &nbsp;|&nbsp;
            <span className="text-danger">Advanced: {countByDifficulty("Advanced")}</span>
          </h4>
        </div>

        <div className="row">
          {filteredExercises.length === 0 ? (
            <div className="col-12">
              <div
                className={`card p-5 text-center ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}
              >
                <h4>😔 No exercises found</h4>
                <p>Try changing the filters or search term.</p>
              </div>
            </div>
          ) : (
            filteredExercises.map((ex) => (
              <div key={ex.id} className="col-md-4 mb-4">
                <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
                  <div className="card-body d-flex flex-column align-items-center">
                    <img
                      src={exerciseImages[ex.name]}
                      alt={ex.name}
                      style={{ width: "80px", height: "80px", marginBottom: "10px" }}
                    />
                    <h5 className="card-title">{ex.name}</h5>
                    <p className="card-text mb-1">Duration: {ex.duration} min</p>
                    <p className="card-text mb-1">Cost: ${ex.cost}</p>
                    <p className="card-text mb-1">Difficulty: {ex.difficulty}</p>
                    <p className="card-text mb-1">Type: {ex.type}</p>
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
    </div>
  );
}

export default Loseweight;
