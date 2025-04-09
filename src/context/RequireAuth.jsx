import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

// This component checks if the user is authenticated and has the required role to access a route
// If the user is not authenticated, it redirects to the login page
const RequireAuth = ({ children }) => {
    const { user } = useAuth();

    // Check if the user is authenticated and has the required role
    // If not, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check if the user has the required role (if any)
    if(role && user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RequireAuth;