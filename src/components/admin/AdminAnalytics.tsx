import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  ShieldAlert, 
  Activity, 
  Store, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Radio, 
  Compass, 
  CheckCircle2,
  BarChart3,
  MapPin,
  LogOut,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { vendors, alerts, facilities, setAdminScreen, logout, t, playClick, showToast } = useApp();

  const totalVendorsCount = vendors.length;
  const verifiedVendorsCount = vendors.filter(v => v.status === 'verified').length;
  const pendingVendorsCount = vendors.filter(v => v.status === 'pending').length;
  const activePilgrimsToday = 1480250;
  const sosAlertsToday = alerts.filter(a => a.type === 'sos').length;

  const handleQuickDispatch = (unitName: string) => {
    playClick();
    showToast(`Dispatched ${unitName}`, 'Mobile response team notified via wireless telemetry', 'info');
  };

  const handleLogout = () => {
    playClick();
    logout();
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-6xl mx-auto w-full p-4 sm:p-6 text-stone-100 space-y-6">
      
      {/* Central Command Header & Quick Nav Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-red-950/50 via-stone-900 to-amber-950/40 border border-red-500/30 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center shadow-lg shadow-red-600/20 shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
                {t.commandCenter}
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Live Telemetry Synchronized
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Nashik District Collectorate & Simhastha Kumbh Mela 2026 Integrated Command Center
            </p>
          </div>
        </div>

        {/* Quick Navigation Tabs / Sidebar Shortcut Buttons & Logout */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-admin-nav-queue"
            onClick={() => {
              playClick();
              setAdminScreen('vendor_queue');
            }}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Vendor Verification ({pendingVendorsCount})</span>
          </button>

          <button
            id="btn-admin-nav-crowd"
            onClick={() => {
              playClick();
              setAdminScreen('crowd_map');
            }}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Crowd Monitor</span>
          </button>

          <button
            id="btn-admin-nav-alerts"
            onClick={() => {
              playClick();
              setAdminScreen('alerts');
            }}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Live Alerts ({alerts.filter(a => a.status === 'active').length})</span>
          </button>

          <button
            id="btn-admin-logout"
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-200 border border-red-800/50 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Top 5 Analytics Cards:
          1. Total Vendors
          2. Verified Vendors
          3. Pending Verifications
          4. Active Pilgrims Today
          5. SOS Alerts Today */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Card 1: Total Vendors */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Vendors</span>
            <Store className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-stone-100 mt-2 font-mono">
            {totalVendorsCount}
          </div>
          <div className="text-[10px] text-stone-400 mt-1 font-semibold">
            Registered Nashik Mela Stalls
          </div>
        </div>

        {/* Card 2: Verified Vendors */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Verified Vendors</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2 font-mono">
            {verifiedVendorsCount}
          </div>
          <div className="text-[10px] text-emerald-300 mt-1 font-semibold">
            FSSAI & Municipal Clearance
          </div>
        </div>

        {/* Card 3: Pending Verifications */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Pending Verifications</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2 font-mono">
            {pendingVendorsCount}
          </div>
          <div className="text-[10px] text-amber-300 mt-1 font-semibold">
            Awaiting Document Approval
          </div>
        </div>

        {/* Card 4: Active Pilgrims Today */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Pilgrims Today</span>
            <Users className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-stone-100 mt-2 font-mono">
            {activePilgrimsToday.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% daily influx</span>
          </div>
        </div>

        {/* Card 5: SOS Alerts Today */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">SOS Alerts Today</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-400 mt-2 font-mono">
            {sosAlertsToday}
          </div>
          <div className="text-[10px] text-red-300 mt-1 font-semibold">
            Emergency QRT Responses
          </div>
        </div>

      </div>

      {/* Analytics Screen: 2 Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Pilgrim App Usage / Influx Curve Over the Day */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-amber-100 font-cinzel flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>Pilgrim App Usage Over the Day</span>
              </h3>
              <p className="text-xs text-stone-400">Concurrent active sessions and holy dip GPS telemetry (IST)</p>
            </div>
            <span className="text-xs font-mono text-amber-300">Peak: 06:00 & 18:30</span>
          </div>

          {/* Bar Chart Visualizer with Tooltip & Highlights */}
          <div className="h-44 w-full flex items-end gap-2 pt-6 pb-2 border-b border-stone-800 px-1">
            {[
              { time: '04:00', users: '120k', pct: 60, high: false },
              { time: '06:00', users: '240k', pct: 96, high: true },
              { time: '08:00', users: '210k', pct: 85, high: true },
              { time: '10:00', users: '135k', pct: 54, high: false },
              { time: '12:00', users: '98k',  pct: 40, high: false },
              { time: '14:00', users: '80k',  pct: 32, high: false },
              { time: '16:00', users: '145k', pct: 58, high: false },
              { time: '18:30', users: '230k', pct: 92, high: true },
              { time: '21:00', users: '110k', pct: 45, high: false },
            ].map((slot, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-mono text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {slot.users}
                </span>
                <div 
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    slot.high 
                      ? 'bg-gradient-to-t from-amber-600 to-orange-500 shadow-md shadow-amber-500/20' 
                      : 'bg-stone-700 hover:bg-stone-600'
                  }`}
                  style={{ height: `${slot.pct}%` }}
                />
                <span className="text-[10px] text-stone-400 font-mono mt-1">{slot.time}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-500" />
              <span>Aarti & Shahi Snan Surge Windows</span>
            </span>
            <span>Total Active Devices: 1.48M</span>
          </div>
        </div>

        {/* Chart 2: Vendor Registrations Over Time */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-amber-100 font-cinzel flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Vendor Registrations Over Time</span>
              </h3>
              <p className="text-xs text-stone-400">Merchant licensing rollout trajectory</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">+38 this week</span>
          </div>

          {/* Area/Bar Progression Chart */}
          <div className="h-44 w-full flex items-end gap-3 pt-6 pb-2 border-b border-stone-800 px-2">
            {[
              { label: 'Week 1', count: 18, pct: 25 },
              { label: 'Week 2', count: 35, pct: 45 },
              { label: 'Week 3', count: 62, pct: 65 },
              { label: 'Week 4', count: 98, pct: 85 },
              { label: 'Now', count: 140, pct: 100 },
            ].map((wk, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-mono text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {wk.count}
                </span>
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-teal-400 transition-all duration-300 shadow-sm"
                  style={{ height: `${wk.pct}%` }}
                />
                <span className="text-[10px] text-stone-400 font-mono mt-1">{wk.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
            <span>FSSAI Approval Rate: <b className="text-emerald-300">96.8%</b></span>
            <span>Target: 200 Booths</span>
          </div>
        </div>

      </div>

      {/* Emergency Quick Dispatch Action Board */}
      <div className="p-5 sm:p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-amber-100 font-cinzel flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400" />
            <span>Field Responder Quick Dispatch</span>
          </h3>
          <span className="text-xs text-stone-400">Wireless Control Terminal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'River Divers Rescue Boat #2', desc: 'Tapovan Jetty • Standby', icon: '🚤' },
            { name: 'Rapid Medical Ambulance E-1', desc: 'Parking P3 • High Readiness', icon: '🚑' },
            { name: 'Ramkund Crowd Diverter Squad', desc: 'Barricade Sector 1 • Active', icon: '🚧' },
            { name: 'Bio-Sanitation Jet Pressure Unit', desc: 'Godavari Promenade • Scheduled', icon: '💧' },
          ].map((unit, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 flex flex-col justify-between gap-3 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
                  <span>{unit.icon}</span>
                  <span className="truncate">{unit.name}</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">{unit.desc}</p>
              </div>
              <button
                type="button"
                id={`btn-dispatch-${idx}`}
                onClick={() => handleQuickDispatch(unit.name)}
                className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Dispatch Unit
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
