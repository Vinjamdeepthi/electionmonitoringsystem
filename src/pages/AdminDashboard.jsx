import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("citizens");
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const [data, setData] = useState({
    citizens: [
      { name: "Ravi Kumar", age: 32, city: "Hyderabad" },
      { name: "Sneha Reddy", age: 27, city: "Guntur" },
      { name: "deepthi", age: 76, city: "vijayawada" },
    ],
    candidates: [
      { name: "Arjun Singh", party: "Unity Party", constituency: "North Zone" },
      { name: "Priya Patel", party: "Progressive Front", constituency: "South Zone" },
    ],
    elections: [
      { title: "General Election 2025", date: "2025-11-20", status: "Scheduled" },
      { title: "Local Election", date: "2025-08-15", status: "Completed" },
    ],
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    const newData = { ...data };
    if (editIndex !== null) {
      newData[activeSection][editIndex] = formData;
    } else {
      newData[activeSection].push(formData);
    }
    setData(newData);
    setShowForm(false);
    setEditIndex(null);
    setFormData({});
  };

  const handleDelete = (index) => {
    const newData = { ...data };
    newData[activeSection].splice(index, 1);
    setData(newData);
  };

  const renderFormFields = () => {
    switch (activeSection) {
      case "citizens":
        return (
          <>
            <input name="name" placeholder="Name" value={formData.name || ""} onChange={handleChange} />
            <input name="age" placeholder="Age" value={formData.age || ""} onChange={handleChange} />
            <input name="city" placeholder="City" value={formData.city || ""} onChange={handleChange} />
          </>
        );
      case "candidates":
        return (
          <>
            <input name="name" placeholder="Name" value={formData.name || ""} onChange={handleChange} />
            <input name="party" placeholder="Party" value={formData.party || ""} onChange={handleChange} />
            <input name="constituency" placeholder="Constituency" value={formData.constituency || ""} onChange={handleChange} />
          </>
        );
      case "elections":
        return (
          <>
            <input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} />
            <input type="date" name="date" value={formData.date || ""} onChange={handleChange} />
            <select name="status" value={formData.status || ""} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    const items = data[activeSection];
    if (!items?.length) return <p>No records found.</p>;

    const keys = Object.keys(items[0]);
    return (
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <button className="edit-btn" onClick={() => { setFormData(item); setEditIndex(idx); setShowForm(true); }}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(idx)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🛠️ Admin Panel</h2>
        <p className="user">👋 {user?.username || "Admin"}</p>
        <ul>
          <li onClick={() => setActiveSection("citizens")} className={activeSection === "citizens" ? "active" : ""}>👥 Citizens</li>
          <li onClick={() => setActiveSection("candidates")} className={activeSection === "candidates" ? "active" : ""}>🎯 Candidates</li>
          <li onClick={() => setActiveSection("elections")} className={activeSection === "elections" ? "active" : ""}>🗳️ Elections</li>
        </ul>
        <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>{activeSection.toUpperCase()}</h2>
          <button className="add-btn" onClick={() => { setFormData({}); setShowForm(true); setEditIndex(null); }}>➕ Add</button>
        </div>
        <div className="table-container">{renderTable()}</div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup">
          <div className="popup-card">
            <h3>{editIndex !== null ? "Edit" : "Add"} {activeSection}</h3>
            {renderFormFields()}
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

        .dashboard-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
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
          padding: 12px; margin: 8px 0; border-radius: 8px; cursor: pointer; transition: 0.3s;
        }
        .sidebar li:hover, .sidebar li.active { background: rgba(255,255,255,0.3); }
        .logout-btn { background: linear-gradient(90deg,#ff416c,#ff4b2b); border: none; padding: 10px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; width: 100%; margin-top: 20px; }

        .main-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border-bottom: 1px solid rgba(255,255,255,0.
                  th, td {
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding: 10px;
          text-align: left;
        }

        .add-btn {
          background: #00c851;
          border: none;
          padding: 10px 14px;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          font-weight: bold;
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
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: none;
          border-radius: 8px;
          background: rgba(255,255,255,0.2);
          color: white;
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
          .dashboard-container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          }

          .main-content {
            padding: 10px;
          }

          .popup-card {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
