import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // ✅ added password state
  const [role, setRole] = useState("Citizen");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password, role); // ✅ pass password
    if (success) {
      navigate(`/${role.toLowerCase()}`);
    }
  };

  return (
    <div className="page-background">
      <div className="card">
        <h2 className="title">🗳️ Election Monitoring System</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Citizen">Citizen</option>
            <option value="Observer">Observer</option>
            
          </select>

          <button type="submit" className="btn">🚀 Login</button>
        </form>

        <p className="footer">"Empowering Democracy with Technology"</p>
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

export default Login;
