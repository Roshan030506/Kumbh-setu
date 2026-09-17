import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertItem } from '../../types';
import { 
  BellRing, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  UserX, 
  MapPin, 
  Clock, 
  Radio, 
  Megaphone,
  XCircle,
  Filter
} from 'lucide-react';

export const LiveAlertsPanel: React.FC = () => {
  const { alerts, addAlert, resolveAlert, t, playClick, playSuccess, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [severity, setSeverity] = useState<'high' | 'medium' | 'low'>('high');
  const [location, setLocation] = useState('Ramkund Sacred Ghat Sector 1');
  const [filterType, setFilterType] = useState<string>('all');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;

    playSuccess();

    addAlert({
      type: 'crowd_warning',
      severity,
      title: title.trim(),
      details: details.trim(),
      location: location.trim(),
      status: 'active'
    });

    setTitle('');
    setDetails('');
    showToast('Advisory Broadcasted', 'Instant push notification sent to all pilgrim handsets and PA systems', 'success');
  };

  const handleResolve = (alertId: string) => {
    playClick();
    resolveAlert(alertId);
    showToast('Alert Resolved', 'Incident marked as handled by control unit', 'info');
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterType === 'all') return true;
    if (filterType === 'active') return a.status === 'active';
    if (filterType === 'resolved') return a.status === 'resolved';
    if (filterType === 'sos') return a.type === 'sos';
    if (filterType === 'lost_person') return a.type === 'lost_person';
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-6xl mx-auto w-full p-4 sm:p-6 text-stone-100 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30">
            <BellRing className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
              {t.liveAlerts} & Public Broadcast
            </h1>
            <p className="text-xs text-stone-400">
              Emergency SOS dispatches, community lost person bulletins, and municipal safety advisories
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: 'all', label: 'All Alerts' },
            { key: 'active', label: 'Active (Unresolved)' },
            { key: 'sos', label: 'SOS Emergencies' },
            { key: 'lost_person', label: 'Missing Persons' },
            { key: 'resolved', label: 'Resolved' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => {
                playClick();
                setFilterType(f.key);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === f.key
                  ? 'bg-amber-500 text-stone-950 font-extrabold shadow-md'
                  : 'bg-stone-900 text-stone-400 border border-stone-800 hover:bg-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Stream of Incident Alerts */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400" />
            <span>Incoming Incident Telemetry Stream ({filteredAlerts.length})</span>
          </h3>

          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                id={`alert-card-${alert.id}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  alert.status === 'resolved'
                    ? 'bg-stone-900/40 border-stone-800/80 opacity-70'
                    : alert.severity === 'high'
                    ? 'bg-red-950/30 border-red-500/60 shadow-lg shadow-red-950/40'
                    : 'bg-stone-900 border-stone-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                      alert.type === 'sos'
                        ? 'bg-red-600/20 text-red-400 border border-red-500/40'
                        : alert.type === 'lost_person'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {alert.type === 'sos' ? (
                        <ShieldAlert className="w-5 h-5" />
                      ) : alert.type === 'lost_person' ? (
                        <UserX className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-100">{alert.title}</h4>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          alert.severity === 'high' 
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {alert.severity} Priority
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        {alert.details}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{alert.location}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-500" />
                          <span>{alert.timestamp}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resolve Button */}
                  {alert.status === 'active' ? (
                    <button
                      type="button"
                      id={`btn-resolve-${alert.id}`}
                      onClick={() => handleResolve(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Resolve</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-500/30 shrink-0">
                      Handled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Broadcast New Advisory Form */}
        <div className="lg:col-span-5 space-y-4">
          <form
            onSubmit={handleBroadcast}
            className="bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-3xl shadow-xl space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-100 font-cinzel">
                Broadcast Mela Advisory
              </h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Advisory Headline *
              </label>
              <input
                type="text"
                id="input-broadcast-title"
                placeholder="e.g. Ramkund West Gate Temporarily Closed"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Advisory Guidance & Action Message *
              </label>
              <textarea
                id="input-broadcast-details"
                rows={3}
                placeholder="Please direct pilgrims toward Tapovan Promenade. Mist coolers and water stations active."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                  Severity
                </label>
                <select
                  id="select-broadcast-severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="high">High (Red Alert)</option>
                  <option value="medium">Medium (Advisory)</option>
                  <option value="low">Low (General Info)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                  Affected Zone
                </label>
                <input
                  type="text"
                  id="input-broadcast-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-broadcast-alert"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast to All Pilgrims & Booths</span>
              </button>
            </div>
          </form>

          {/* PA System Notice */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-amber-400" />
              <span>Multi-Channel Audio Broadcast Relay</span>
            </span>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Broadcast advisories are automatically rendered to high-decibel speaker towers along the Godavari Ghats and pushed to local FM radio frequencies.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
