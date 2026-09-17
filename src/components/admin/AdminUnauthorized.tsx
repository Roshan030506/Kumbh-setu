import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, UserCheck, RefreshCw } from 'lucide-react';

export const AdminUnauthorized: React.FC = () => {
  const { currentUser, switchRole, logout, playClick } = useApp();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="max-w-md w-full bg-stone-900 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-rose-700" />

        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-red-400" />
        </div>

        <h2 className="text-2xl font-bold text-amber-50 font-cinzel">
          Admin Authorization Required
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
          The signed-in account (<span className="text-amber-300 font-mono">{currentUser?.email || currentUser?.phone}</span>) does not have the custom claim <code className="text-red-300">admin: true</code> granted by the security administrator.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            id="btn-admin-switch-pilgrim"
            onClick={() => {
              playClick();
              switchRole('pilgrim');
            }}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Return to Pilgrim Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-admin-relogin"
            onClick={() => {
              playClick();
              logout();
            }}
            className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sign In with Different Credentials</span>
          </button>
        </div>
      </div>
    </div>
  );
};
