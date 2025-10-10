import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CitizenDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-background">
      <div className="card">
        <h1 className="title">👤 Citizen Dashboard</h1>
        <p className="subtitle">Welcome, {user?.username}!</p>

        <div className="options">
          <div className="option-card">📊 Track Election Process</div>
          <div className="option-card">📝 Report Issues</div>
          <div className="option-card">💬 Civic Discussions</div>
        </div>

        <button onClick={() => { logout(); navigate("/login"); }} className="btn">
          Logout
        </button>
      </div>
<style>{`
  .page-background {
    min-height: 100vh;
    width: 100vw; /* take full width */
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
    max-width: 400px; /* box stays centered */
    box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  input, select {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: none;
    border-radius: 8px;
    background: rgba(255,255,255,0.2);
    color: white;
    font-size: 1rem;
    outline: none;
  }
  input::placeholder {
    color: rgba(255,255,255,0.6);
  }

  .btn {
    width: 100%;
    padding: 12px;
    margin-top: 12px;
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

  .footer {
    margin-top: 20px;
    font-size: 0.9rem;
    opacity: 0.8;
    font-style: italic;
  }
`}</style>

    </div>
  );
}

export default CitizenDashboard;
