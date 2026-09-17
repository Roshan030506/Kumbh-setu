import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { CROWD_ZONES } from '../../services/mockData';
import { 
  Radio, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Compass, 
  Volume2,
  RefreshCw
} from 'lucide-react';

export const CrowdMonitoringMap: React.FC = () => {
  const { facilities, addAlert, t, playClick, playSuccess, showToast } = useApp();

  const [selectedZone, setSelectedZone] = useState<string>(CROWD_ZONES[0].id);
  const [isDiverted, setIsDiverted] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Mock Active Patrol Responders
  const patrolUnits = [
    { id: 'patrol-1', name: 'QRT Police Unit #14', lat: 19.9982, lng: 73.7915, status: 'On Patrol' },
    { id: 'patrol-2', name: 'River Divers Rescue Boat 2', lat: 19.9968, lng: 73.7885, status: 'On River Standby' },
    { id: 'patrol-3', name: 'Rapid Medical Ambulance E-1', lat: 20.0030, lng: 73.7942, status: 'Stationed Parking P3' },
    { id: 'patrol-4', name: 'Drone Aerial Surveillance #3', lat: 19.9995, lng: 73.7900, status: 'Hovering 120ft' }
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [19.9985, 73.7910],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // 1. Draw Crowd Polygons
      CROWD_ZONES.forEach(zone => {
        const color = zone.severity === 'heavy' ? '#ef4444' : zone.severity === 'moderate' ? '#f59e0b' : '#10b981';
        const polygon = L.polygon(zone.coordinates, {
          color: color,
          fillColor: color,
          fillOpacity: 0.38,
          weight: 3,
        });

        polygon.bindPopup(`
          <div style="font-family: inherit; min-width: 170px;">
            <b style="color: ${color}; text-transform: uppercase; font-size: 13px;">${zone.name}</b>
            <div style="font-size: 12px; margin-top: 4px; font-weight: bold;">Density: ${zone.densityPercent}%</div>
            <div style="font-size: 11px; color: #475569;">Footfall: ${zone.currentFootfall}</div>
            <div style="font-size: 11px; color: #1e293b; margin-top: 4px;">${zone.advice}</div>
          </div>
        `);

        polygon.on('click', () => {
          setSelectedZone(zone.id);
        });

        polygon.addTo(map);
      });

      // 2. Add Patrol Unit Markers
      patrolUnits.forEach(unit => {
        const patrolIcon = L.divIcon({
          className: 'patrol-marker',
          html: `
            <div style="background: #1e293b; color: #38bdf8; border: 2px solid #38bdf8; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(56,189,248,0.5); font-size: 11px;">
              👮
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = L.marker([unit.lat, unit.lng], { icon: patrolIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 11px;">
            <b>${unit.name}</b>
            <div style="color: #0284c7; font-weight: bold; margin-top: 2px;">Status: ${unit.status}</div>
          </div>
        `);
      });

      // 3. Add Facility Pins
      facilities.forEach(fac => {
        const facIcon = L.divIcon({
          className: 'admin-fac-pin',
          html: `<div style="background: #475569; color: #fff; width: 14px; height: 14px; border-radius: 50%; border: 1px solid #fff;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        L.marker([fac.lat, fac.lng], { icon: facIcon }).addTo(map);
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleTriggerDiversion = () => {
    playSuccess();
    setIsDiverted(true);

    addAlert({
      type: 'crowd_warning',
      severity: 'high',
      title: 'Dynamic Traffic Diversion: Ramkund West Stairs',
      details: 'Influx reaching 91% capacity limit. Barricade teams diverting pedestrian flow toward Laxman Kund and Kapila Sangam promenade.',
      location: 'Ramkund Sector 1 & Main Kund Bridge',
      status: 'active'
    });

    showToast(
      'Diversion Alert Broadcasted',
      'Digital signage and connected pilgrim apps updated to show safe bypass routes',
      'success'
    );
  };

  const activeZoneObj = CROWD_ZONES.find(z => z.id === selectedZone) || CROWD_ZONES[0];

  return (
    <div className="relative h-[calc(100vh-112px)] md:h-[calc(100vh-100px)] w-full flex flex-col md:flex-row overflow-hidden bg-stone-950 text-stone-100">
      
      {/* Map Half */}
      <div className="h-[60%] md:h-full md:flex-1 relative order-1 md:order-2">
        <div ref={mapContainerRef} className="w-full h-full bg-stone-900" />

        {/* Legend */}
        <div className="absolute top-3 right-3 z-30 bg-stone-900/95 backdrop-blur-md p-3 rounded-2xl border border-stone-700 shadow-2xl text-xs space-y-2">
          <span className="font-bold text-stone-200 block uppercase tracking-wider text-[10px]">
            Real-time Sensor Density
          </span>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-red-500/80 border border-red-400" />
            <span className="text-stone-300">Overcrowded (&gt;85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-amber-500/80 border border-amber-400" />
            <span className="text-stone-300">Moderate Flow (50-85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500/80 border border-emerald-400" />
            <span className="text-stone-300">Clear Promenade (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-stone-800">
            <span className="text-[12px]">👮</span>
            <span className="text-sky-300 font-semibold">Active Police / Rescue Patrol</span>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="h-[40%] md:h-full md:w-96 lg:w-[400px] bg-stone-900 border-t md:border-t-0 md:border-r border-stone-800 p-5 flex flex-col justify-between overflow-y-auto no-scrollbar order-2 md:order-1 z-30 shadow-2xl space-y-4">
        
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-100 font-cinzel">
                {t.crowdHeatmap} Telemetry
              </h2>
              <p className="text-[11px] text-stone-400">Drone Optical Sensors + IoT Gate Scanners</p>
            </div>
          </div>

          {/* Selected Zone Inspector */}
          <div className="mt-4 p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-stone-100 uppercase">{activeZoneObj.name}</h4>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                activeZoneObj.severity === 'heavy' 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {activeZoneObj.severity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Density Rate</span>
                <span className="font-bold text-red-400 text-base">{activeZoneObj.densityPercent}%</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-400 block">Current Footfall</span>
                <span className="font-bold text-stone-200 text-xs mt-1 block truncate">{activeZoneObj.currentFootfall}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-300/90 leading-relaxed bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
              <b className="text-amber-400 font-semibold block mb-0.5">Control Recommendation:</b>
              {activeZoneObj.advice}
            </p>
          </div>

          {/* Other Sector Density Pills */}
          <div className="mt-3 space-y-1.5">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Other Monitored Sectors:</span>
            {CROWD_ZONES.map(z => (
              <button
                key={z.id}
                onClick={() => {
                  playClick();
                  setSelectedZone(z.id);
                }}
                className={`w-full p-2 rounded-xl text-xs flex items-center justify-between border transition-all ${
                  selectedZone === z.id
                    ? 'bg-stone-800 border-amber-500 text-stone-100 font-bold'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>{z.name}</span>
                <span className="font-mono">{z.densityPercent}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button: Trigger Sector Diversion */}
        <div className="pt-3 border-t border-stone-800">
          <button
            type="button"
            id="btn-trigger-pedestrian-diversion"
            onClick={handleTriggerDiversion}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Trigger Crowd Diversion Advisory</span>
          </button>
        </div>

      </div>

    </div>
  );
};
