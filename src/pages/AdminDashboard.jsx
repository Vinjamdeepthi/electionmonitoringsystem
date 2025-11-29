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
      { name: "sravya", age: 32, city: "Hyderabad" },
      { name: "lasya", age: 27, city: "Guntur" },
      { name: "deepthi", age: 76, city: "Vijayawada" },
      { name: "ananya", age: 45, city: "Visakhapatnam" },
      { name: "priya", age: 29, city: "Tirupati" },
      { name: "lakshmi", age: 34, city: "Kurnool" },
      { name: "sindhu", age: 41, city: "Nellore" },
      { name: "radhika", age: 38, city: "Rajahmundry" }
    ],

    candidates: [
      { name: "Arjun Singh", party: "Unity Party", constituency: "North Zone" },
      { name: "Priya Patel", party: "Progressive Front", constituency: "South Zone" },
      { name: "Rohit Kumar", party: "Democratic Alliance", constituency: "East Zone" },
      { name: "Anita Sharma", party: "People's Voice", constituency: "West Zone" },
      { name: "Vikram Reddy", party: "National Reform Party", constituency: "Central Zone" },
      { name: "Sneha Joshi", party: "Unity Party", constituency: "Coastal Zone" },
      { name: "Karan Mehta", party: "Progressive Front", constituency: "Highland Zone" },
      { name: "Neha Verma", party: "Democratic Alliance", constituency: "River Valley Zone" }
    ],

    elections: [
      { title: "General Election 2025", date: "2025-11-20", status: "Scheduled" },
      { title: "Local Election", date: "2025-08-15", status: "Completed" },
      { title: "State Assembly Election", date: "2025-09-10", status: "Ongoing" },
      { title: "Municipal Election", date: "2025-07-05", status: "Completed" },
      { title: "By-Election", date: "2025-10-01", status: "Scheduled" },
      { title: "Panchayat Election", date: "2025-06-20", status: "Completed" },
      { title: "Mayoral Election", date: "2025-12-05", status: "Scheduled" }
    ],
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
              <option value="Ongoing">Ongoing</option>
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
          <button className="add-btn" onClick={() => { setFormData({}); setShowForm(true); setEditIndex(null); }}>
            ➕ Add
          </button>
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

      {/* FULL AB-HOVER UI CSS */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: 'Segoe UI', sans-serif;
          background: #f5f8ff;
        }

        .dashboard-container {
          display: flex;
          height: 100vh;
          background: #f5f8ff;
          color: #333;
        }

        .sidebar {
          width: 250px;
          background: #ffffff;
          border-right: 1px solid #dce3f0;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .sidebar h2 { text-align: center; color: #1e3a8a; }
        .sidebar ul { padding: 0; list-style: none; }

        .sidebar li {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: 0.3s;
          cursor: pointer;
          margin: 5px 0;
          font-size: 15px;
        }

        .sidebar li:hover, .sidebar li.active {
          background: #e8f0ff;
          border: 1px solid #3b82f6;
          color: #1e40af;
        }

        .logout-btn {
          margin-top: 20px;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #ef4444;
          color: white;
          cursor: pointer;
          font-weight: bold;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .add-btn {
          padding: 10px 14px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        th {
          background: #e8f0ff;
          color: #1e3a8a;
          padding: 12px;
          border-bottom: 2px solid #c7d7f5;
        }

        td {
          padding: 10px;
          border-bottom: 1px solid #e0e7f5;
        }

        tr:hover {
          background: #f0f6ff;
        }

        .edit-btn {
          padding: 5px 8px;
          background: #3b82f6;
          border: none;
          border-radius: 6px;
          color: white;
          margin-right: 5px;
        }

        .delete-btn {
          padding: 5px 8px;
          background: #ef4444;
          border: none;
          border-radius: 6px;
          color: white;
        }

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
          padding: 25px;
          border-radius: 12px;
          width: 320px;
          border: 1px solid #dce3f0;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 8px;
          border: 1px solid #bfc9dd;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 3px #93b5ff;
        }

        .popup-actions {
          display: flex;
          gap: 10px;
        }

        .btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .btn.cancel {
          background: #9ca3af;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
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
