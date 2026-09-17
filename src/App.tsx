import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/common/Toast';

// Loaders & Route Wrappers
import { SplashLoader } from './components/common/SplashLoader';
import { PublicOnlyRoute } from './components/routes/PublicOnlyRoute';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

// Standalone Public Login Flow (Screens 1, 2, 3 - Decoupled from app shell)
import { LoginFlow } from './components/auth/LoginFlow';

// Protected App Shells (Screen 4 Post-Login Routing)
import { PilgrimAppShell } from './components/pilgrim/PilgrimAppShell';
import { VendorAppShell } from './components/vendor/VendorAppShell';
import { VendorUnderReview } from './components/vendor/VendorUnderReview';
import { AdminAppShell } from './components/admin/AdminAppShell';

/**
 * Root Router Component
 * Evaluates Firebase onAuthStateChanged and routes:
 * / → SplashLoader (checks auth state and redirects)
 * /login → Standalone LoginFlow (Public Only)
 * /pilgrim/* → Pilgrim App Shell (Protected, role: pilgrim)
 * /vendor/* → Vendor App Shell (Protected, role: vendor, status: approved)
 * /vendor/pending → "Under review" screen (Protected, role: vendor, status: pending_approval)
 * /admin/* → Admin App Shell (Protected, role: admin)
 */
const AppRouter: React.FC = () => {
  const { user, role, status, loading } = useAuth();
  const { currentUser, loginWithProfile } = useApp();

  // Sync Firebase user state into AppContext if needed
  React.useEffect(() => {
    if (user && role) {
      if (!currentUser || currentUser.id !== user.uid || currentUser.role !== role) {
        loginWithProfile({
          id: user.uid,
          role,
          phone: user.phoneNumber || currentUser?.phone || '9876543210',
          email: user.email || currentUser?.email,
          name: currentUser?.name || (role === 'pilgrim' ? 'Yatri Devotee' : role === 'vendor' ? 'Santosh Joshi' : 'Control Room Admin'),
          status: status || 'approved'
        });
      }
    }
  }, [user, role, status]);

  if (loading) {
    return <SplashLoader />;
  }

  // Root path '/' resolver: checks auth state and routes immediately
  const getRootRedirect = () => {
    if (!user) {
      return '/login';
    }
    if (role === 'admin') {
      return '/admin';
    }
    if (role === 'vendor') {
      return status === 'pending_approval' ? '/vendor/pending' : '/vendor';
    }
    return '/pilgrim';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      <Routes>
        {/* / → SplashLoader checks auth state and routes */}
        <Route path="/" element={<Navigate to={getRootRedirect()} replace />} />

        {/* /login → Standalone LoginFlow (PUBLIC ONLY: auto-redirects if already authenticated) */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginFlow />
            </PublicOnlyRoute>
          }
        />

        {/* /pilgrim/* → Pilgrim App Shell (PROTECTED, role: pilgrim) */}
        <Route
          path="/pilgrim/*"
          element={
            <ProtectedRoute role="pilgrim">
              <PilgrimAppShell />
            </ProtectedRoute>
          }
        />

        {/* /vendor/pending → Under review screen (PROTECTED, role: vendor, status: pending_approval) */}
        <Route
          path="/vendor/pending"
          element={
            <ProtectedRoute role="vendor" requiredStatus="pending_approval">
              <VendorUnderReview />
            </ProtectedRoute>
          }
        />

        {/* /vendor/* → Vendor App Shell (PROTECTED, role: vendor, status: approved) */}
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute role="vendor" requiredStatus="approved">
              <VendorAppShell />
            </ProtectedRoute>
          }
        />

        {/* /admin/* → Admin App Shell (PROTECTED, role: admin) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminAppShell />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route -> redirect to root resolver */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global floating alerts / toasts */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
