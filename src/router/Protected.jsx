import React from 'react';
import { Navigate } from 'react-router-dom';
import redirectionEnum from "../enums/redirection.enum";
import { useSelector } from "react-redux";

const Protected = ({ children, roles }) => {
    const auth = useSelector((state) => state.auth);

    const isAuthorized = () => {
        // Check if roles is undefined or empty, or if user's role is included
        return !roles || roles.length === 0 || roles.includes(auth.role);
    };

    if (!auth.token) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    if (!isAuthorized()) {
        // If authenticated but not authorized, redirect to appropriate role-based route
        return <Navigate to={redirectionEnum[auth?.role] || '/'} />;
    }

    return children;
};

export default Protected;