import React, { useState, useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Workout.css";

function Workout() {

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    type: "",
    duration: "",
    calories: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(saved);
  }, []);
 
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (!form.type || !form.duration || !form.calories) {
      alert("Please fill all fields!");
      return;
    }

    const newWorkout = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    setWorkouts([...workouts, newWorkout]);
    setForm({ type: "", duration: "", calories: "" });
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const resetWorkouts = () => {
    if (window.confirm("Are you sure you want to clear all workouts?")) {
      setWorkouts([]);
    }
  };

  return (
    <div className="workout-container">
      <h2>🏋️‍♀️ Workout Tracker</h2>

      <form onSubmit={addWorkout} className="workout-form">
        <input
          type="text"
          name="type"
          placeholder="Workout Type (e.g., Running)"
          value={form.type}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories Burned"
          value={form.calories}
          onChange={handleChange}
        />
        <button type="submit">Add Workout</button>
      </form>

      <div className="workout-list">
        {workouts.length === 0 ? (
          <p>No workouts yet. Add your first one!</p>
        ) : (
          workouts.map((w) => (
            <div key={w.id} className="workout-card">
              <h3>{w.type}</h3>
              <p>Duration: {w.duration} mins</p>
              <p>Calories: {w.calories} kcal</p>
              <p>Date: {w.date}</p>
              <button onClick={() => deleteWorkout(w.id)}>🗑 Delete</button>
            </div>
          ))
        )}
      </div>

      {workouts.length > 0 && (
        <>
          <button onClick={resetWorkouts} className="reset-btn">
            Clear All Workouts
          </button>

      
          <div className="chart-section">
            <h3>📈 Calories Burned Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workouts} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#4caf50"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Workout;
