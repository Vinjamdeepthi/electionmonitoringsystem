import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CitizenDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Initial state (no hardcoded data)
  const [votingDetails, setVotingDetails] = useState({
    proofId: "",
    location: "",
    time: "",
    voted: false,
  });

  const [timeRemaining, setTimeRemaining] = useState("");

  // Countdown timer effect
  useEffect(() => {
    if (!votingDetails.time) return;
    const interval = setInterval(() => {
      const now = new Date();
      const voteTime = new Date(votingDetails.time);
      const diff = voteTime - now;

      if (diff <= 0) {
        setTimeRemaining("Voting time started or ended.");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [votingDetails.time]);

  // CRUD functions
  const handleCreate = (e) => {
    e.preventDefault();
    if (!votingDetails.proofId || !votingDetails.location || !votingDetails.time) {
      alert("Please fill all fields before saving.");
      return;
    }
    alert("Voting details added successfully!");
  };

  const handleUpdate = () => {
    const field = prompt("What do you want to update? (proof/location/time)");
    if (!field) return;

    const newValue = prompt(`Enter new ${field}:`);
    if (newValue) {
      setVotingDetails({ ...votingDetails, [field]: newValue });
      alert(`${field} updated successfully!`);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all voting details?")) {
      setVotingDetails({ proofId: "", location: "", time: "", voted: false });
    }
  };

  const toggleVoteStatus = () => {
    setVotingDetails({ ...votingDetails, voted: !votingDetails.voted });
  };

  return (
    <div className="page-background">
      <div className="card">
        <h1 className="title">👤 Citizen Dashboard</h1>
        <p className="subtitle">Welcome, {user?.username}!</p>

        {/* Info Section */}
        <div className="info-section">
          <h3>📄 Proof ID:</h3>
          <p>{votingDetails.proofId || "Not added"}</p>

          <h3>📍 Location:</h3>
          <p>{votingDetails.location || "Not added"}</p>

          <h3>🕒 Voting Time:</h3>
          <p>{votingDetails.time ? new Date(votingDetails.time).toLocaleString() : "Not set"}</p>

          <h3>⏰ Time Remaining:</h3>
          <p>{timeRemaining || "No time selected"}</p>

          <h3>✅ Voting Status:</h3>
          <p className={`status ${votingDetails.voted ? "done" : "pending"}`}>
            {votingDetails.voted ? "Voted" : "Not yet voted"}
          </p>
        </div>

        {/* CRUD Section */}
        <form className="crud-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Enter Proof ID"
            value={votingDetails.proofId}
            onChange={(e) => setVotingDetails({ ...votingDetails, proofId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter Voting Location"
            value={votingDetails.location}
            onChange={(e) => setVotingDetails({ ...votingDetails, location: e.target.value })}
          />
          <input
            type="datetime-local"
            value={votingDetails.time}
            onChange={(e) => setVotingDetails({ ...votingDetails, time: e.target.value })}
          />
          <button type="submit" className="btn">💾 Save</button>
        </form>

        <div className="crud-options">
          <button className="btn" onClick={handleUpdate}>✏️ Update</button>
          <button className="btn danger" onClick={handleDelete}>🗑️ Delete</button>
          <button className="btn success" onClick={toggleVoteStatus}>
            {votingDetails.voted ? "Undo Vote" : "Mark as Voted"}
          </button>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="btn logout"
        >
          Logout
        </button>
      </div>

      <style>{`
        .page-background {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg,#1a2a6c,#b21f1f,#fdbb2d);
          background-size: 300% 300%;
          animation: gradientShift 12s ease infinite;
        }

        @keyframes gradientShift {
          0% {background-position:0% 50%}
          50% {background-position:100% 50%}
          100% {background-position:0% 50%}
        }

        .card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 16px;
          color: white;
          text-align: center;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        }

        .title {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .info-section {
          text-align: left;
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 25px;
        }

        .status.done { color: #4ade80; font-weight: bold; }
        .status.pending { color: #f87171; font-weight: bold; }

        .crud-form input {
          width: 100%;
          padding: 10px;
          margin: 6px 0;
          border: none;
          border-radius: 8px;
          background: rgba(255,255,255,0.2);
          color: white;
          font-size: 1rem;
          outline: none;
        }

        .crud-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(90deg,#ff416c,#ff4b2b);
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .btn.danger {
          background: linear-gradient(90deg, #ff4b2b, #c31432);
        }

        .btn.success {
          background: linear-gradient(90deg, #00b09b, #96c93d);
        }

        .btn.logout {
          margin-top: 15px;
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}

export default CitizenDashboard;
