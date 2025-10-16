import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Roadmap.css";

function Roadmap() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  const roadmapSteps = [
    {
      step: 1,
      title: "Beginner Phase",
      description: "Start with light exercises, stretching, basic cardio, and simple workouts to build a foundation.",
    },
    {
      step: 2,
      title: "Intermediate Phase",
      description: "Increase intensity: add resistance training, longer workouts, and moderate weightlifting to improve strength.",
    },
    {
      step: 3,
      title: "Advanced Phase",
      description: "Focus on high-intensity workouts, advanced techniques, complex routines, and tracking progress meticulously.",
    },
    {
      step: 4,
      title: "Nutrition & Supplements",
      description: "Learn about balanced diet, protein intake, supplements, and hydration for optimal results.",
    },
    {
      step: 5,
      title: "Recovery & Mindfulness",
      description: "Emphasize recovery, yoga, meditation, and sleep to sustain long-term fitness.",
    },
  ];

  const nextStep = () => setCurrentStep((prev) => (prev < roadmapSteps.length ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className={`roadmap-container ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📈 Fitness Roadmap</h2>
          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="timeline">
          {roadmapSteps.map((step) => (
            <div
              key={step.step}
              className={`timeline-step ${currentStep === step.step ? "active" : ""}`}
            >
              <div className="timeline-number">{step.step}</div>
              <div className="timeline-content">
                <h5>{step.title}</h5>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-primary" onClick={prevStep} disabled={currentStep === 1}>
            ⬅ Previous
          </button>
          <button className="btn btn-primary" onClick={nextStep} disabled={currentStep === roadmapSteps.length}>
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
