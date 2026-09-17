import React, { useState } from 'react';
import { UserRole, Language } from '../../types';
import { useApp } from '../../context/AppContext';
import { SplashScreen } from './SplashScreen';
import { FirebaseRoleLogin } from './FirebaseRoleLogin';
import { 
  Compass, 
  Store, 
  Shield, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

export const LoginFlow: React.FC = () => {
  const { language, setLanguage, playClick } = useApp();

  // Screen 1 (Splash 2s) vs Screen 2 (Role Select) vs Screen 3 (Role Auth)
  const [step, setStep] = useState<'splash' | 'role_select' | 'auth'>(() => {
    try {
      const seen = sessionStorage.getItem('kumbh_splash_seen');
      return seen ? 'role_select' : 'splash';
    } catch {
      return 'splash';
    }
  });

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem('kumbh_splash_seen', 'true');
    } catch {
      // ignore
    }
    setStep('role_select');
  };

  const roles = [
    {
      role: 'pilgrim' as UserRole,
      title: 'Pilgrim / Yatri',
      description: 'Devotees & visitors: GPS sacred ghat routes, live crowd heatmaps & instant emergency SOS.',
      icon: <Compass className="w-8 h-8 text-amber-500" />,
      accent: 'border-amber-500/40 hover:border-amber-500 bg-amber-950/20 hover:bg-amber-950/30',
      badge: 'Public & Devotee Access',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      authMethod: 'Firebase Phone Auth (SMS OTP)',
      highlights: ['Interactive Ghats & Bathing Schedule', 'Crowd-Aware Safe Routing', 'One-Touch Emergency SOS', 'AI Mela Sahayak Assistance']
    },
    {
      role: 'vendor' as UserRole,
      title: 'Vendor / Stall Owner',
      description: 'Merchants & stall operators: Register your shop, upload FSSAI license & manage stock availability.',
      icon: <Store className="w-8 h-8 text-sky-400" />,
      accent: 'border-sky-500/40 hover:border-sky-500 bg-sky-950/20 hover:bg-sky-950/30',
      badge: 'Merchant & Stall Partners',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      authMethod: 'Firebase Email/Password & Shop Review',
      highlights: ['Stall Registration & Pin Drop', 'FSSAI License OCR Auto-Verification', 'Live Open/Closed & Stock Toggles', 'Official Kumbh 2026 QR Badge']
    },
    {
      role: 'admin' as UserRole,
      title: 'Admin / Control Room',
      description: 'Police & municipal control room: Verify merchant applications, monitor crowd capacity & dispatch patrol units.',
      icon: <Shield className="w-8 h-8 text-red-400" />,
      accent: 'border-red-500/40 hover:border-red-500 bg-red-950/20 hover:bg-red-950/30',
      badge: 'District Police & Control Room',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      authMethod: 'Firebase Admin Claim Only (No Signup)',
      highlights: ['Real-Time Crowd Density Heatmaps', 'Vendor Compliance Approval Queue', 'Rapid Response Patrol Dispatch', 'Missing Person Broadcast Center']
    }
  ];

  // Screen 1: Splash
  if (step === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Screen 3: Role-specific login
  if (step === 'auth' && selectedRole) {
    return (
      <FirebaseRoleLogin
        targetRole={selectedRole}
        onBack={() => {
          playClick();
          setStep('role_select');
          setSelectedRole(null);
        }}
      />
    );
  }

  // Screen 2: Role Selection (Standalone screen, decoupled from main app layout)
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center px-4 py-8 sm:py-12 relative overflow-hidden select-none">
      {/* Background spiritual lights */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-3xl -top-32 -left-32 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-3xl -bottom-32 -right-32 pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 animate-fadeIn">
        {/* Header Branding */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 shadow-inner">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Kumbh Mela 2026 • Nashik-Trimbakeshwar</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-cinzel text-amber-100 tracking-tight">
            Continue as
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Choose your role to enter the KumbhSetu smart pilgrim and mela management platform
          </p>

          {/* Language Toggle */}
          <div className="mt-5 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-stone-900/90 border border-amber-500/30 shadow-lg">
            <div className="flex items-center gap-1.5 pl-2.5 pr-1 text-xs text-amber-400 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Language:</span>
            </div>
            {[
              { code: 'en' as Language, label: 'English' },
              { code: 'hi' as Language, label: 'हिन्दी' },
              { code: 'mr' as Language, label: 'मराठी' }
            ].map((l) => (
              <button
                key={l.code}
                id={`login-lang-${l.code}`}
                onClick={() => {
                  playClick();
                  setLanguage(l.code);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  language === l.code
                    ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {roles.map((item) => (
            <div
              key={item.role}
              id={`login-role-card-${item.role}`}
              onClick={() => {
                playClick();
                setSelectedRole(item.role);
                setStep('auth');
              }}
              className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:-translate-y-1.5 backdrop-blur-sm bg-stone-900/80 ${item.accent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 shadow-md group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-amber-50 group-hover:text-amber-300 transition-colors font-cinzel">
                  {item.title}
                </h3>

                <div className="mt-1 text-[11px] font-mono text-amber-400/90 font-medium">
                  {item.authMethod}
                </div>

                <p className="mt-2.5 text-xs sm:text-sm text-stone-300/85 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-stone-800/80 pt-4">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  id={`btn-select-role-${item.role}`}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>Continue as {item.title.split('/')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-xs text-stone-400 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Central Control Room Live • 24/7 Operations
          </span>
          <span>•</span>
          <span>Nashik Municipal Corporation & Police District Authority</span>
          <span>•</span>
          <span>Firebase Auth & Persistent Security</span>
        </div>
      </div>
    </div>
  );
};
