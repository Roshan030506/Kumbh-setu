import React from 'react';
import { Facility } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Navigation as NavIcon, 
  Phone, 
  Accessibility, 
  Users, 
  Star, 
  CheckCircle2 
} from 'lucide-react';

interface FacilityDetailModalProps {
  facility: Facility;
  onClose: () => void;
  onNavigateToRoutes?: () => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({ 
  facility, 
  onClose,
  onNavigateToRoutes 
}) => {
  const { t, playClick, language } = useApp();

  const displayName = language === 'hi' && facility.nameHi 
    ? facility.nameHi 
    : language === 'mr' && facility.nameMr 
    ? facility.nameMr 
    : facility.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-100 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo Banner */}
        <div className="relative h-48 sm:h-56 w-full bg-stone-950">
          <img 
            src={facility.photos[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'} 
            alt={facility.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />

          {/* Close Button */}
          <button
            id="btn-close-facility-modal"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/70 text-stone-300 hover:text-white hover:bg-stone-900 transition-colors border border-stone-700"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category Pill & Verified Badge */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-amber-500 text-stone-950 shadow-md">
              {facility.category.toUpperCase()}
            </span>

            {facility.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.verifiedBadge}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-bold text-amber-100 font-cinzel">
                {displayName}
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{facility.rating}</span>
                <span className="text-stone-400 text-[10px]">({facility.reviewsCount})</span>
              </div>
            </div>

            <p className="flex items-center gap-1.5 text-xs text-stone-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{facility.address} • {facility.distanceMeters}m away</span>
            </p>
          </div>

          {/* Key Metrics / Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-2">
            <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">{t.freeService} / Tariff</span>
              <span className="text-xs font-bold text-amber-300 mt-0.5 block truncate">
                {facility.isFree ? '100% Free Service' : facility.priceText || 'Regulated Rate'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">{t.liveWaitTime}</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>~{facility.waitTimeMinutes ?? 5} mins wait</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Crowd Density</span>
              <span className="text-xs font-bold text-sky-300 mt-0.5 flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{facility.capacityPercent ?? 50}% capacity</span>
              </span>
            </div>
          </div>

          {/* Live Status Note */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
            <b className="text-amber-300 font-semibold block mb-0.5">Live On-Site Status:</b>
            {facility.liveStatus}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-1">About Facility</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {facility.description}
            </p>
          </div>

          {/* Accessibility Features */}
          {facility.accessibilityFeatures?.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                <Accessibility className="w-3.5 h-3.5" />
                <span>Accessibility & Special Support</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {facility.accessibilityFeatures.map((feat, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-stone-950 border border-emerald-500/30 text-emerald-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timing & Contact */}
          <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{facility.openHours}</span>
            </span>
            {facility.contactPhone && (
              <a 
                href={`tel:${facility.contactPhone}`}
                className="flex items-center gap-1 text-amber-400 hover:underline font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{facility.contactPhone}</span>
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {onNavigateToRoutes && (
              <button
                id="btn-modal-navigate"
                onClick={() => {
                  playClick();
                  onClose();
                  onNavigateToRoutes();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all active:scale-[0.98]"
              >
                <NavIcon className="w-4 h-4" />
                <span>{t.directions} (Crowd-Safe)</span>
              </button>
            )}

            <button
              id="btn-modal-close"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
