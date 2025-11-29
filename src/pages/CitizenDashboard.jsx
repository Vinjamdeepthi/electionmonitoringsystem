import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CitizenDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [votingDetails, setVotingDetails] = useState({
    proofId: "",
    location: "",
    time: "",
    voted: false,
  });

  const [timeRemaining, setTimeRemaining] = useState("");

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
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [votingDetails.time]);

  const handleCreate = (e) => {
    e.preventDefault();
    const { proofId, location, time } = votingDetails;

    if (!proofId || !location || !time) {
      alert("Please fill all fields before saving.");
      return;
    }

    alert("Voting details added successfully!");
  };

  const handleUpdate = () => {
    const field = prompt("What do you want to update? (proof/location/time)");
    if (!field) return;

    const keyMap = { proof: "proofId", location: "location", time: "time" };
    if (!keyMap[field]) {
      alert("Invalid field. Use: proof, location, or time.");
      return;
    }

    const newValue = prompt(`Enter new ${field}:`);
    if (!newValue) return;

    setVotingDetails({ ...votingDetails, [keyMap[field]]: newValue });

    alert(`${field} updated successfully!`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all details?")) {
      setVotingDetails({ proofId: "", location: "", time: "", voted: false });
      setTimeRemaining("");
    }
  };

  const toggleVoteStatus = () =>
    setVotingDetails({ ...votingDetails, voted: !votingDetails.voted });

  return (
    <div className="page-background">
      <div className="card">
        <h1 className="title">Citizen Dashboard</h1>
        <p className="subtitle">Welcome, {user?.username}!</p>

        <div className="info-section">
          <h3>Proof ID:</h3>
          <p>{votingDetails.proofId || "Not added"}</p>

          <h3>Location:</h3>
          <p>{votingDetails.location || "Not added"}</p>

          <h3>Voting Time:</h3>
          <p>
            {votingDetails.time
              ? new Date(votingDetails.time).toLocaleString()
              : "Not set"}
          </p>

          <h3>Time Remaining:</h3>
          <p>{timeRemaining || "No time selected"}</p>

          <h3>Voting Status:</h3>
          <p className={`status ${votingDetails.voted ? "done" : "pending"}`}>
            {votingDetails.voted ? "Voted" : "Not yet voted"}
          </p>
        </div>

        <form className="crud-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Enter Proof ID"
            value={votingDetails.proofId}
            onChange={(e) =>
              setVotingDetails({ ...votingDetails, proofId: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Enter Voting Location"
            value={votingDetails.location}
            onChange={(e) =>
              setVotingDetails({ ...votingDetails, location: e.target.value })
            }
          />

          <input
            type="datetime-local"
            value={votingDetails.time}
            onChange={(e) =>
              setVotingDetails({ ...votingDetails, time: e.target.value })
            }
          />

          <button type="submit" className="btn primary">
            Save Details
          </button>
        </form>

        <div className="crud-options">
          <button className="btn secondary" onClick={handleUpdate}>
            Update
          </button>

          <button className="btn danger" onClick={handleDelete}>
            Delete
          </button>

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
          background: #f2f5ff;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 14px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          border: 1px solid #d3ddf5;
        }

        .title {
          text-align: center;
          color: #1d4ed8;
          margin-bottom: 5px;
        }

        .subtitle {
          text-align: center;
          color: #475569;
        }

        .info-section {
          background: #f8faff;
          border: 1px solid #c7d2fe;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 25px;
        }

        .info-section h3 {
          margin: 8px 0 2px;
          color: #1e3a8a;
        }

        .status.done {
          color: green;
          font-weight: bold;
        }

        .status.pending {
          color: red;
          font-weight: bold;
        }

        
          .crud-form input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #b7c5e8;
  background: white;
  color: #000 !important; /* <-- FIXED (text will now be black) */
}

.crud-form input::placeholder {
  color: #000 !important; /* optional: makes placeholder black */
}


        .crud-form input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 4px #a5c4ff;
        }

        .crud-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.25s;
        }

        .btn.primary { background: #2563eb; color: white; }
        .btn.primary:hover { background: #1e40af; }

        .btn.secondary { background: #f5d016ff; }
        .btn.secondary:hover { background: #f5d016ff; }

        .btn.success { background: #10b981; color: white; }
        .btn.success:hover { background: #059669; }

        .btn.danger { background: #ef4444; color: white; }
        .btn.danger:hover { background: #dc2626; }

        .btn.logout {
          margin-top: 15px;
          background: #475569;
          color: white;
        }
        .btn.logout:hover { background: #334155; }
      `}</style>
    </div>
  );
}

export default CitizenDashboard;
