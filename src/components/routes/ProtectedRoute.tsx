import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole, UserApprovalStatus } from '../types';
import { SplashLoader } from './common/SplashLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: UserRole;
  requiredStatus?: UserApprovalStatus;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role: expectedRole,
  requiredStatus
}) => {
  const { user, role: userRole, status: userStatus, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SplashLoader />;
  }

  // 1. Not authenticated -> Redirect to /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role mismatch -> Redirect to user's authorized role dashboard
  if (userRole !== expectedRole) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    if (userRole === 'vendor') {
      if (userStatus === 'pending_approval') {
        return <Navigate to="/vendor/pending" replace />;
      }
      return <Navigate to="/vendor" replace />;
    }
    return <Navigate to="/pilgrim" replace />;
  }

  // 3. Vendor status check: if vendor is pending approval and tries to visit /vendor (main dashboard),
  // redirect to /vendor/pending. If vendor is approved and visits /vendor/pending, redirect to /vendor.
  if (expectedRole === 'vendor') {
    if (requiredStatus === 'approved' && userStatus === 'pending_approval') {
      return <Navigate to="/vendor/pending" replace />;
    }
    if (requiredStatus === 'pending_approval' && userStatus === 'approved') {
      return <Navigate to="/vendor" replace />;
    }
  }

  return <>{children}</>;
};
