import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
