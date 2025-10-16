import React, { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Challenges.css";

function Challenges() {
  const [darkMode, setDarkMode] = useState(false);
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  
  const challenges = [
    { id: 1, title: "🏃‍♀️ 10,000 Steps a Day", description: "Walk 10,000 steps daily for 30 days to boost stamina and heart health.", duration: "30 Days" },
    { id: 2, title: "💧 Hydration Challenge", description: "Drink at least 3 liters of water daily to stay hydrated and energized.", duration: "15 Days" },
    { id: 3, title: "🧘‍♀️ Morning Yoga Flow", description: "Start your day with 20 minutes of yoga to improve flexibility and focus.", duration: "21 Days" },
    { id: 4, title: "💪 Plank Challenge", description: "Increase plank time daily for 2 weeks to strengthen your core.", duration: "14 Days" },
    { id: 5, title: "🏋️‍♂️ Push-Up Power", description: "Do 30 push-ups daily for 14 days to build upper body strength.", duration: "14 Days" },
    { id: 6, title: "🍎 No Sugar Week", description: "Cut out added sugars for 7 days to improve energy and overall health.", duration: "7 Days" },
    { id: 7, title: "🦵 Squat Challenge", description: "Perform 50 squats daily for 21 days to strengthen your legs and glutes.", duration: "21 Days" },
    { id: 8, title: "🧘‍♂️ Meditation Mindset", description: "Meditate for 10 minutes daily for 21 days to reduce stress and improve focus.", duration: "21 Days" },
    { id: 9, title: "💃 Cardio Blast", description: "Do 20 minutes of cardio exercises daily to increase endurance.", duration: "10 Days" },
    { id: 10, title: "😴 Sleep Well Challenge", description: "Maintain a consistent sleep schedule (7-8 hours) for 14 days.", duration: "14 Days" },
    { id: 11, title: "🏋️‍♀️ Dumbbell Strength", description: "Use dumbbells to perform full-body strength workouts 3x per week for 4 weeks.", duration: "28 Days" },
    { id: 12, title: "🥗 Healthy Meal Prep", description: "Prepare and eat balanced meals daily for 14 days to improve nutrition.", duration: "14 Days" },
  ];

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedJoined = JSON.parse(localStorage.getItem("joinedChallenges")) || [];
    const profile = JSON.parse(localStorage.getItem("userProfile"));

    if (savedTheme === "dark") setDarkMode(true);
    setJoinedChallenges(savedJoined);
    setUserProfile(profile);
  }, []);

  
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  
  const handleJoin = (id) => {
    if (!joinedChallenges.find((c) => c.id === id)) {
      const newChallenge = { id, progress: 0 };
      const updated = [...joinedChallenges, newChallenge];
      setJoinedChallenges(updated);
      localStorage.setItem("joinedChallenges", JSON.stringify(updated));
      alert("🎯 Challenge Joined! Stay consistent!");
    }
  };
  const handleProgress = (id) => {
    const updated = joinedChallenges.map((c) =>
      c.id === id ? { ...c, progress: Math.min(c.progress + 10, 100) } : c
    );
    setJoinedChallenges(updated);
    localStorage.setItem("joinedChallenges", JSON.stringify(updated));
  };

  
  const myChallenges = challenges.filter((c) =>
    joinedChallenges.some((jc) => jc.id === c.id)
  );

  const leaderboard = [
    { name: "Aarav", score: 250 },
    { name: "Sneha", score: 190 },
    { name: "Rohan", score: 160 },
    { name: userProfile?.name || "You", score: joinedChallenges.reduce((sum, c) => sum + c.progress, 0) },
    { name: "Priya", score: 120 },
  ].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className={`container py-5 challenges-page ${darkMode ? "dark" : "light"}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🏆 Fitness Challenges</h2>
       
      </div>

      <p className="lead text-muted mb-5">
        Push your limits! Join a challenge, stay accountable, and celebrate your progress with the community. 💪
      </p>

    
      <div className="row">
        {challenges.map((challenge) => {
          const joined = joinedChallenges.find((c) => c.id === challenge.id);
          return (
            <div className="col-md-6 col-lg-4 mb-4" key={challenge.id}>
              <div className="card shadow-sm h-100 challenge-card border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{challenge.title}</h5>
                  <p className="card-text">{challenge.description}</p>
                  <p className="text-secondary small mb-3"><strong>Duration:</strong> {challenge.duration}</p>

                  {joined ? (
                    <>
                      <div className="progress mb-2">
                        <div className="progress-bar bg-success" style={{ width: `${joined.progress}%` }}>
                          {joined.progress}%
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleProgress(challenge.id)}
                        disabled={joined.progress === 100}
                      >
                        {joined.progress === 100 ? "🏁 Completed" : "Add Progress +10%"}
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary mt-auto" onClick={() => handleJoin(challenge.id)}>
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      
      <div className="mt-5">
        <h3 className="fw-bold mb-3">🎯 My Joined Challenges</h3>
        {myChallenges.length === 0 ? (
          <p className="text-muted">You haven’t joined any challenges yet. Start one today!</p>
        ) : (
          <div className="row">
            {myChallenges.map((challenge) => {
              const joined = joinedChallenges.find((c) => c.id === challenge.id);
              return (
                <div className="col-md-6 col-lg-4 mb-4" key={challenge.id}>
                  <div className="card border-success shadow-sm h-100 joined-card">
                    <div className="card-body">
                      <h5 className="card-title text-success">{challenge.title}</h5>
                      <p className="card-text">{challenge.description}</p>
                      <p className="text-secondary small mb-2">Duration: {challenge.duration}</p>

                      <div className="progress mb-2">
                        <div className="progress-bar bg-success" style={{ width: `${joined.progress}%` }}></div>
                      </div>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleProgress(challenge.id)}
                        disabled={joined.progress === 100}
                      >
                        {joined.progress === 100 ? "🎉 Completed" : "Update Progress +10%"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      
      <div className="leaderboard-section mt-5">
        <h3 className="fw-bold mb-4 text-center">🥇 Leaderboard</h3>
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Participant</th>
                <th>Total Progress</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className={entry.name === (userProfile?.name || "You") ? "table-success" : ""}>
                  <td>{index + 1}</td>
                  <td>{entry.name === (userProfile?.name || "You") ? "🏅 You" : entry.name}</td>
                  <td>
                    <div className="progress" style={{ height: "10px" }}>
                      <div className="progress-bar bg-info" style={{ width: `${entry.score / 3}%` }}></div>
                    </div>
                    <span className="ms-2">{entry.score} pts</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
