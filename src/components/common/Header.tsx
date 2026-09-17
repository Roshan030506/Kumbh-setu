import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Volume2, 
  VolumeX, 
  Globe, 
  LogOut, 
  Shield, 
  Store, 
  Compass, 
  Accessibility, 
  Flame, 
  UserCheck 
} from 'lucide-react';
import { Language, UserRole } from '../../types';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    logout: appLogout, 
    language, 
    setLanguage, 
    soundEnabled, 
    toggleSound, 
    elderlyMode, 
    setElderlyMode, 
    t, 
    playClick 
  } = useApp();

  const handleLangChange = (lang: Language) => {
    playClick();
    setLanguage(lang);
  };

  const handleLogout = async () => {
    playClick();
    await authLogout();
    await appLogout();
    navigate('/login', { replace: true });
  };

  const roles: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'pilgrim', label: t.pilgrim, icon: <Compass className="w-4 h-4" /> },
    { role: 'vendor', label: t.vendor, icon: <Store className="w-4 h-4" /> },
    { role: 'admin', label: t.admin, icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 border-b border-amber-500/20 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Holy Motif */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => {
            playClick();
            switchRole('pilgrim');
          }}
          title="Click to go to Pilgrim Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 flex items-center justify-center shadow-md shadow-amber-500/30 text-stone-950">
            <Flame className="w-5 h-5 fill-amber-100 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-amber-300">
                KUMBH 2026
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Nashik
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70 font-medium leading-none hidden sm:block">
              {t.appName} • Godavari River Authority
            </p>
          </div>
        </div>

        {/* Center: Live Portal Role Switcher (Pilgrim / Vendor / Admin) */}
        <div className="hidden md:flex items-center bg-stone-950/70 p-1 rounded-xl border border-amber-500/30 shadow-inner">
          <span className="text-[10px] uppercase font-bold text-amber-400/80 px-2 tracking-wider">
            Portal:
          </span>
          <div className="flex items-center gap-1">
            {roles.map(({ role, label, icon }) => (
              <button
                key={role}
                id={`switch-role-${role}`}
                onClick={() => {
                  playClick();
                  switchRole(role);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all transform active:scale-95 cursor-pointer ${
                  currentRole === role
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                }`}
                title={`Switch to ${label} view`}
              >
                {icon}
                <span>{label.split('/')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls: Sound, Accessibility, Language, Login / Logout */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio Feedback Toggle */}
          <button
            id="toggle-sound-btn"
            onClick={toggleSound}
            title={soundEnabled ? "Audio UI Clicks On" : "Audio UI Muted"}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 cursor-pointer ${
              soundEnabled 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30' 
                : 'bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Accessibility Toggle */}
          <button
            id="toggle-accessibility-btn"
            onClick={() => setElderlyMode(!elderlyMode)}
            title="Senior Citizen & Wheelchair Ramp Priority Mode"
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 cursor-pointer ${
              elderlyMode 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm' 
                : 'bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px] font-medium">
              {elderlyMode ? 'Accessible ON' : 'Assisted'}
            </span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-stone-950/70 rounded-lg p-0.5 border border-amber-500/20">
            <Globe className="w-3.5 h-3.5 ml-1.5 mr-0.5 text-amber-400/80 hidden sm:inline" />
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                id={`lang-btn-${lang}`}
                onClick={() => handleLangChange(lang)}
                className={`px-2 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                  language === lang
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
              </button>
            ))}
          </div>

          {/* User Status & Visible Logout */}
          <div className="flex items-center gap-1.5 pl-1">
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800/80 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="capitalize">{currentUser?.role || currentRole}</span>
            </div>

            <button
              id="btn-header-logout"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-800/60 text-red-200 text-xs font-semibold transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
              title="Sign out of Firebase and return to Login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logout || 'Logout'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Demo Role Ribbon (Always visible for easy switching) */}
      <div className="flex md:hidden border-t border-amber-950/60 bg-stone-950/95 px-3 py-1.5 justify-between items-center text-xs">
        <div className="flex items-center gap-1">
          <span className="text-amber-400 font-semibold text-[10px] uppercase tracking-wider">
            Role:
          </span>
          <div className="flex gap-1">
            {roles.map(({ role, label }) => (
              <button
                key={role}
                id={`switch-mobile-role-${role}`}
                onClick={() => {
                  playClick();
                  switchRole(role);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  currentRole === role
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 bg-stone-900/80'
                }`}
              >
                {label.split('/')[0]}
              </button>
            ))}
          </div>
        </div>

        <button
          id="btn-mobile-logout"
          onClick={handleLogout}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/60 border border-red-800/50 text-red-200 font-semibold text-[10px] uppercase cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
