import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Registered users
  const [user, setUser] = useState(null); // Logged in user

  // Register user
  const register = (username, password, role) => {
    const exists = users.find((u) => u.username === username);
    if (exists) {
      alert("⚠️ Username already exists!");
      return false;
    }
    const newUser = { username, password, role };
    setUsers([...users, newUser]);
    alert("✅ Registration successful! Please login.");
    return true;
  };

  // Login
  const login = (username, password, role) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    } else {
      alert("❌ Invalid username, password, or role!");
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
