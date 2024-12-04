import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user }) => {
  console.log(`User Name: ${user}`)
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;