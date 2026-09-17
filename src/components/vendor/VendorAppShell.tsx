import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../common/Header';
import { Navigation } from '../common/Navigation';
import { useApp } from '../../context/AppContext';

import { VendorDashboard } from './VendorDashboard';
import { VendorRegistration } from './VendorRegistration';
import { CertificateOcrUpload } from './CertificateOcrUpload';
import { VendorAvailability } from './VendorAvailability';

export const VendorAppShell: React.FC = () => {
  const { vendorScreen } = useApp();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* App Shell Header with Logout */}
      <Header />

      {/* Main Body View Area */}
      <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<VendorDashboard />} />
          <Route path="/dashboard" element={<VendorDashboard />} />
          <Route path="/registration" element={<VendorRegistration />} />
          <Route path="/certificate" element={<CertificateOcrUpload />} />
          <Route path="/availability" element={<VendorAvailability />} />
          <Route path="*" element={
            <>
              {vendorScreen === 'dashboard' && <VendorDashboard />}
              {vendorScreen === 'registration' && <VendorRegistration />}
              {vendorScreen === 'certificate' && <CertificateOcrUpload />}
              {vendorScreen === 'availability' && <VendorAvailability />}
            </>
          } />
        </Routes>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};
