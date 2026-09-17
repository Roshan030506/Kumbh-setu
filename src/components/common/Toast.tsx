import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto rounded-xl p-3.5 shadow-xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'alert'
                ? 'bg-red-950/90 border-red-500/50 text-red-50 shadow-red-950/40'
                : toast.type === 'success'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-50 shadow-amber-950/40'
                : 'bg-stone-900/90 border-stone-700 text-stone-100 shadow-stone-950/40'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'alert' && <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />}
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-stone-300/90 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>

            <button
              id={`dismiss-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-100 p-0.5 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const Toast = ToastContainer;
