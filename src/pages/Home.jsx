import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`home-container ${darkMode ? "dark-mode" : "light-mode"}`}>

    
      {/* <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button> */}

      
      <section className="hero">
        <h1>Welcome to Your Fitness Tracker</h1>
        <p>
          Track your activity, monitor your health, and stay motivated every
          day!
        </p>
        <button onClick={() => navigate("/getstarted")}>Get Started</button>
      </section>

      
      <section className="features">
        <h2>Why Use Fitness Tracker?</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>🏃‍♂️ Activity Tracking</h3>
            <p>Track steps, distance, and calories burned daily.</p>
          </div>
          <div className="feature-card">
            <h3>❤️ Health Monitoring</h3>
            <p>Monitor heart rate, sleep quality, and stress levels.</p>
          </div>
          <div className="feature-card">
            <h3>💪 Workout Logging</h3>
            <p>Save and view all your workout sessions in one place.</p>
          </div>
        </div>
      </section>

  
      <section className="advanced-features">
        <h2>Explore Advanced Fitness Tools</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>🤖 AI-Based Recommendations</h3>
            <p>
              Get smart workout and diet suggestions based on your fitness goal
              and progress.
            </p>
          </div>

          <div className="feature-card">
            <h3>🍽️ Personalized Meal Plans</h3>
            <p>
              Enjoy nutrition plans curated for your weight goals and food
              preferences.
            </p>
          </div>

          <div className="feature-card">
            <h3>⏰ Smart Reminders</h3>
            <p>
              Receive reminders to drink water, move, and stay active throughout
              the day.
            </p>
          </div>

          <div className="feature-card">
            <h3>📈 Progress Dashboard</h3>
            <p>
              Visualize your weight, workout, and health improvements with easy
              analytics.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌍 Global Challenges</h3>
            <p>
              Compete with fitness enthusiasts around the world and win rewards.
            </p>
          </div>

          <div className="feature-card">
            <h3>💬 Community Support</h3>
            <p>
              Connect with others, share your journey, and stay motivated
              together.
            </p>
          </div>
        </div>
      </section>

      
      <section className="next-level-features">
        <h2>Next-Level Tools to Power Your Fitness</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>⌚ Smartwatch & Device Sync</h3>
            <p>
              Connect with smartwatches or fitness bands to automatically sync
              your data in real time.
            </p>
          </div>

          <div className="feature-card">
            <h3>😴 Sleep Tracking</h3>
            <p>
              Understand your sleep cycle and get tips for better recovery and
              energy levels.
            </p>
          </div>

          <div className="feature-card">
            <h3>🧘 Mindfulness & Meditation</h3>
            <p>
              Reduce stress and improve focus with guided breathing and
              meditation sessions.
            </p>
          </div>

          <div className="feature-card">
            <h3>📅 Weekly Reports</h3>
            <p>
              Receive detailed weekly progress summaries to stay informed and
              motivated.
            </p>
          </div>

          <div className="feature-card">
            <h3>🏅 Achievement Badges</h3>
            <p>
              Earn badges for consistency, milestones, and completed challenges!
            </p>
          </div>

          <div className="feature-card">
            <h3>🛍️ Fitness Store Access</h3>
            <p>
              Explore curated fitness gear, supplements, and accessories to
              enhance your journey.
            </p>
          </div>
        </div>
      </section>

    
      <section className="cta-section">
        <h2>Start Your Journey Today</h2>
        <p>
          Your health transformation starts with one step. Join us and stay fit
          for life!
        </p>
        <button onClick={() => navigate("/signup")}>Join Now</button>
      </section>
    </div>
  );
}

export default Home;
