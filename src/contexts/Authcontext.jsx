import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedUser && loggedIn) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("userProfile", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userProfile");
    localStorage.removeItem("isLoggedIn");
  };

  const updateProfile = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("userProfile", JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
