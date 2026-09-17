import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertOctagon, 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  RotateCcw, 
  Radio, 
  Activity,
  HeartHandshake
} from 'lucide-react';

export const SosScreen: React.FC = () => {
  const { t, triggerSos, playClick, showToast, currentUser } = useApp();

  const [isTriggered, setIsTriggered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isArmed, setIsArmed] = useState(false);
  const [activeUnit, setActiveUnit] = useState('Sector-1 Police & Medical QRT Unit #14');
  const [eta, setEta] = useState(3);
  const [distressNote, setDistressNote] = useState('');

  // Coordinates
  const mockGps = {
    lat: 19.9975,
    lng: 73.7898,
    label: 'Ramkund Sacred Promenade, Panchavati Sector 1'
  };

  const handlePressSos = () => {
    setIsArmed(true);
    setCountdown(3);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isArmed && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(c => c - 1);
      }, 800);
    } else if (isArmed && countdown === 0 && !isTriggered) {
      setIsTriggered(true);
      triggerSos(mockGps.lat, mockGps.lng, distressNote || 'Immediate emergency response requested via one-touch SOS beacon');
    }
    return () => clearTimeout(timer);
  }, [isArmed, countdown, isTriggered, mockGps.lat, mockGps.lng, distressNote, triggerSos]);

  const handleCancel = () => {
    playClick();
    setIsArmed(false);
    setIsTriggered(false);
    setCountdown(3);
    showToast('SOS Standby', 'Distress alarm cancelled', 'info');
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-2xl mx-auto w-full p-4 sm:p-6 flex flex-col justify-center text-stone-100">
      
      {!isTriggered && !isArmed ? (
        <div className="text-center space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
              <span>24/7 Rapid Emergency Response Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-red-100 font-cinzel">
              {t.emergencySosTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
              {t.emergencySosSubtitle}
            </p>
          </div>

          {/* Large One-Tap SOS Button */}
          <div className="py-6 flex justify-center">
            <button
              id="btn-trigger-sos-main"
              onClick={handlePressSos}
              className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 hover:from-red-600 hover:to-rose-400 text-white font-black text-xl sm:text-2xl tracking-widest uppercase shadow-2xl flex flex-col items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer border-4 border-red-300/40 sos-pulse"
            >
              <AlertOctagon className="w-14 h-14 text-white drop-shadow-md" />
              <span>SOS</span>
              <span className="text-[11px] font-bold tracking-wider text-red-100/90 max-w-[140px] text-center leading-tight">
                {t.tapForHelp}
              </span>
            </button>
          </div>

          {/* Current Captured GPS Badge */}
          <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-left">
              <MapPin className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <span className="text-[10px] text-stone-400 block font-bold uppercase">{t.gpsCoordinates}</span>
                <span className="font-mono text-stone-200">{mockGps.lat}° N, {mockGps.lng}° E</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              GPS Lock Accurate (±2m)
            </span>
          </div>

          {/* Quick Helpline Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
            <a
              href="tel:112"
              id="btn-call-police"
              onClick={playClick}
              className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-bold text-stone-100 flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>{t.callPolice}</span>
            </a>

            <a
              href="tel:108"
              id="btn-call-ambulance"
              onClick={playClick}
              className="p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-bold text-stone-100 flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{t.callAmbulance}</span>
            </a>
          </div>

        </div>
      ) : isArmed && !isTriggered ? (
        /* Countdown Safety State */
        <div className="text-center space-y-6 p-8 rounded-3xl bg-red-950/80 border border-red-500/50 shadow-2xl backdrop-blur-md">
          <div className="w-24 h-24 rounded-full bg-red-600/30 border-4 border-red-500 text-red-100 font-mono text-4xl font-black mx-auto flex items-center justify-center animate-pulse">
            {countdown}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Transmitting Distress Signal...</h2>
            <p className="text-xs text-red-200/90 mt-1">
              Dispatching your live location to Central Control & nearby patrolling officers.
            </p>
          </div>

          <button
            id="btn-cancel-sos-countdown"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel False Alarm
          </button>
        </div>
      ) : (
        /* SUCCESSFUL SOS DISPATCH STATE */
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-emerald-500/50 shadow-2xl space-y-6 text-center">
          
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
              STATUS: CONFIRMED DISPATCH
            </span>
            <h2 className="text-2xl font-black text-stone-100 font-cinzel">
              {t.alertSentSuccess}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md mx-auto">
              {t.helpIsOnTheWay}
            </p>
          </div>

          {/* Dispatch Live Status Card */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs text-stone-400 font-medium">Assigned Responder</span>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                {activeUnit}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs text-stone-400 font-medium">Estimated Arrival</span>
              <span className="text-sm font-extrabold text-emerald-400">~{eta} Minutes</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400 font-medium">Location Transmitted</span>
              <span className="text-xs font-mono text-stone-300">{mockGps.label}</span>
            </div>
          </div>

          {/* Standby Advisory */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 text-left leading-relaxed">
            <b className="text-amber-300 font-semibold block mb-0.5">Control Room Instructions:</b>
            Please remain calm and stay in your current location if safe to do so. Patrolling volunteers are equipped with First-Aid, oxygen cylinders, and satellite radios.
          </div>

          {/* Reset / Done Button */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              id="btn-reset-sos"
              onClick={handleCancel}
              className="py-2.5 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mark Standby / Reset</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
