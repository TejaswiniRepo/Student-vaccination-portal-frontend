// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored === "true") setAuthenticated(true);
  }, []);

  const login = () => {
    localStorage.setItem("auth", "true");
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
