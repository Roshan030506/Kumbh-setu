import React from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { 
  Settings, 
  Globe, 
  Accessibility, 
  Volume2, 
  VolumeX, 
  Check, 
  ShieldCheck, 
  CheckCircle2, 
  Save,
  UserCheck,
  Store,
  Shield,
  Compass,
  ArrowRight,
  LogIn
} from 'lucide-react';

export const PreferencesScreen: React.FC = () => {
  const { 
    currentUser,
    currentRole,
    switchRole,
    setIsRoleModalOpen,
    language, 
    setLanguage, 
    elderlyMode, 
    setElderlyMode, 
    soundEnabled, 
    toggleSound, 
    t, 
    playClick, 
    showToast 
  } = useApp();

  const handleLangSelect = (lang: Language) => {
    playClick();
    setLanguage(lang);
  };

  const handleSave = () => {
    playClick();
    showToast('Preferences Saved', 'Your accessibility and language settings are persisted', 'success');
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-2xl mx-auto w-full p-4 sm:p-6 text-stone-100 flex flex-col justify-center">
      
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
              {t.preferences}
            </h1>
            <p className="text-xs text-stone-400">
              Configure language, audio cues, and accessibility assistance for Kumbh Mela 2026
            </p>
          </div>
        </div>

        {/* 0. Account & Portals Hub */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-950 to-stone-900 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-amber-100 uppercase tracking-wider">
                Active Portal & Identity
              </h3>
            </div>
            <button
              id="pref-switch-portal-btn"
              onClick={() => {
                playClick();
                setIsRoleModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{currentUser ? 'Switch Role / Re-login' : 'Log In Screen'}</span>
            </button>
          </div>

          <div className="text-xs text-stone-300">
            Current Status: <span className="font-bold text-amber-400 capitalize">{currentRole} Portal</span>
            {currentUser && (
              <span className="ml-2 text-stone-400">({currentUser.name})</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              id="pref-goto-pilgrim"
              onClick={() => {
                playClick();
                switchRole('pilgrim');
              }}
              className={`p-2 rounded-xl text-center border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                currentRole === 'pilgrim'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Pilgrim Map</span>
            </button>

            <button
              id="pref-goto-vendor"
              onClick={() => {
                playClick();
                switchRole('vendor');
              }}
              className={`p-2 rounded-xl text-center border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                currentRole === 'vendor'
                  ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Store className="w-4 h-4 text-sky-400" />
              <span>Vendor Dash</span>
            </button>

            <button
              id="pref-goto-admin"
              onClick={() => {
                playClick();
                switchRole('admin');
              }}
              className={`p-2 rounded-xl text-center border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                currentRole === 'admin'
                  ? 'bg-red-500/20 border-red-500 text-red-300 font-bold'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Shield className="w-4 h-4 text-red-400" />
              <span>Admin Dash</span>
            </button>
          </div>
        </div>

        {/* 1. Language Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{t.language}</span>
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              { code: 'en' as Language, title: 'English', subtitle: 'Official' },
              { code: 'hi' as Language, title: 'हिन्दी', subtitle: 'Hindi' },
              { code: 'mr' as Language, title: 'मराठी', subtitle: 'Marathi' }
            ].map(({ code, title, subtitle }) => (
              <button
                key={code}
                id={`pref-lang-${code}`}
                onClick={() => handleLangSelect(code)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95 ${
                  language === code
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30 shadow-md font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="text-sm font-bold">{title}</div>
                <div className="text-[11px] text-stone-400 mt-0.5">{subtitle}</div>
                {language === code && (
                  <div className="mt-1.5 flex justify-center">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Elderly & Accessibility Needs */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-emerald-400" />
              <span>{t.accessibilityNeeds}</span>
            </label>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Assisted Mobility
            </span>
          </div>

          <div 
            id="toggle-elderly-card"
            onClick={() => setElderlyMode(!elderlyMode)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
              elderlyMode
                ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                : 'bg-stone-950 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div>
              <h4 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
                <span>{t.elderlyDisabledMode}</span>
                {elderlyMode && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {t.elderlyDisabledDesc}
              </p>
            </div>

            {/* Switch UI */}
            <div className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 mt-1 ${elderlyMode ? 'bg-emerald-500' : 'bg-stone-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${elderlyMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>

        {/* 3. Audio & Micro-Interaction Feedback */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
              <span>Web Audio UI Feedback</span>
            </label>
          </div>

          <div 
            id="toggle-sound-card"
            onClick={toggleSound}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
              soundEnabled
                ? 'bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                : 'bg-stone-950 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div>
              <h4 className="text-sm font-bold text-stone-100">
                Auditory Clicks & Success Chimes
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Clean, synthesized tones rendered natively using browser Web Audio API for tactile confirmation.
              </p>
            </div>

            <div className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 mt-1 ${soundEnabled ? 'bg-sky-500' : 'bg-stone-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-3">
          <button
            id="btn-save-preferences"
            onClick={handleSave}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t.savePreferences}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
