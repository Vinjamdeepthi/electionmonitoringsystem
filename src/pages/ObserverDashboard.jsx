import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ObserverDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [candidates] = useState([
    { name: "Arjun Singh", party: "Unity Party", constituency: "North Zone" },
    { name: "Priya Patel", party: "Progressive Front", constituency: "South Zone" },
  ]);

  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updatedReports = [...reports];
    if (editIndex !== null) {
      updatedReports[editIndex] = formData;
    } else {
      updatedReports.push(formData);
    }
    setReports(updatedReports);
    setFormData({});
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(reports[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedReports = [...reports];
    updatedReports.splice(index, 1);
    setReports(updatedReports);
  };

  return (
    <div className="observer-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🔍 Observer Panel</h2>
        <p className="user">👋 {user?.username || "Observer"}</p>
        <ul>
          <li>📋 Monitor Activities</li>
          <li>⚠️ Report Anomalies</li>
          <li>📢 Transparency Insights</li>
        </ul>
        <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Candidate Reports</h1>
        <button className="add-btn" onClick={() => { setFormData({}); setEditIndex(null); setShowForm(true); }}>➕ Add Report</button>

        <div className="candidate-list">
          {candidates.map((c, idx) => (
            <div key={idx} className="candidate-card">
              <h3>{c.name}</h3>
              <p>Party: {c.party}</p>
              <p>Constituency: {c.constituency}</p>
            </div>
          ))}
        </div>

        <h2>Submitted Reports</h2>
        {reports.length === 0 ? <p>No reports submitted.</p> : (
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Issue</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.candidate}</td>
                  <td>{r.issue}</td>
                  <td>{r.details}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(idx)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(idx)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup">
          <div className="popup-card">
            <h3>{editIndex !== null ? "Edit" : "Add"} Report</h3>
            <select name="candidate" value={formData.candidate || ""} onChange={handleChange}>
              <option value="">Select Candidate</option>
              {candidates.map((c, idx) => (
                <option key={idx} value={c.name}>{c.name}</option>
              ))}
            </select>
            <input name="issue" placeholder="Issue" value={formData.issue || ""} onChange={handleChange} />
            <textarea name="details" placeholder="Details" value={formData.details || ""} onChange={handleChange} rows="4" />
            <div className="popup-actions">
              <button className="btn" onClick={handleSave}>💾 Save</button>
              <button className="btn cancel" onClick={() => setShowForm(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: 'Segoe UI', sans-serif;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .observer-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg,#1a2a6c,#b21f1f,#fdbb2d);
          background-size: 300% 300%;
          animation: gradientShift 12s ease infinite;
          color: white;
        }

        @keyframes gradientShift {
          0% { background-position:0% 50% }
          50% { background-position:100% 50% }
          100% { background-position:0% 50% }
        }

        .sidebar {
          width: 250px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar h2 { text-align: center; margin-bottom: 20px; }
        .sidebar ul { list-style: none; padding: 0; }
        .sidebar li {
          padding: 12px; margin: 8px 0; border-radius: 8px; cursor: default;
          background: rgba(255,255,255,0.1);
        }

        .logout-btn {
          background: linear-gradient(90deg,#ff416c,#ff4b2b);
          border: none;
          padding: 10px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          margin-top: 20px;
        }

        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .add-btn {
          background: #00c851;
          border: none;
          padding: 10px 14px;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .candidate-list {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .candidate-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 12px;
          width: 220px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding: 10px;
          text-align: left;
        }

        .edit-btn {
          background: #33b5e5;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          color: white;
          margin-right: 5px;
        }

        .delete-btn {
          background: #ff4444;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          color: white;
        }

        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .popup-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 12px;
          color: white;
          width: 320px;
          border: none;
        }

        textarea {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: none;
          border-radius: 8px;
          background: rgba(255,255,255,0.2);
          color: white;
          resize: none;
        }

        .popup-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(90deg,#ff416c,#ff4b2b);
          font-weight: bold;
          color: white;
          cursor: pointer;
        }

        .btn.cancel {
          background: #888;
        }

        @media (max-width: 768px) {
          .observer-container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          }

          .main-content {
            padding: 20px;
          }

          .candidate-list {
            flex-direction: column;
            gap: 15px;
          }

          .popup-card {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}

export default ObserverDashboard;
