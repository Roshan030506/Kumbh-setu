import React, { useEffect, useState } from 'react';
import { Flame, Sparkles, Compass, Shield, Store, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2-second progress timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      onComplete();
    }, 2100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-amber-50 px-4 select-none overflow-hidden"
    >
      {/* Subtle spiritual ambient background glows */}
      <div className="absolute w-96 h-96 rounded-full bg-amber-600/10 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-orange-600/10 blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center text-center max-w-md w-full relative z-10"
      >
        {/* App Emblem / Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 shadow-2xl shadow-amber-500/20 flex items-center justify-center">
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

        {/* App Name */}
        <h1 className="text-3xl sm:text-4xl font-black text-amber-100 font-cinzel tracking-tight">
          KumbhSetu
        </h1>
        <div className="text-xs uppercase tracking-[0.25em] text-amber-400/90 font-semibold mt-1">
          Nashik - Trimbakeshwar 2026
        </div>

        {/* Tagline */}
        <p className="mt-3 text-sm text-stone-300 max-w-xs leading-relaxed">
          Smart Pilgrim Assistance, Real-Time Crowd Safety & Unified Vendor Ecosystem
        </p>

        {/* Role Pillars preview */}
        <div className="flex items-center gap-4 mt-6 text-[11px] text-stone-400 font-medium">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Pilgrims
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Store className="w-3.5 h-3.5 text-sky-400" /> Vendors
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-red-400" /> Command
          </span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 sm:w-56 h-1.5 bg-stone-800/80 rounded-full mt-8 overflow-hidden border border-amber-500/20">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          id="btn-skip-splash"
          onClick={onComplete}
          className="mt-6 text-xs text-amber-400/80 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};
