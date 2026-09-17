import React from 'react';
import { Flame, Sparkles, Loader2 } from 'lucide-react';

export const SplashLoader: React.FC = () => {
  return (
    <div
      id="splash-loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-amber-50 px-4 select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute w-96 h-96 rounded-full bg-amber-600/10 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-orange-600/10 blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-sm w-full relative z-10 animate-fadeIn">
        {/* App Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 shadow-2xl shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-stone-950/90 rounded-[22px] flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
              <Flame className="w-12 h-12 text-amber-400 fill-amber-400 animate-pulse" />
              <div className="absolute -bottom-1 text-[9px] font-black uppercase tracking-widest text-amber-300/80 font-mono">
                2026
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-amber-500 text-stone-950 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-amber-100 font-cinzel tracking-tight">
          KumbhSetu
        </h1>
        <div className="text-xs uppercase tracking-[0.25em] text-amber-400/90 font-semibold mt-1">
          Nashik - Trimbakeshwar 2026
        </div>

        {/* Spinner & State */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
          <span className="text-xs text-stone-400 font-medium">
            Verifying secure session...
          </span>
        </div>
      </div>
    </div>
  );
};
