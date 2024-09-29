// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

type ProtectedRouteProps = {
    component: React.FC;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, allowedRoles }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const getUserRole = useAuthStore((state) => state.getUserRole);
    const userRole = getUserRole();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Component />;;
};

export default ProtectedRoute;
