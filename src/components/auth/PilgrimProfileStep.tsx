import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { User, Globe, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface PilgrimProfileStepProps {
  onComplete: (name: string, language: Language) => void;
  defaultPhone: string;
}

export const PilgrimProfileStep: React.FC<PilgrimProfileStepProps> = ({ onComplete, defaultPhone }) => {
  const { language, setLanguage, playClick, showToast } = useApp();
  const [name, setName] = useState('Shriram Sharma');
  const [selectedLang, setSelectedLang] = useState<Language>(language || 'en');
  const [elderlyAssistance, setElderlyAssistance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!name.trim()) {
      showToast('Name Required', 'Please enter your full name for the yatri record', 'alert');
      return;
    }

    setLanguage(selectedLang);
    onComplete(name.trim(), selectedLang);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/95 backdrop-blur-md flex flex-col justify-center px-4 py-8 animate-fadeIn">
      <div className="max-w-md mx-auto w-full bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3">
            <User className="w-7 h-7 text-amber-400" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
            Welcome to Kumbh 2026
          </span>
          <h2 className="text-2xl font-bold text-amber-50 font-cinzel mt-1">
            Complete Pilgrim Profile
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            A quick 1-step profile to personalize your pilgrimage schedule, bathing ghat routes, and alerts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mobile phone (read-only verified) */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Verified Mobile Number
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 text-sm font-mono flex items-center justify-between">
              <span>+91 {defaultPhone || '9876543210'}</span>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" /> Verified
              </span>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Full Name / तीर्थयात्री का नाम *
            </label>
            <input
              type="text"
              id="input-pilgrim-profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shriram Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
              required
            />
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Preferred Language / भाषा
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'en' as Language, label: 'English', sub: 'Default' },
                { code: 'hi' as Language, label: 'हिन्दी', sub: 'Hindi' },
                { code: 'mr' as Language, label: 'मराठी', sub: 'Marathi' }
              ].map((lang) => (
                <button
                  type="button"
                  key={lang.code}
                  id={`btn-profile-lang-${lang.code}`}
                  onClick={() => {
                    playClick();
                    setSelectedLang(lang.code);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedLang === lang.code
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="text-sm font-bold">{lang.label}</div>
                  <div className="text-[10px] text-stone-400">{lang.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Option */}
          <div className="pt-2">
            <label
              htmlFor="chk-elderly-assistance"
              className="flex items-start gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:border-stone-700 transition-colors"
            >
              <input
                type="checkbox"
                id="chk-elderly-assistance"
                checked={elderlyAssistance}
                onChange={(e) => setElderlyAssistance(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-amber-500 bg-stone-900 border-stone-700 focus:ring-amber-500"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-200 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Elderly / Wheelchair Assistance Priority
                </span>
                <p className="text-stone-400 text-[11px] mt-0.5">
                  Highlights gentle gradient ramp paths, battery cart golf buggies, and shaded resting pandals.
                </p>
              </div>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              id="btn-complete-pilgrim-profile"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Enter Pilgrim Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
