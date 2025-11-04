import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";
import ObserverDashboard from "./pages/ObserverDashboard";


// Protect routes by role
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  return user && user.role === role ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Register & Login */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Role Dashboards */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/citizen"
            element={
              <PrivateRoute role="Citizen">
                <CitizenDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/observer"
            element={
              <PrivateRoute role="Observer">
                <ObserverDashboard />
              </PrivateRoute>
            }
          />
          

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
