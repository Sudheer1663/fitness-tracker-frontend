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



















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getFitnessGoalsByGoal } from "../services/Api";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Loseweight.css";

// function Loseweight() {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(false);
//   const [levelFilter, setLevelFilter] = useState("All");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("None");
//   const [exercises, setExercises] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Load theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") setDarkMode(true);
//   }, []);

//   useEffect(() => {
//     document.body.className = darkMode ? "dark-mode" : "";
//   }, [darkMode]);

//   // Fetch exercises
//   useEffect(() => {
//     getFitnessGoalsByGoal("LOSE_WEIGHT")
//       .then((data) => setExercises(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Filter + sort logic
//   let filtered = exercises.filter(
//     (ex) =>
//       (levelFilter === "All" || ex.level === levelFilter) &&
//       (typeFilter === "All" || ex.type === typeFilter) &&
//       ex.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (sortOption === "DurationAsc") filtered.sort((a, b) => a.duration - b.duration);
//   else if (sortOption === "DurationDesc") filtered.sort((a, b) => b.duration - a.duration);
//   else if (sortOption === "CostAsc") filtered.sort((a, b) => a.cost - b.cost);
//   else if (sortOption === "CostDesc") filtered.sort((a, b) => b.cost - a.cost);

//   const resetFilters = () => {
//     setLevelFilter("All");
//     setTypeFilter("All");
//     setSearchTerm("");
//     setSortOption("None");
//   };

//   const addToCart = (exercise) => {
//     if (!cart.find((item) => item.id === exercise.id)) {
//       setCart([...cart, exercise]);
//       alert(`${exercise.title} added to cart!`);
//     } else {
//       alert(`${exercise.title} is already in the cart!`);
//     }
//   };

//   return (
//     <div
//       className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
//       style={{ minHeight: "100vh" }}
//     >
//       {/* Navbar */}
//       <nav
//         className={`navbar navbar-expand-lg fixed-top ${
//           darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
//         } shadow-sm`}
//       >
//         <div className="container-fluid">
//           <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
//             ⬅ Back
//           </button>
//           <span className="navbar-brand fw-bold">🏋️‍♀️ Lose Weight</span>
//           <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
//             {/* Level Filter */}
//             <select
//               className="form-select form-select-sm"
//               style={{ width: "130px" }}
//               value={levelFilter}
//               onChange={(e) => setLevelFilter(e.target.value)}
//             >
//               <option value="All">All Levels</option>
//               <option value="BEGINNER">Beginner</option>
//               <option value="INTERMEDIATE">Intermediate</option>
//               <option value="ADVANCED">Advanced</option>
//             </select>

//             {/* Type Filter */}
//             <select
//               className="form-select form-select-sm"
//               style={{ width: "130px" }}
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//             >
//               <option value="All">All Types</option>
//               <option value="CARDIO">Cardio</option>
//               <option value="STRENGTH">Strength</option>
//               <option value="FLEXIBILITY">Flexibility</option>
//             </select>

//             {/* Search */}
//             <input
//               type="text"
//               className="form-control form-control-sm"
//               style={{ width: "160px" }}
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* Sort */}
//             <select
//               className="form-select form-select-sm"
//               style={{ width: "130px" }}
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//             >
//               <option value="None">Sort By</option>
//               <option value="DurationAsc">Duration ↑</option>
//               <option value="DurationDesc">Duration ↓</option>
//               <option value="CostAsc">Cost ↑</option>
//               <option value="CostDesc">Cost ↓</option>
//             </select>

//             <button className="btn btn-warning btn-sm" onClick={resetFilters}>
//               Reset
//             </button>

//             {/* Cart Button */}
//             <button
//               className="btn btn-primary btn-sm position-relative"
//               onClick={() => navigate("/cart")}
//             >
//               🛒 Cart
//               {cart.length > 0 && (
//                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Exercise Cards */}
//       <div className="container" style={{ paddingTop: "100px" }}>
//         <div className="row">
//           {filtered.length === 0 ? (
//             <div className="col-12 text-center py-5">
//               <h4>😔 No exercises found</h4>
//             </div>
//           ) : (
//             filtered.map((ex) => (
//               <div key={ex.id} className="col-md-4 mb-4">
//                 <div
//                   className="exercise-card shadow-sm"
//                   style={{
//                     backgroundImage: `url(data:image/jpeg;base64,${ex.imageData})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                   onClick={() => {
//                     setSelectedImage(`data:image/jpeg;base64,${ex.imageData}`);
//                     setShowModal(true);
//                   }}
//                 >
//                   <div className="overlay p-2">
//                     <h4 className="fw-bold mb-2">{ex.title}</h4>
//                     <p className="mb-1"><strong>Duration:</strong> {ex.duration} min</p>
//                     <p className="mb-1"><strong>Cost:</strong> ${ex.cost}</p>
//                     <p className="mb-1"><strong>Level:</strong> {ex.level}</p>
//                     <p className="mb-1"><strong>Type:</strong> {ex.type}</p>
//                     <button
//                       className="btn btn-success btn-sm mt-2"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(ex);
//                       }}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Image Modal */}
//       {showModal && (
//         <div
//           className="modal fade show"
//           style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content bg-transparent border-0">
//               <div className="modal-body text-center p-0">
//                 <img
//                   src={selectedImage}
//                   alt="Exercise Preview"
//                   style={{
//                     width: "100%",
//                     maxWidth: "500px",
//                     borderRadius: "10px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </div>
//               <button
//                 className="btn btn-danger position-absolute top-0 end-0 m-3"
//                 onClick={() => setShowModal(false)}
//               >
//                 ✖
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Loseweight;





























import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFitnessGoalsByGoal } from "../services/Api";
import { useCart } from "../contexts/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loseweight.css";

function Loseweight() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [darkMode, setDarkMode] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [exercises, setExercises] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  useEffect(() => {
    getFitnessGoalsByGoal("LOSE_WEIGHT")
      .then(setExercises)
      .catch(console.error);
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

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>
      <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm`}>
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>⬅ Back</button>
          <span className="navbar-brand fw-bold">🏋️‍♀️ Lose Weight</span>
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

            <button className="btn btn-primary btn-sm position-relative" onClick={() => navigate("/cart")}>
              🛒 Cart
              {cart.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row">
          {filtered.length === 0 ? (
            <div className="col-12 text-center py-5"><h4>😔 No exercises found</h4></div>
          ) : (
            filtered.map((ex) => (
              <div key={ex.id} className="col-md-4 mb-4">
                <div className="exercise-card shadow-sm" style={{ backgroundImage: `url(data:image/jpeg;base64,${ex.imageData})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  onClick={() => { setSelectedImage(`data:image/jpeg;base64,${ex.imageData}`); setShowModal(true); }}>
                  <div className="overlay p-2">
                    <h4 className="fw-bold mb-2">{ex.title}</h4>
                    <p className="mb-1"><strong>Duration:</strong> {ex.duration} min</p>
                    <p className="mb-1"><strong>Cost:</strong> ${ex.cost}</p>
                    <p className="mb-1"><strong>Level:</strong> {ex.level}</p>
                    <p className="mb-1"><strong>Type:</strong> {ex.type}</p>
                    <button className="btn btn-success btn-sm mt-2" onClick={(e) => { e.stopPropagation(); addToCart(ex); }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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

export default Loseweight;
