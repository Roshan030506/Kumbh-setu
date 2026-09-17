import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { ROUTE_OPTIONS, CROWD_ZONES } from '../../services/mockData';
import { RouteOption } from '../../types';
import { 
  Navigation, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Accessibility, 
  TrendingDown, 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';

export const RouteScreen: React.FC = () => {
  const { t, playClick, playToggle, showToast, elderlyMode } = useApp();

  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-crowd-aware');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [navStepIndex, setNavStepIndex] = useState<number>(0);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);

  const normalRoute = ROUTE_OPTIONS.find(r => r.type === 'normal')!;
  const crowdRoute = ROUTE_OPTIONS.find(r => r.type === 'crowd_aware')!;
  const activeRoute = selectedRouteId === 'route-crowd-aware' ? crowdRoute : normalRoute;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [19.9985, 73.7925],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      zonesLayerRef.current = L.layerGroup().addTo(map);
      routesLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Draw Crowd Zones & Routes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const zonesLayer = zonesLayerRef.current;
    const routesLayer = routesLayerRef.current;
    if (!map || !zonesLayer || !routesLayer) return;

    zonesLayer.clearLayers();
    routesLayer.clearLayers();

    // 1. Draw Crowd Congestion Polygons
    CROWD_ZONES.forEach(zone => {
      const color = zone.severity === 'heavy' ? '#ef4444' : zone.severity === 'moderate' ? '#f59e0b' : '#10b981';
      const polygon = L.polygon(zone.coordinates, {
        color: color,
        fillColor: color,
        fillOpacity: 0.32,
        weight: 2,
        dashArray: zone.severity === 'heavy' ? '6, 6' : undefined
      });

      polygon.bindPopup(`
        <div style="font-family: inherit; font-size: 12px;">
          <b style="color: ${color}; text-transform: uppercase;">${zone.name}</b>
          <div style="margin-top: 4px; font-weight: bold;">Crowd Density: ${zone.densityPercent}%</div>
          <div style="color: #64748b; font-size: 11px; margin-top: 2px;">${zone.currentFootfall}</div>
          <div style="margin-top: 4px; color: #334155; font-size: 11px;">${zone.advice}</div>
        </div>
      `);

      zonesLayer.addLayer(polygon);
    });

    // 2. Draw Start (Parking P3) & End (Ramkund Ghat) Pins
    const startIcon = L.divIcon({
      className: 'route-marker-start',
      html: `<div style="background:#0284c7;color:#fff;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);white-space:nowrap;">📍 Start: Parking P-3</div>`,
      iconSize: [120, 26],
      iconAnchor: [60, 26]
    });
    L.marker([20.0035, 73.7950], { icon: startIcon }).addTo(routesLayer);

    const endIcon = L.divIcon({
      className: 'route-marker-end',
      html: `<div style="background:#d97706;color:#fff;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);white-space:nowrap;">🕉️ Ramkund Ghat</div>`,
      iconSize: [110, 26],
      iconAnchor: [55, 26]
    });
    L.marker([19.9975, 73.7898], { icon: endIcon }).addTo(routesLayer);

    // 3. Draw Inactive Route in background
    const inactiveRoute = selectedRouteId === 'route-crowd-aware' ? normalRoute : crowdRoute;
    const inactivePolyline = L.polyline(inactiveRoute.points, {
      color: '#78716c',
      weight: 4,
      opacity: 0.5,
      dashArray: '5, 8'
    });
    routesLayer.addLayer(inactivePolyline);

    // 4. Draw Active Route highlighted
    const isActiveCrowd = selectedRouteId === 'route-crowd-aware';
    const activeColor = isActiveCrowd ? '#0284c7' : '#ef4444';

    const activePolyline = L.polyline(activeRoute.points, {
      color: activeColor,
      weight: 6,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round'
    });
    routesLayer.addLayer(activePolyline);

    map.fitBounds(activePolyline.getBounds(), { padding: [50, 50] });

  }, [selectedRouteId, normalRoute, crowdRoute, activeRoute]);

  const handleToggleRoute = (routeId: string) => {
    playClick();
    setSelectedRouteId(routeId);
    showToast(
      routeId === 'route-crowd-aware' ? 'Crowd-Aware Safe Route Selected' : 'Standard Direct Route Selected',
      routeId === 'route-crowd-aware' ? 'AI guidance bypasses Ramkund bottlenecks' : 'Note: Passes through 91% density red congestion zone',
      routeId === 'route-crowd-aware' ? 'success' : 'alert'
    );
  };

  const handleStartWalk = () => {
    playToggle(true);
    setIsNavigating(true);
    setNavStepIndex(0);
    showToast('Navigation Started', 'Follow high-contrast audio cues and physical signage', 'success');
  };

  const navSteps = [
    'Head South from Panchavati Parking P-3 onto Wide Bypass Promenade',
    'Follow gentle ramp towards Kapila Sangam Walkway (Avoid bazaar corridor)',
    'Continue along Riverwalk promenade under mist-cooling shades',
    'Arrive comfortably at Ramkund Holy Ghat West Accessibility Ramp'
  ];

  return (
    <div className="relative h-[calc(100vh-112px)] md:h-[calc(100vh-100px)] w-full flex flex-col md:flex-row overflow-hidden bg-stone-950 text-stone-100">
      
      {/* Map Half / Area */}
      <div className="h-[55%] md:h-full md:flex-1 relative order-1 md:order-2">
        <div ref={mapContainerRef} className="w-full h-full bg-stone-900" />

        {/* Legend Overlay */}
        <div className="absolute top-3 right-3 z-30 bg-stone-900/90 backdrop-blur-md p-2.5 rounded-xl border border-stone-700 shadow-xl text-[11px] space-y-1.5">
          <span className="font-bold text-stone-300 block uppercase tracking-wider text-[10px]">Crowd Density Zones</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-500/80 border border-red-400" />
            <span className="text-stone-300">Bottleneck Zone (&gt;85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500/80 border border-amber-400" />
            <span className="text-stone-300">Moderate Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500/80 border border-emerald-400" />
            <span className="text-stone-300">Free Flow Corridor</span>
          </div>
        </div>
      </div>

      {/* Control / Details Sidebar */}
      <div className="h-[45%] md:h-full md:w-96 lg:w-[420px] bg-stone-900 border-t md:border-t-0 md:border-r border-stone-800 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto no-scrollbar order-2 md:order-1 z-30 shadow-2xl">
        
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-amber-100 font-cinzel">
                  {t.routeComparison}
                </h2>
                <p className="text-[11px] text-stone-400">Panchavati P-3 ➔ Ramkund Holy Snan</p>
              </div>
            </div>

            {elderlyMode && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Accessibility className="w-3 h-3" />
                <span>Ramp Mode</span>
              </span>
            )}
          </div>

          {/* 2 Route Toggle Cards */}
          <div className="space-y-2.5">
            {/* 1. Crowd-Aware Route (Recommended) */}
            <div
              id="card-route-crowd-aware"
              onClick={() => handleToggleRoute('route-crowd-aware')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all transform hover:-translate-y-0.5 ${
                selectedRouteId === 'route-crowd-aware'
                  ? 'bg-sky-950/40 border-sky-500 ring-2 ring-sky-500/20 shadow-lg'
                  : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    ★ AI Recommended Safe Route
                  </span>
                  <h4 className="text-sm font-bold text-stone-100 mt-1">
                    River Promenade Bypass
                  </h4>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-stone-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">Est. Time</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 18 mins
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Distance</span>
                  <span className="font-bold text-stone-200">1.45 km</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Crowd Risk</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Very Low
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Visibly curves around Ramkund high-density red zone. Ramp equipped.</span>
              </p>
            </div>

            {/* 2. Direct Normal Route (Bottleneck) */}
            <div
              id="card-route-normal"
              onClick={() => handleToggleRoute('route-normal')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all transform hover:-translate-y-0.5 ${
                selectedRouteId === 'route-normal'
                  ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/20 shadow-lg'
                  : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 uppercase tracking-wider">
                    Direct (Congested)
                  </span>
                  <h4 className="text-sm font-bold text-stone-100 mt-1">
                    Temple Bazaar Direct Road
                  </h4>
                </div>
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-stone-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">Est. Time</span>
                  <span className="font-bold text-red-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 34 mins
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Distance</span>
                  <span className="font-bold text-stone-200">1.10 km</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Crowd Risk</span>
                  <span className="font-bold text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Heavy 91%
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-red-300/80 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Heavy pedestrian bottleneck. Barricade checks delay movement.</span>
              </p>
            </div>
          </div>

          {/* Active Route Turn-by-Turn Highlights */}
          <div className="mt-4 p-3 rounded-xl bg-stone-950 border border-stone-800">
            <h5 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Route Highlights & Safety Infrastructure
            </h5>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {activeRoute.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button & Guided Nav Walk mode */}
        <div className="pt-4 border-t border-stone-800">
          {!isNavigating ? (
            <button
              id="btn-start-navigation"
              onClick={handleStartWalk}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>{t.startNavigation} ({activeRoute.walkingMinutes} min)</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Walk in Progress
                </span>
                <button
                  id="btn-end-walk"
                  onClick={() => {
                    playClick();
                    setIsNavigating(false);
                  }}
                  className="text-[11px] text-stone-400 hover:text-stone-200 underline font-semibold"
                >
                  Exit Walk
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
                <span className="font-semibold">{navSteps[navStepIndex]}</span>
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-stone-400">Step {navStepIndex + 1} of {navSteps.length}</span>
                <button
                  id="btn-next-nav-step"
                  onClick={() => {
                    playClick();
                    if (navStepIndex < navSteps.length - 1) {
                      setNavStepIndex(i => i + 1);
                    } else {
                      showToast('Arrived at Destination', 'Welcome to Ramkund Sacred Ghat!', 'success');
                      setIsNavigating(false);
                    }
                  }}
                  className="px-2.5 py-1 rounded bg-emerald-500 text-stone-950 font-bold text-[11px] flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
