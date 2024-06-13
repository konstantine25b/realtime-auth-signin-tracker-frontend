import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || "");
  const navigate = useNavigate();

  const logIn = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      navigate("/dashboard");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
