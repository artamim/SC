import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ProtectedRoutes = () => {
  const [curUser, setCurUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setCurUser(response.data);
      } catch {
        setCurUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axiosInstance.get("/user");
        setCurUser(response.data);
      } catch {
        setCurUser(null);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return curUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
