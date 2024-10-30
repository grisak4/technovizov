import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRedirect = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />;
};

export default AuthRedirect;
