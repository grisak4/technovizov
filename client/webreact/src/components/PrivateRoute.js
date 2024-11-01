import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  let userRole;

  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
