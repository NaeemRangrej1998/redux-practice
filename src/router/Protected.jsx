import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import redirectionEnum from "../enums/redirection.enum";
import { useSelector } from "react-redux";

const Protected = ({ children, roles }) => {
    const auth = useSelector((state) => state.auth);
    const location = useLocation();

    const isAuthorized = () => {
        return !roles || roles.length === 0 || roles.includes(auth.role);
    };
    // Check for token first
    if (!auth.token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Then check authorization
    if (!isAuthorized()) {
        return <Navigate to={redirectionEnum[auth?.role] || '/'} />;
    }

    return children;
};

export default Protected;