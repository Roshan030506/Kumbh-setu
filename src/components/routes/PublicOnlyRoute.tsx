import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SplashLoader } from './common/SplashLoader';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { user, role, status, loading } = useAuth();

  if (loading) {
    return <SplashLoader />;
  }

  // If already authenticated, redirect straight to role-specific dashboard
  if (user) {
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    if (role === 'vendor') {
      if (status === 'pending_approval') {
        return <Navigate to="/vendor/pending" replace />;
      }
      return <Navigate to="/vendor" replace />;
    }
    // Default pilgrim
    return <Navigate to="/pilgrim" replace />;
  }

  return <>{children}</>;
};
