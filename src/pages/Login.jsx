import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Citizen");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password, role);
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
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f0f4f8; /* Light blue background similar to ECI portal */
        }

        .card {
          background: #ffffff; /* White card */
          padding: 40px;
          border-radius: 16px;
          color: #1a1a1a;
          text-align: center;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .title {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #2a2a2a;
        }

        input, select {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #c1c1c1;
          border-radius: 8px;
          background: #f9f9f9;
          color: #1a1a1a;
          font-size: 1rem;
          outline: none;
        }

        input::placeholder {
          color: #a0a0a0;
        }

        .btn {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border: none;
          border-radius: 8px;
          background: #004aad; /* ECI blue */
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          background: #002f70;
          transform: scale(1.03);
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
