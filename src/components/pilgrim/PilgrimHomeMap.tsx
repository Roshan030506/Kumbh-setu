import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { Facility, FacilityCategory } from '../../types';
import { FacilityDetailModal } from './FacilityDetailModal';
import { 
  Search, 
  MapPin, 
  Cross, 
  Utensils, 
  Droplet, 
  Layers, 
  Bed, 
  Car, 
  Sparkles, 
  Check, 
  Info,
  Clock,
  Compass
} from 'lucide-react';

export const PilgrimHomeMap: React.FC = () => {
  const { 
    facilities, 
    selectedFacility, 
    setSelectedFacility, 
    setPilgrimScreen, 
    t, 
    playClick, 
    language,
    elderlyMode 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<FacilityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const categories: { key: FacilityCategory | 'all'; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'all', label: t.all, icon: <Layers className="w-3.5 h-3.5" />, color: 'bg-stone-700' },
    { key: 'ghat', label: t.ghats, icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-amber-600' },
    { key: 'medical', label: t.medical, icon: <Cross className="w-3.5 h-3.5" />, color: 'bg-red-600' },
    { key: 'food', label: t.food, icon: <Utensils className="w-3.5 h-3.5" />, color: 'bg-orange-500' },
    { key: 'water', label: t.water, icon: <Droplet className="w-3.5 h-3.5" />, color: 'bg-sky-500' },
    { key: 'toilet', label: t.toilets, icon: <Layers className="w-3.5 h-3.5" />, color: 'bg-emerald-600' },
    { key: 'lodging', label: t.lodging, icon: <Bed className="w-3.5 h-3.5" />, color: 'bg-indigo-600' },
    { key: 'parking', label: t.parking, icon: <Car className="w-3.5 h-3.5" />, color: 'bg-purple-600' },
  ];

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    return facilities.filter(f => {
      const matchesCat = activeCategory === 'all' || f.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        f.name.toLowerCase().includes(query) ||
        f.address.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query) ||
        (f.nameHi && f.nameHi.toLowerCase().includes(query)) ||
        (f.nameMr && f.nameMr.toLowerCase().includes(query));
      
      const matchesElderly = !elderlyMode || f.accessibilityFeatures.length > 0 || f.category === 'medical' || f.isFree;
      return matchesCat && matchesSearch && matchesElderly;
    });
  }, [facilities, activeCategory, searchQuery, elderlyMode]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Ramkund / Godavari Riverbank, Nashik
      const map = L.map(mapContainerRef.current, {
        center: [19.9975, 73.7898],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const categoryColors: Record<string, string> = {
      ghat: '#d97706',
      medical: '#dc2626',
      food: '#ea580c',
      water: '#0284c7',
      toilet: '#059669',
      lodging: '#4f46e5',
      parking: '#7c3aed'
    };

    filteredFacilities.forEach((facility) => {
      const color = categoryColors[facility.category] || '#d97706';
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: ${color};
            color: #ffffff;
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="transform: rotate(45deg); font-weight: bold; font-size: 11px;">
              ${facility.category.charAt(0).toUpperCase()}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([facility.lat, facility.lng], { icon: customIcon });

      const name = language === 'hi' && facility.nameHi ? facility.nameHi : language === 'mr' && facility.nameMr ? facility.nameMr : facility.name;

      marker.bindPopup(`
        <div style="font-family: inherit; min-width: 180px; padding: 4px;">
          <b style="color: #1c1917; font-size: 13px; display: block;">${name}</b>
          <span style="font-size: 11px; color: #78716c; display: block; margin-top: 2px;">${facility.address}</span>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            <span style="font-size: 10px; font-weight: bold; background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px;">
              ${facility.isFree ? 'Free' : facility.priceText || 'Verified'}
            </span>
            <span style="font-size: 10px; color: #059669; font-weight: bold;">
              ~${facility.waitTimeMinutes ?? 5} min wait
            </span>
          </div>
        </div>
      `);

      marker.on('click', () => {
        playClick();
        setSelectedFacility(facility);
      });

      layer.addLayer(marker);
    });
  }, [filteredFacilities, language, playClick, setSelectedFacility]);

  const handleSelectTag = (cat: FacilityCategory | 'all') => {
    playClick();
    setActiveCategory(cat);
  };

  const centerOnFacility = (facility: Facility) => {
    playClick();
    setSelectedFacility(facility);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([facility.lat, facility.lng], 17, { duration: 1.2 });
    }
  };

  return (
    <div className="relative h-[calc(100vh-112px)] md:h-[calc(100vh-100px)] w-full flex flex-col overflow-hidden bg-stone-900 text-stone-100">
      
      {/* Search & Filter Floating Overlay */}
      <div className="absolute top-3 left-3 right-3 sm:left-6 sm:right-6 z-30 flex flex-col gap-2 max-w-4xl mx-auto pointer-events-none">
        
        {/* Search Bar */}
        <div className="pointer-events-auto flex items-center gap-2 bg-stone-900/90 backdrop-blur-md p-2 rounded-2xl border border-stone-700/80 shadow-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-facility-search"
              placeholder="Search Ramkund, toilets, medical camp, free prasadam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 text-xs sm:text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            id="btn-open-safe-routes"
            onClick={() => {
              playClick();
              setPilgrimScreen('routes');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{t.crowdAwareRoute}</span>
          </button>
        </div>

        {/* Category Scrollable Pills */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar px-0.5">
          {categories.map((c) => (
            <button
              key={c.key}
              id={`cat-pill-${c.key}`}
              onClick={() => handleSelectTag(c.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-md transform hover:-translate-y-0.5 active:scale-95 ${
                activeCategory === c.key
                  ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400/40 font-extrabold'
                  : 'bg-stone-900/90 text-stone-300 border border-stone-700/80 hover:bg-stone-800'
              }`}
            >
              {c.icon}
              <span>{c.label}</span>
              {activeCategory === c.key && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
          ))}
        </div>

        {/* Elderly Mode Active Banner */}
        {elderlyMode && (
          <div className="pointer-events-auto self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Assisted Mode Active: Prioritizing Step-free ramps, e-carts & medical booths</span>
          </div>
        )}
      </div>

      {/* Interactive Leaflet Map Canvas */}
      <div 
        ref={mapContainerRef} 
        id="pilgrim-leaflet-map"
        className="w-full h-full bg-stone-950" 
      />

      {/* Bottom Horizontal Facility Cards Drawer (Swipeable / Clickable) */}
      <div className="absolute bottom-16 md:bottom-4 left-3 right-3 z-30 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar pointer-events-auto">
          {filteredFacilities.slice(0, 6).map((facility) => (
            <div
              key={facility.id}
              id={`facility-card-${facility.id}`}
              onClick={() => centerOnFacility(facility)}
              className="min-w-[260px] sm:min-w-[290px] max-w-[300px] p-3 rounded-2xl bg-stone-900/95 border border-stone-700/90 shadow-2xl backdrop-blur-md cursor-pointer hover:border-amber-500/80 hover:bg-stone-900 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <img 
                  src={facility.photos[0]} 
                  alt={facility.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-800"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">
                      {facility.category}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                      {facility.isFree ? 'Free' : facility.priceText || 'Verified'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-100 truncate mt-0.5">
                    {language === 'hi' && facility.nameHi ? facility.nameHi : language === 'mr' && facility.nameMr ? facility.nameMr : facility.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{facility.distanceMeters}m</span>
                    <span>•</span>
                    <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>~{facility.waitTimeMinutes ?? 5}m</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <FacilityDetailModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
          onNavigateToRoutes={() => setPilgrimScreen('routes')}
        />
      )}

    </div>
  );
};
