import React, { createContext, useContext, useState } from 'react';

// This context is used to manage the authentication state of the user
// and provide authentication-related functions to the components in the application.
const AuthContext = createContext();

// This component provides the authentication context to its children
// and manages the authentication state of the user.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    // This function is used to log in the user by setting the user state with the provided user data
    // and storing any user-related data in local storage or session storage.   
    const login = (userData) => {
        setUser(userData);
    };
    
    // This function is used to log out the user by setting the user state to null
    // and clearing any user-related data from local storage or session storage.
    const logout = () => {
        setUser(null);
    };
    
    // This function checks if the user is logged in or not
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    // This hook allows you to access the auth context in any component
    // without needing to wrap it in the AuthProvider again.
export const useAuth = () => {
    return useContext(AuthContext);
    }