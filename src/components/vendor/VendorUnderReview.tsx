import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Clock, Store, LogOut, RefreshCw, PhoneCall, CheckCircle } from 'lucide-react';

interface VendorUnderReviewProps {
  onLogout?: () => void;
}

export const VendorUnderReview: React.FC<VendorUnderReviewProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { logout: authLogout, refreshProfile } = useAuth();
  const { currentUser, logout: appLogout, playClick, showToast } = useApp();

  const handleRefresh = async () => {
    playClick();
    showToast('Checking Status', 'Querying municipal records for verification status...', 'info');
    await refreshProfile();
  };

  const handleLogout = async () => {
    playClick();
    if (onLogout) {
      onLogout();
    } else {
      await authLogout();
      await appLogout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 rounded-full bg-sky-600/10 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-amber-600/10 blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="max-w-lg w-full bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden text-center z-10">
        {/* Top accent border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-sky-500 to-orange-500" />

        <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5 shadow-inner">
          <Clock className="w-10 h-10 text-amber-400 animate-spin" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Store className="w-3.5 h-3.5" />
          <span>Status: Under Review</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-amber-50 font-cinzel">
          Your Shop Is Under Review
        </h2>

        <p className="mt-3 text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
          Thank you for registering <strong className="text-amber-300">{currentUser?.shopName || 'your commercial stall'}</strong> for Kumbh Mela 2026. 
          Your FSSAI license / GSTIN documentation is currently being verified by the Nashik Municipal Corporation Admin Desk.
        </p>

        {/* Verification Checklist */}
        <div className="mt-6 text-left bg-stone-950/80 border border-stone-800 rounded-2xl p-4 space-y-2.5 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Registration Application Submitted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Shop Details & Category Recorded ({currentUser?.category || 'Merchant Stall'})</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span className="font-semibold text-amber-200">Awaiting Nodal Officer Approval & Kumbh QR Badge</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-stone-950/40 rounded-xl border border-stone-800/80 text-[11px] text-stone-400">
          GSTIN / License: <span className="font-mono text-stone-200 font-semibold">{currentUser?.licenseOrGstin || 'FSSAI-MH-2026-SUBMITTED'}</span>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            id="btn-vendor-review-check"
            onClick={handleRefresh}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Check Status</span>
          </button>

          <button
            id="btn-vendor-review-logout-main"
            onClick={handleLogout}
            className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> Helpline: 1800-233-2026
          </span>
          <span className="text-[11px] text-stone-500">
            NMC License Div • Nashik
          </span>
        </div>
      </div>
    </div>
  );
};
