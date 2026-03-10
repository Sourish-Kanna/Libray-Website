import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from './Store/userAuth.store';
import { frontendLogger, generateActionId } from './utils/logger.js';

const ProtectedRoute = ({ children }) => {
    const actionId = generateActionId("ROUTE_GUARD");
    const start = Date.now();
    frontendLogger.info({ screenOrStore: "ProtectedRoute", action: "ROUTE_GUARD", step: "START", status: "STARTED", actionId, message: `[ROUTE_GUARD] START STARTED` });
    
    // Check your auth store state
    const { isAuthenticated } = useAuthStore();

    // If not logged in, redirect to Login page
    if (!isAuthenticated) {
        frontendLogger.warn({ screenOrStore: "ProtectedRoute", action: "ROUTE_GUARD", step: "ROUTE_GUARD", status: "FAILURE", actionId, errorCode: "UNAUTHORIZED", errorMessage: "User not authenticated", durationMs: Date.now() - start, message: `[ROUTE_GUARD] ROUTE_GUARD FAILURE` });
        return <Navigate to="/login" replace />;
    }

    // If logged in, show the protected page
    frontendLogger.info({ screenOrStore: "ProtectedRoute", action: "ROUTE_GUARD", step: "ROUTE_GUARD", status: "SUCCESS", actionId, durationMs: Date.now() - start, message: `[ROUTE_GUARD] ROUTE_GUARD SUCCESS` });
    return children;
};

export default ProtectedRoute;