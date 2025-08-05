import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('lawyerup_token');
    const user = JSON.parse(localStorage.getItem('lawyerup_user'));

    // Only allow if token exists AND role is 'admin'
    if (token && user?.role === 'admin') {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
