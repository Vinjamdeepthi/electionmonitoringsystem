import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ObserverDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [candidates] = useState([
    { name: "Deepthi", party: "Unity Party", constituency: "North Zone" },
    { name: "Lasya", party: "Progressive Front", constituency: "South Zone" },
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
          
        </ul>
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Candidate Reports</h1>

        <button
          className="add-btn"
          onClick={() => {
            setFormData({});
            setEditIndex(null);
            setShowForm(true);
          }}
        >
          ➕ Add Report
        </button>

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
        {reports.length === 0 ? (
          <p>No reports submitted.</p>
        ) : (
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
                    <button className="edit-btn" onClick={() => handleEdit(idx)}>
                      ✏️
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(idx)}>
                      🗑️
                    </button>
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
                <option key={idx} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              name="issue"
              placeholder="Issue"
              value={formData.issue || ""}
              onChange={handleChange}
            />
            <textarea
              name="details"
              placeholder="Details"
              value={formData.details || ""}
              onChange={handleChange}
              rows="4"
            />
            <div className="popup-actions">
              <button className="btn" onClick={handleSave}>
                💾 Save
              </button>
              <button className="btn cancel" onClick={() => setShowForm(false)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Updated ECI Theme Styles --- */}
      <style>{`
        .observer-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: #f0f4f8;
          color: #1a1a1a;
        }

        /* Sidebar */
        .sidebar {
          width: 250px;
          background: #ffffff;
          padding: 20px;
          border-right: 2px solid #dce3eb;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar h2 {
          color: #004aad;
          text-align: center;
          margin-bottom: 20px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          padding: 12px;
          margin: 8px 0;
          border-radius: 8px;
          background: #eef4ff;
          color: #00367a;
          font-weight: 500;
        }

        .logout-btn {
          background: #d9534f;
          border: none;
          padding: 10px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        }

        /* Main content */
        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .add-btn {
          background: #004aad;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          font-weight: bold;
          margin-bottom: 20px;
        }

        /* Cards */
        .candidate-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          width: 220px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #e0e0e0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        th, td {
          border-bottom: 1px solid #ddd;
          padding: 10px;
        }

        th {
          background: #004aad;
          color: white;
        }

        .edit-btn {
          background: #007bff;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          color: white;
          margin-right: 5px;
        }

        .delete-btn {
          background: #d9534f;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          color: white;
        }

        /* Popup */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          width: 340px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .popup-card select,
        .popup-card input,
        .popup-card textarea {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #c1c1c1;
          border-radius: 8px;
        }

        .popup-actions {
          display: flex;
          gap: 12px;
        }

        .btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #004aad;
          font-weight: bold;
          color: white;
          cursor: pointer;
        }

        .btn.cancel {
          background: #888;
        }
      `}</style>
    </div>
  );
}

export default ObserverDashboard;
