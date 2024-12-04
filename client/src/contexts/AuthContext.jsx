// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      // Send login data to the backend
      const response = await axiosInstance.post("/login", credentials);

      // On successful login, update the user state immediately
      setUser(response.data); // Assuming response.data contains user info

      // Optional: You could also store the token in localStorage or cookies here
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
