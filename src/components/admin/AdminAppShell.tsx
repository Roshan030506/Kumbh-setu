import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../common/Header';
import { Navigation } from '../common/Navigation';
import { useApp } from '../../context/AppContext';

import { AdminAnalytics } from './AdminAnalytics';
import { VendorVerificationQueue } from './VendorVerificationQueue';
import { CrowdMonitoringMap } from './CrowdMonitoringMap';
import { LiveAlertsPanel } from './LiveAlertsPanel';

export const AdminAppShell: React.FC = () => {
  const { adminScreen } = useApp();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* App Shell Header with Command status & Logout */}
      <Header />

      {/* Main Body View Area */}
      <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<AdminAnalytics />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/dashboard" element={<AdminAnalytics />} />
          <Route path="/queue" element={<VendorVerificationQueue />} />
          <Route path="/crowd" element={<CrowdMonitoringMap />} />
          <Route path="/alerts" element={<LiveAlertsPanel />} />
          <Route path="*" element={
            <>
              {(adminScreen === 'analytics' || adminScreen === 'dashboard') && <AdminAnalytics />}
              {adminScreen === 'vendor_queue' && <VendorVerificationQueue />}
              {adminScreen === 'crowd_map' && <CrowdMonitoringMap />}
              {(adminScreen === 'alerts' || adminScreen === 'live_alerts') && <LiveAlertsPanel />}
            </>
          } />
        </Routes>
      </main>

      {/* Command Navigation */}
      <Navigation />
    </div>
  );
};
