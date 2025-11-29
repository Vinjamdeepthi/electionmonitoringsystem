import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Citizen");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(username, password, role);
    if (success) {
      navigate("/login");
    }
  };

  return (
  <div className="page-background">

      {/* 🔵 ADDED TITLE HERE */}
      <h1 className="main-heading">Election Monitoring System</h1>

    <div className="card">
      <h2 className="title">📝 Register</h2>
      <p className="subtitle">Create your account to join the system</p>

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

        <button type="submit" className="btn">Register</button>
      </form>

      <p className="footer">
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>

    <style>{`
      .page-background {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f0f4f8;
      }

      /* 🔵 Added CSS for main heading */
      .main-heading {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: #004aad; /* ECI blue */
        text-align: center;
      }

      .card {
        background: #ffffff;
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
        margin-bottom: 10px;
        color: #2a2a2a;
      }

      .subtitle {
        font-size: 0.95rem;
        margin-bottom: 20px;
        color: #555;
      }

      input, select {
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        border: 1px solid #c1c1c1;
        border-radius: 8px;
        background: #fafafa;
        color: #1a1a1a;
        font-size: 1rem;
        outline: none;
      }

      input::placeholder {
        color: #999;
      }

      .btn {
        width: 100%;
        padding: 12px;
        margin-top: 12px;
        border: none;
        border-radius: 8px;
        background: #004aad;
        font-weight: bold;
        color: white;
        cursor: pointer;
        transition: 0.3s;
      }

      .btn:hover {
        background: #00357a;
        transform: scale(1.03);
      }

      .footer {
        margin-top: 20px;
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .link {
        color: #004aad;
        cursor: pointer;
        font-weight: bold;
      }

      .link:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
);

};

export default Register;
