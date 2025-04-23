import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
