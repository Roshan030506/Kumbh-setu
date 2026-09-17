import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../common/Header';
import { Navigation } from '../common/Navigation';
import { useApp } from '../../context/AppContext';

import { PilgrimHomeMap } from './PilgrimHomeMap';
import { RouteScreen } from './RouteScreen';
import { AiAssistant } from './AiAssistant';
import { SosScreen } from './SosScreen';
import { LostPersonScreen } from './LostPersonScreen';
import { PreferencesScreen } from './PreferencesScreen';

export const PilgrimAppShell: React.FC = () => {
  const { pilgrimScreen } = useApp();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* App Shell Header */}
      <Header />

      {/* Main Body View Area */}
      <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<PilgrimHomeMap />} />
          <Route path="/map" element={<PilgrimHomeMap />} />
          <Route path="/routes" element={<RouteScreen />} />
          <Route path="/assistant" element={<AiAssistant />} />
          <Route path="/sos" element={<SosScreen />} />
          <Route path="/lost-person" element={<LostPersonScreen />} />
          <Route path="/preferences" element={<PreferencesScreen />} />
          {/* Fallback to active subscreen in AppContext if navigated via tab button */}
          <Route path="*" element={
            <>
              {pilgrimScreen === 'home_map' && <PilgrimHomeMap />}
              {pilgrimScreen === 'routes' && <RouteScreen />}
              {pilgrimScreen === 'assistant' && <AiAssistant />}
              {pilgrimScreen === 'sos' && <SosScreen />}
              {pilgrimScreen === 'lost_person' && <LostPersonScreen />}
              {pilgrimScreen === 'preferences' && <PreferencesScreen />}
            </>
          } />
        </Routes>
      </main>

      {/* Persistent Navigation (Bottom Bar on Mobile / Ribbon) */}
      <Navigation />
    </div>
  );
};
