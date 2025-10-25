// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // 👈 import navigate
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Buildmuscle.css";

// function Buildmuscle() {
//   const navigate = useNavigate(); // 👈 for back navigation
//   const [darkMode, setDarkMode] = useState(false);
//   const [levelFilter, setLevelFilter] = useState("All");
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
//     { id: 1, name: "Bench Press", duration: 15, cost: 8, level: "Intermediate" },
//     { id: 2, name: "Bicep Curls", duration: 10, cost: 5, level: "Beginner" },
//     { id: 3, name: "Deadlift", duration: 20, cost: 10, level: "Advanced" },
//     { id: 4, name: "Squats", duration: 15, cost: 7, level: "Beginner" },
//     { id: 5, name: "Pull Ups", duration: 12, cost: 6, level: "Advanced" },
//     { id: 6, name: "Shoulder Press", duration: 10, cost: 5, level: "Intermediate" },
//     { id: 7, name: "Lunges", duration: 12, cost: 6, level: "Beginner" },
//     { id: 8, name: "Tricep Dips", duration: 10, cost: 5, level: "Intermediate" },
//     { id: 9, name: "Leg Press", duration: 15, cost: 8, level: "Advanced" },
//     { id: 10, name: "Chest Fly", duration: 12, cost: 6, level: "Intermediate" },
//     { id: 11, name: "Lat Pulldown", duration: 12, cost: 6, level: "Intermediate" },
//     { id: 12, name: "Plank", duration: 5, cost: 3, level: "Beginner" },
//   ];

//   let filteredExercises = exercises.filter(
//     (ex) =>
//       (levelFilter === "All" || ex.level === levelFilter) &&
//       ex.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (sortOption === "DurationAsc") filteredExercises.sort((a, b) => a.duration - b.duration);
//   else if (sortOption === "DurationDesc") filteredExercises.sort((a, b) => b.duration - a.duration);
//   else if (sortOption === "CostAsc") filteredExercises.sort((a, b) => a.cost - b.cost);
//   else if (sortOption === "CostDesc") filteredExercises.sort((a, b) => b.cost - a.cost);

//   const resetFilters = () => {
//     setLevelFilter("All");
//     setSearchTerm("");
//     setSortOption("None");
//   };

//   return (
//     <div className={`container py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
//       {/* Header Section with Back Button */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <h2>💪 Build Muscle Exercises</h2>
//         <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//           ⬅ Back
//         </button>
//       </div>

//       <div className="d-flex align-items-center gap-2 mt-2 mt-md-0 flex-wrap mb-4">
//         <select
//           className="form-select"
//           value={levelFilter}
//           onChange={(e) => setLevelFilter(e.target.value)}
//         >
//           <option value="All">All Levels</option>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Advanced">Advanced</option>
//         </select>

//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search exercises..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           className="form-select"
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//         >
//           <option value="None">Sort By</option>
//           <option value="DurationAsc">Duration ↑</option>
//           <option value="DurationDesc">Duration ↓</option>
//           <option value="CostAsc">Cost ↑</option>
//           <option value="CostDesc">Cost ↓</option>
//         </select>

//         <button
//           className="btn btn-outline-primary"
//           onClick={() => setDarkMode(!darkMode)}
//         >
//           {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//         </button>

//         <button className="btn btn-warning" onClick={resetFilters}>
//           Reset Filters
//         </button>
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
//                   <p className="card-text mb-3">Level: {ex.level}</p>
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

// export default Buildmuscle;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFitnessGoalsByGoal } from "../services/Api";
import { addToCartApi, getCartItems } from "../services/CartApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buildmuscle.css";

function Buildmuscle() {
  const navigate = useNavigate();
  const userId = 14; // Replace with logged-in user ID
  const [darkMode, setDarkMode] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("None");
  const [exercises, setExercises] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  // Fetch exercises and cart count
  useEffect(() => {
    fetchExercises();
    fetchCartCount();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const data = await getFitnessGoalsByGoal("BUILD_MUSCLES");
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      alert("Failed to load exercises. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const items = await getCartItems(userId);
      setCartCount(items.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Add to Plan
  const handleAddToCart = async (exercise) => {
    try {
      setAddingToCart(exercise.id);
      
      const cartItem = {
        userId: userId,
        fitnessGoalId: exercise.id,
        title: exercise.title,
        cost: exercise.cost,
        duration: exercise.duration,
        level: exercise.level,
        type: exercise.type,
        imageData: exercise.imageData
      };

      await addToCartApi(cartItem);
      await fetchCartCount(); // Update cart count
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = `alert alert-success position-fixed top-0 end-0 m-3`;
      toast.style.zIndex = '9999';
      toast.innerHTML = `
        <strong>Success!</strong> ${exercise.title} added to your plan!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(toast);
      
      // Auto remove toast after 3 seconds
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 3000);
      
    } catch (error) {
      console.error("Error adding to plan:", error.response || error.message);
      
      let errorMessage = "Failed to add to plan. Please try again.";
      if (error.response?.status === 400) {
        errorMessage = "This exercise is already in your plan!";
      }
      
      alert(errorMessage);
    } finally {
      setAddingToCart(null);
    }
  };

  // Filter & Sort
  let filtered = exercises.filter(
    ex =>
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

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm`}>
        <div className="container-fluid">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
          <span className="navbar-brand fw-bold">💪 Build Muscle</span>
          <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
            {/* Filters */}
            <select 
              className="form-select form-select-sm" 
              style={{ width: "130px" }} 
              value={levelFilter} 
              onChange={e => setLevelFilter(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
            
            <select 
              className="form-select form-select-sm" 
              style={{ width: "130px" }} 
              value={typeFilter} 
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="CARDIO">Cardio</option>
              <option value="STRENGTH">Strength</option>
              <option value="FLEXIBILITY">Flexibility</option>
            </select>
            
            <input 
              type="text" 
              className="form-control form-control-sm" 
              style={{ width: "160px" }} 
              placeholder="Search..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
            
            <select 
              className="form-select form-select-sm" 
              style={{ width: "130px" }} 
              value={sortOption} 
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="None">Sort By</option>
              <option value="DurationAsc">Duration ↑</option>
              <option value="DurationDesc">Duration ↓</option>
              <option value="CostAsc">Cost ↑</option>
              <option value="CostDesc">Cost ↓</option>
            </select>
            
            <button className="btn btn-warning btn-sm" onClick={resetFilters}>
              Reset
            </button>

            {/* Cart Button */}
            <button 
              className="btn btn-primary btn-sm position-relative" 
              onClick={() => navigate("/cart")}
            >
              🛒 Plan
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Exercises Grid */}
      <div className="container" style={{ paddingTop: "100px" }}>
        {filtered.length === 0 && !loading ? (
          <div className="col-12 text-center py-5">
            <h4>😔 No exercises found</h4>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="row">
            {filtered.map(ex => (
              <div key={ex.id} className="col-md-4 mb-4">
                <div 
                  className="exercise-card shadow-sm"
                  style={{ 
                    backgroundImage: `url(data:image/jpeg;base64,${ex.imageData})`, 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                  }}
                >
                  <div className="overlay p-3">
                    <h4 className="fw-bold mb-2">{ex.title}</h4>
                    <p className="mb-1">
                      <strong>Duration:</strong> {ex.duration} min
                    </p>
                    <p className="mb-1">
                      <strong>Cost:</strong> ${ex.cost}
                    </p>
                    <p className="mb-1">
                      <strong>Level:</strong> 
                      <span className={`badge ms-1 ${
                        ex.level === 'BEGINNER' ? 'bg-success' : 
                        ex.level === 'INTERMEDIATE' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {ex.level}
                      </span>
                    </p>
                    <p className="mb-2">
                      <strong>Type:</strong> 
                      <span className={`badge ms-1 ${
                        ex.type === 'CARDIO' ? 'bg-primary' : 
                        ex.type === 'STRENGTH' ? 'bg-secondary' : 'bg-info'
                      }`}>
                        {ex.type}
                      </span>
                    </p>
                    <button 
                      className="btn btn-success btn-sm w-100"
                      onClick={() => handleAddToCart(ex)}
                      disabled={addingToCart === ex.id}
                    >
                      {addingToCart === ex.id ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Adding...
                        </>
                      ) : (
                        "Add to Plan"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Buildmuscle;
