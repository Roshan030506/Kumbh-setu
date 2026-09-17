import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  ArrowLeft, 
  Phone, 
  KeyRound, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Store, 
  ShieldAlert,
  X
} from 'lucide-react';

interface OtpLoginProps {
  targetRole?: UserRole;
  onBack?: () => void;
}

export const OtpLogin: React.FC<OtpLoginProps> = ({ targetRole: propTargetRole, onBack }) => {
  const { currentRole, login, setVendorScreen, setIsLoginOpen, setIsRoleModalOpen, t, playClick, playSuccess, showToast } = useApp();
  const targetRole = propTargetRole || currentRole || 'pilgrim';

  const handleBack = () => {
    playClick();
    if (onBack) {
      onBack();
    } else {
      setIsLoginOpen(false);
      setIsRoleModalOpen(false);
    }
  };

  const [phone, setPhone] = useState('9822456789');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Admin credentials state
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');

  useEffect(() => {
    // Preset realistic name based on role
    if (targetRole === 'pilgrim') {
      setName('Pandit Raghunath Sharma');
    } else if (targetRole === 'vendor') {
      setName('Santosh Vitthal Joshi');
    } else {
      setName('Commissioner R. K. Patil (Nashik Control)');
    }
  }, [targetRole]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!adminUsername.trim() || !adminPassword.trim()) {
      showToast('Credentials Required', 'Please enter username and password', 'alert');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      playSuccess();
      login('admin', '02532578000', adminUsername === 'admin' ? 'District Collectorate Admin' : adminUsername);
      showToast('Admin Access Authorized', 'Command Center Telemetry Synchronized', 'success');
    }, 700);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!phone || phone.length < 10) {
      showToast('Invalid Phone Number', 'Please enter a valid 10-digit mobile number', 'alert');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setCountdown(30);
      showToast('OTP Dispatched', 'Simulated 4-digit code sent: 2026', 'info');
    }, 800);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!otp || otp.length < 4) {
      showToast('Invalid Code', 'Please enter the 4-digit OTP', 'alert');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      playSuccess();
      login(targetRole, phone, name);
      if (targetRole === 'vendor') {
        setVendorScreen('registration');
      }
    }, 700);
  };

  const fillDemoOtp = () => {
    playClick();
    setOtp('2026');
  };

  const fillDemoAdmin = () => {
    playClick();
    setAdminUsername('admin');
    setAdminPassword('admin123');
    showToast('Demo Credentials Applied', 'Username: admin, Password: admin123', 'info');
  };

  const roleMeta = {
    pilgrim: {
      title: t.pilgrim,
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      tag: 'Pilgrim / Yatri Access Pass',
      bannerColor: 'from-amber-600 to-orange-700'
    },
    vendor: {
      title: t.vendor,
      icon: <Store className="w-6 h-6 text-sky-400" />,
      tag: 'Authorized Merchant Portal',
      bannerColor: 'from-sky-700 to-blue-800'
    },
    admin: {
      title: t.admin,
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      tag: 'Control Command & Police Clearance',
      bannerColor: 'from-red-700 to-rose-900'
    }
  }[targetRole];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-md flex flex-col justify-center px-4 py-8 animate-fadeIn">
      <div className="max-w-md mx-auto w-full relative">
        
        {/* Back Button & Close */}
        <div className="flex items-center justify-between mb-4">
          <button
            id="btn-back-to-roles"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-transform hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Role Selection</span>
          </button>

          <button
            id="btn-close-otp-login"
            onClick={handleBack}
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-stone-900/95 border border-stone-800 p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Header Accent Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${roleMeta.bannerColor}`} />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-800 border border-stone-700">
                {roleMeta.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-100">{roleMeta.title}</h2>
                <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
                  {roleMeta.tag}
                </span>
              </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <p className="text-xs text-stone-400 mb-6 leading-relaxed">
            {targetRole === 'admin' 
              ? 'Enter administrative command credentials to inspect crowd sensors, approve merchant permits, and manage live emergency broadcasts.' 
              : t.loginSubtitle}
          </p>

          {targetRole === 'admin' ? (
            /* ADMIN LOGIN FORM: Username & Password */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Administrative ID / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="input-admin-username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500 text-sm font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Security Passkey / Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="input-admin-password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500 text-sm font-mono"
                    required
                  />
                </div>
              </div>

              {/* Demo Hint Banner for Judges */}
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block">Demo Credentials for Judges:</span>
                    <span className="font-mono text-[11px] text-stone-300">Username: <b>admin</b> | Password: <b>admin123</b></span>
                  </div>
                </div>
                <button
                  type="button"
                  id="btn-autofill-admin"
                  onClick={fillDemoAdmin}
                  className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[10px] font-bold shrink-0 transition-colors"
                >
                  Auto-fill
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-admin-login"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-600/30 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating Control Pass...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Access Command Center</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : !otpSent ? (
            /* STEP 1: Phone Input for Pilgrim or Vendor */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="input-login-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  {t.phoneLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 text-sm font-medium">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="input-login-phone"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 text-sm font-mono tracking-wider"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-500">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-send-otp"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>{t.sendOtp}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Demo Hint */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Demo mode: Phone & Name pre-filled for rapid hackathon testing.</span>
              </div>
            </form>
          ) : (
            /* STEP 2: OTP Verification */
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">Code sent to: <b className="text-stone-200 font-mono">+91 {phone}</b></span>
                <button
                  type="button"
                  id="btn-change-phone"
                  onClick={() => {
                    playClick();
                    setOtpSent(false);
                  }}
                  className="text-amber-400 hover:underline text-[11px] font-semibold"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  {t.enterOtp}
                </label>
                <input
                  type="text"
                  id="input-login-otp"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="2 0 2 6"
                  className="w-full text-center py-3 text-2xl font-mono font-bold tracking-[0.5em] rounded-xl bg-stone-950 border border-stone-800 text-amber-400 placeholder-stone-700 focus:outline-none focus:border-amber-500"
                  autoFocus
                  required
                />
              </div>

              {/* Quick Auto-Fill Demo OTP button */}
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  id="btn-autofill-otp"
                  onClick={fillDemoOtp}
                  className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auto-fill Demo Code (2026)</span>
                </button>

                <span className="text-stone-500 text-[11px]">
                  {countdown > 0 ? `Resend in ${countdown}s` : (
                    <button
                      type="button"
                      onClick={() => setCountdown(30)}
                      className="text-amber-400 underline font-semibold"
                    >
                      {t.resendOtp}
                    </button>
                  )}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-verify-otp"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating Pass...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.verifyAndEnter}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
