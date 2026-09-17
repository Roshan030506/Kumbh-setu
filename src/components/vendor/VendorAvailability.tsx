import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  SlidersHorizontal, 
  Store, 
  CheckCircle2, 
  Clock, 
  Package, 
  AlertTriangle, 
  Save, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const VendorAvailability: React.FC = () => {
  const { currentVendor, updateVendorAvailability, setVendorScreen, t, playClick, playToggle, showToast } = useApp();

  const [isOpen, setIsOpen] = useState(currentVendor.isOpen);
  const [stockLevel, setStockLevel] = useState(currentVendor.stockLevelPercent);
  const [waitTime, setWaitTime] = useState(currentVendor.waitTimeMinutes ?? 10);
  const [hasChanged, setHasChanged] = useState(false);

  const handleToggleOpen = () => {
    const next = !isOpen;
    playToggle(next);
    setIsOpen(next);
    setHasChanged(true);
    updateVendorAvailability(currentVendor.id, next, stockLevel, waitTime);
    showToast(
      next ? 'Stall Opened' : 'Stall Closed',
      next ? 'Stall is now visible as OPEN on pilgrim map' : 'Stall marked closed on pilgrim map',
      next ? 'success' : 'info'
    );
  };

  const handleStockChange = (newLevel: number) => {
    setStockLevel(newLevel);
    setHasChanged(true);
  };

  const handleSaveAll = () => {
    playClick();
    updateVendorAvailability(currentVendor.id, isOpen, stockLevel, waitTime);
    setHasChanged(false);
    showToast('Availability Synchronized', 'Pilgrim map reflects your live inventory status', 'success');
  };

  const getStockBadge = (val: number) => {
    if (val <= 10) return { label: 'Nearly Sold Out / Critical', color: 'text-red-400 bg-red-950/60 border-red-500/40' };
    if (val <= 40) return { label: 'Limited Stock', color: 'text-amber-300 bg-amber-950/60 border-amber-500/40' };
    return { label: 'Ample Fresh Stock Available', color: 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40' };
  };

  const stockBadge = getStockBadge(stockLevel);

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-3xl mx-auto w-full p-4 sm:p-6 text-stone-100 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
              {t.availability} & Live Inventory
            </h1>
            <p className="text-xs text-stone-400">
              {currentVendor.businessName} • {currentVendor.category}
            </p>
          </div>
        </div>

        <button
          id="btn-back-to-vendor-dash"
          onClick={() => {
            playClick();
            setVendorScreen('dashboard');
          }}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* 1. Open / Closed Large Switch */}
        <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isOpen ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
              <h3 className="text-base font-bold text-stone-100">
                Stall Operational Status
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-1 max-w-md">
              {isOpen 
                ? 'Your stall is active. Pilgrims will see you as OPEN and can navigate to your location.'
                : 'Your stall is currently marked CLOSED. Pilgrims will be notified you are taking a break.'}
            </p>
          </div>

          <button
            type="button"
            id="btn-toggle-stall-status"
            onClick={handleToggleOpen}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
              isOpen
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-500/20'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{isOpen ? 'Stall is OPEN' : 'Stall is CLOSED'}</span>
          </button>
        </div>

        {/* 2. Stock / Room Availability Slider */}
        <div className="space-y-4 pt-2 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-400" />
                <span>Inventory / Stock Level Gauge</span>
              </label>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Adjust slider as stock depletes during heavy Aarti & Snan rushes
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-black font-mono text-amber-300">
                {stockLevel}%
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${stockBadge.color}`}>
                {stockBadge.label}
              </span>
            </div>
          </div>

          {/* Slider input */}
          <div className="pt-2">
            <input
              type="range"
              id="slider-vendor-stock"
              min="0"
              max="100"
              step="5"
              value={stockLevel}
              onChange={(e) => handleStockChange(Number(e.target.value))}
              className="w-full h-3 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: 'Fully Stocked (100%)', val: 100 },
              { label: 'High Stock (75%)', val: 75 },
              { label: 'Half Stock (50%)', val: 50 },
              { label: 'Low Stock (20%)', val: 20 },
              { label: 'Sold Out (0%)', val: 0 },
            ].map(({ label, val }) => (
              <button
                key={val}
                type="button"
                id={`btn-preset-stock-${val}`}
                onClick={() => {
                  playClick();
                  handleStockChange(val);
                }}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                  stockLevel === val
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Estimated Wait Time */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Current Service Wait Time</span>
            </label>
            <span className="font-mono text-sm font-bold text-sky-300">
              ~{waitTime} Minutes
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[3, 8, 15, 30].map((mins) => (
              <button
                key={mins}
                type="button"
                id={`btn-wait-${mins}m`}
                onClick={() => {
                  playClick();
                  setWaitTime(mins);
                  setHasChanged(true);
                }}
                className={`py-2 rounded-xl border text-center text-xs font-bold transition-all ${
                  waitTime === mins
                    ? 'bg-sky-500 text-stone-950 border-sky-400'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                {mins} Mins
              </button>
            ))}
          </div>
        </div>

        {/* Save & Publish Changes */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Updates are synced to Central Nashik Mela Pilgrim App immediately.</span>
          </p>

          <button
            type="button"
            id="btn-save-vendor-availability"
            onClick={handleSaveAll}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Broadcast</span>
          </button>
        </div>

      </div>

    </div>
  );
};
