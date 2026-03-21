import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from './Store/userAuth.store';

const ProtectedRoute = ({ children }) => {
    // Check your auth store state
    const { isAuthenticated } = useAuthStore();

    // If not logged in, redirect to Login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, show the protected page
    return children;
};

export default ProtectedRoute;