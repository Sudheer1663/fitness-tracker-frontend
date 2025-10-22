// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Stayfit.css";

// function Stayfit() {
//   const navigate = useNavigate();

//   const [darkMode, setDarkMode] = useState(false);
//   const [levelFilter, setLevelFilter] = useState("All");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("None");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") setDarkMode(true);
//   }, []);

//   useEffect(() => {
//     document.body.className = darkMode ? "dark-mode" : "";
//   }, [darkMode]);

//   const exercises = [
//     { id: 1, name: "Yoga", duration: 20, cost: 5, level: "Beginner", type: "Flexibility" },
//     { id: 2, name: "Plank", duration: 10, cost: 4, level: "Intermediate", type: "Strength" },
//     { id: 3, name: "Walking", duration: 30, cost: 0, level: "Beginner", type: "Cardio" },
//     { id: 4, name: "Stretching", duration: 15, cost: 3, level: "Beginner", type: "Flexibility" },
//     { id: 5, name: "Cycling", duration: 25, cost: 6, level: "Intermediate", type: "Cardio" },
//     { id: 6, name: "Meditation", duration: 10, cost: 2, level: "Beginner", type: "Balance" },
//     { id: 7, name: "Jumping Jacks", duration: 10, cost: 4, level: "Beginner", type: "Cardio" },
//     { id: 8, name: "Mountain Climbers", duration: 12, cost: 5, level: "Intermediate", type: "Cardio" },
//     { id: 9, name: "Burpees", duration: 15, cost: 6, level: "Advanced", type: "Strength" },
//     { id: 10, name: "High Knees", duration: 10, cost: 4, level: "Intermediate", type: "Cardio" },
//     { id: 11, name: "Side Plank", duration: 8, cost: 3, level: "Advanced", type: "Strength" },
//     { id: 12, name: "Arm Circles", duration: 5, cost: 2, level: "Beginner", type: "Flexibility" },
//     { id: 13, name: "Leg Raises", duration: 10, cost: 4, level: "Intermediate", type: "Strength" },
//     { id: 14, name: "Wall Sit", duration: 8, cost: 3, level: "Intermediate", type: "Strength" },
//     { id: 15, name: "Foam Rolling", duration: 15, cost: 3, level: "Beginner", type: "Flexibility" },
//   ];

//   let filteredExercises = exercises.filter(
//     (ex) =>
//       (levelFilter === "All" || ex.level === levelFilter) &&
//       (typeFilter === "All" || ex.type === typeFilter) &&
//       ex.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (sortOption === "DurationAsc") filteredExercises.sort((a, b) => a.duration - b.duration);
//   else if (sortOption === "DurationDesc") filteredExercises.sort((a, b) => b.duration - a.duration);
//   else if (sortOption === "CostAsc") filteredExercises.sort((a, b) => a.cost - b.cost);
//   else if (sortOption === "CostDesc") filteredExercises.sort((a, b) => b.cost - a.cost);

//   const resetFilters = () => {
//     setLevelFilter("All");
//     setTypeFilter("All");
//     setSearchTerm("");
//     setSortOption("None");
//   };

//   const countByLevel = (level) =>
//     filteredExercises.filter((ex) => ex.level === level).length;

//   return (
//     <div className={`container py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
//       {/* 🔙 Back Button */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <h2>🏃 Stay Fit Exercises</h2>
//         <button
//           className="btn btn-outline-secondary mb-2"
//           onClick={() => navigate(-1)}
//         >
//           ⬅ Back
//         </button>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <div className="d-flex align-items-center gap-2 mt-2 mt-md-0 flex-wrap">
//           <select
//             className="form-select"
//             value={levelFilter}
//             onChange={(e) => setLevelFilter(e.target.value)}
//           >
//             <option value="All">All Levels</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//           <select
//             className="form-select"
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//           >
//             <option value="All">All Types</option>
//             <option value="Cardio">Cardio</option>
//             <option value="Strength">Strength</option>
//             <option value="Flexibility">Flexibility</option>
//             <option value="Balance">Balance</option>
//           </select>

//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search exercises..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <select
//             className="form-select"
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//           >
//             <option value="None">Sort By</option>
//             <option value="DurationAsc">Duration ↑</option>
//             <option value="DurationDesc">Duration ↓</option>
//             <option value="CostAsc">Cost ↑</option>
//             <option value="CostDesc">Cost ↓</option>
//           </select>

//           {/* <button
//             className="btn btn-outline-primary"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//           </button> */}

//           <button className="btn btn-warning" onClick={resetFilters}>
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       <div className="mb-3">
//         <h5>
//           Total Exercises Found: {filteredExercises.length} &nbsp;|&nbsp;
//           <span className="text-success">Beginner: {countByLevel("Beginner")}</span> &nbsp;|&nbsp;
//           <span className="text-warning">Intermediate: {countByLevel("Intermediate")}</span> &nbsp;|&nbsp;
//           <span className="text-danger">Advanced: {countByLevel("Advanced")}</span>
//         </h5>
//       </div>

//       <div className="row">
//         {filteredExercises.length === 0 ? (
//           <div className="col-12">
//             <div
//               className={`card p-5 text-center ${
//                 darkMode ? "bg-secondary text-light" : "bg-light text-dark"
//               } no-exercise-card`}
//             >
//               <h4 className="animate-pulse">😔 No exercises found</h4>
//               <p>Try changing the filters or search term.</p>
//             </div>
//           </div>
//         ) : (
//           filteredExercises.map((ex) => (
//             <div key={ex.id} className="col-md-4 mb-4">
//               <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{ex.name}</h5>
//                   <p className="card-text mb-1">Duration: {ex.duration} min</p>
//                   <p className="card-text mb-1">Cost: ${ex.cost}</p>
//                   <p className="card-text mb-1">Level: {ex.level}</p>
//                   <p className="card-text mb-3">Type: {ex.type}</p>
//                   <button
//                     className="btn btn-success mt-auto"
//                     onClick={() => alert(`${ex.name} added to plan!`)}
//                   >
//                     Add to Plan
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Stayfit;









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFitnessGoalsByGoal } from "../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stayfit.css";

function Stayfit() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [exercises, setExercises] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  // Fetch exercises
  useEffect(() => {
    getFitnessGoalsByGoal("STAY_FIT")
      .then((data) => setExercises(data))
      .catch((err) => console.error("Error fetching STAY_FIT:", err));
  }, []);

  let filtered = exercises.filter(
    (ex) =>
      (levelFilter === "All" || ex.level === levelFilter) &&
      (typeFilter === "All" || ex.type === typeFilter) &&
      ex.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "DurationAsc") filtered.sort((a, b) => a.duration - b.duration);
  else if (sortOption === "DurationDesc") filtered.sort((a, b) => b.duration - a.duration);
  else if (sortOption === "CostAsc") filtered.sort((a, b) => a.cost - b.cost);
  else if (sortOption === "CostDesc") filtered.sort((a, b) => b.cost - a.cost);

  const resetFilters = () => {
    setLevelFilter("All");
    setTypeFilter("All");
    setSearchTerm("");
    setSortOption("None");
  };

  const addToCart = (exercise) => {
    if (!cart.find((item) => item.id === exercise.id)) {
      setCart([...cart, exercise]);
      alert(`${exercise.title} added to cart!`);
    } else {
      alert(`${exercise.title} is already in the cart!`);
    }
  };

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm`}>
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>⬅ Back</button>
          <span className="navbar-brand fw-bold">🏃‍♂️ Stay Fit</span>
          <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
            <select className="form-select form-select-sm" style={{ width: "130px" }} value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="All">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>

            <select className="form-select form-select-sm" style={{ width: "130px" }} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="CARDIO">Cardio</option>
              <option value="STRENGTH">Strength</option>
              <option value="FLEXIBILITY">Flexibility</option>
              <option value="CORE">Core</option>
            </select>

            <input type="text" className="form-control form-control-sm" style={{ width: "160px" }} placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <select className="form-select form-select-sm" style={{ width: "130px" }} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="None">Sort By</option>
              <option value="DurationAsc">Duration ↑</option>
              <option value="DurationDesc">Duration ↓</option>
              <option value="CostAsc">Cost ↑</option>
              <option value="CostDesc">Cost ↓</option>
            </select>

            <button className="btn btn-warning btn-sm" onClick={resetFilters}>Reset</button>

            {/* Cart Button */}
            <button className="btn btn-primary btn-sm position-relative" onClick={() => alert(`Cart Items:\n${cart.map(c => c.title).join("\n") || "Empty"}`)}>
              🛒 Cart
              {cart.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Exercises Grid */}
      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row">
          {filtered.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h4>😔 No exercises found</h4>
            </div>
          ) : (
            filtered.map((ex) => (
              <div key={ex.id} className="col-md-4 mb-4">
                <div
                  className="exercise-card shadow-sm"
                  style={{
                    backgroundImage: `url(data:image/jpeg;base64,${ex.imageData})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => { setSelectedImage(`data:image/jpeg;base64,${ex.imageData}`); setShowModal(true); }}
                >
                  <div className="overlay p-2">
                    <h4 className="fw-bold mb-2">{ex.title}</h4>
                    <p className="mb-1"><strong>Duration:</strong> {ex.duration} min</p>
                    <p className="mb-1"><strong>Cost:</strong> ${ex.cost}</p>
                    <p className="mb-1"><strong>Level:</strong> {ex.level}</p>
                    <p className="mb-1"><strong>Type:</strong> {ex.type}</p>
                    <button
                      className="btn btn-success btn-sm mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(ex);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center p-0">
                <img src={selectedImage} alt="Exercise Preview" style={{ width: "100%", maxWidth: "500px", borderRadius: "10px", objectFit: "contain" }} />
              </div>
              <button className="btn btn-danger position-absolute top-0 end-0 m-3" onClick={() => setShowModal(false)}>✖</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stayfit;
