import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { LostPersonData } from '../../types';
import { 
  UserX, 
  Upload, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Camera, 
  AlertTriangle, 
  Phone, 
  Clock, 
  Users
} from 'lucide-react';

export const LostPersonScreen: React.FC = () => {
  const { t, reportLostPerson, alerts, playClick, showToast, currentUser } = useApp();

  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(68);
  const [gender, setGender] = useState('Male');
  const [lastSeenLocation, setLastSeenLocation] = useState('Near Kalaram Mandir Gate 2');
  const [clothing, setClothing] = useState('White Kurta, saffron shawl, wearing metal watch and spectacles');
  const [guardianPhone, setGuardianPhone] = useState(currentUser?.phone || '9822109876');
  const [guardianName, setGuardianName] = useState(currentUser?.name || 'Devotee Family Member');
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  );
  const [pinCoords, setPinCoords] = useState<[number, number]>([19.9990, 73.7918]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const miniMapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize mini pin-drop map
  useEffect(() => {
    if (!miniMapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(miniMapRef.current, {
        center: pinCoords,
        zoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      const pinIcon = L.divIcon({
        className: 'lost-person-pin',
        html: `<div style="background:#dc2626;color:#fff;width:28px;height:28px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.5);font-size:12px;">📍</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const marker = L.marker(pinCoords, { icon: pinIcon, draggable: true }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        setPinCoords([pos.lat, pos.lng]);
        playClick();
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        setPinCoords([e.latlng.lat, e.latlng.lng]);
        playClick();
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playClick();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        showToast('Photo Uploaded', 'Attached photograph for facial matching', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!name.trim()) {
      showToast('Name Required', 'Please provide the name of the missing person', 'alert');
      return;
    }

    const reportData: LostPersonData = {
      name,
      age: Number(age),
      gender,
      lastSeenTime: 'Recently (~20 mins ago)',
      photoUrl: photoPreview || undefined,
      clothing,
      guardianName,
      guardianPhone
    };

    reportLostPerson(reportData, pinCoords[0], pinCoords[1], lastSeenLocation);
    setIsSubmitted(true);
  };

  const activeMissingAlerts = alerts.filter(a => a.type === 'lost_person');

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-4xl mx-auto w-full p-4 sm:p-6 text-stone-100">
      
      {/* Title */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
              {t.reportLostPerson}
            </h1>
            <p className="text-xs text-stone-400">
              Instant digital bulletin broadcast to all 12 Mela information booths & police units
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-950/80 text-orange-300 border border-orange-500/40 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
          <span>Active Missing Bulletins: {activeMissingAlerts.length}</span>
        </span>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4 bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-2xl shadow-xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                  {t.lostPersonName} *
                </label>
                <input
                  type="text"
                  id="input-lost-name"
                  placeholder="e.g. Rameshwar Joshi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    {t.lostPersonAge}
                  </label>
                  <input
                    type="number"
                    id="input-lost-age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    {t.lostPersonGender}
                  </label>
                  <select
                    id="select-lost-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-2.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Child">Child</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                {t.clothingDesc}
              </label>
              <textarea
                id="input-lost-clothing"
                rows={2}
                value={clothing}
                onChange={(e) => setClothing(e.target.value)}
                placeholder="Color of saree/kurta, distinctive shawl, bag, glasses or marks"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                {t.lastSeenLocation}
              </label>
              <input
                type="text"
                id="input-lost-spot"
                value={lastSeenLocation}
                onChange={(e) => setLastSeenLocation(e.target.value)}
                placeholder="e.g. Near Ramkund Bridge Stairs, Sector 1"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Photo Upload Section */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                {t.uploadPhoto}
              </label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-amber-500/40 shrink-0">
                    <img
                      src={photoPreview}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-600 shrink-0">
                    <Camera className="w-6 h-6" />
                  </div>
                )}

                <label 
                  htmlFor="input-photo-file"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-dashed border-stone-700 hover:border-amber-500 text-xs text-stone-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Choose Photo (or use demo picture)</span>
                  <input
                    type="file"
                    id="input-photo-file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Guardian Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-800">
              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Contact Phone (Guardian)
                </label>
                <input
                  type="tel"
                  id="input-guardian-phone"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Guardian Name
                </label>
                <input
                  type="text"
                  id="input-guardian-name"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-lost-report"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitReport}</span>
              </button>
            </div>

          </form>

          {/* Location Pin-Drop Map & Live Alerts ticker */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Pinpoint Last Seen Spot</span>
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  {pinCoords[0].toFixed(4)}, {pinCoords[1].toFixed(4)}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Click on the map or drag the pin to mark the exact spot where the person was last seen.
              </p>

              <div 
                ref={miniMapRef} 
                id="lost-person-mini-map"
                className="w-full h-48 rounded-xl overflow-hidden border border-stone-800 bg-stone-950" 
              />
            </div>

            {/* Active Missing Person Bulletins */}
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Recent Missing Person Broadcasts</span>
              </h4>

              <div className="space-y-2.5">
                {activeMissingAlerts.slice(0, 2).map((alt) => (
                  <div key={alt.id} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-xs">
                    {alt.lostPersonDetails?.photoUrl && (
                      <img
                        src={alt.lostPersonDetails.photoUrl}
                        alt="Missing"
                        className="w-10 h-10 rounded-lg object-cover border border-stone-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-amber-200 truncate">{alt.title}</h5>
                        <span className="text-[10px] text-stone-400">{alt.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">{alt.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Confirmation State */
        <div className="p-8 rounded-3xl bg-stone-900 border border-emerald-500/40 text-center max-w-xl mx-auto space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-stone-100 font-cinzel">Report Broadcasted Successfully</h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
              {t.reportBroadcastSuccess}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
            <div><b className="text-stone-400">Missing Person:</b> <span className="text-stone-200">{name} ({age} yrs, {gender})</span></div>
            <div><b className="text-stone-400">Attire:</b> <span className="text-stone-200">{clothing}</span></div>
            <div><b className="text-stone-400">Last Seen:</b> <span className="text-stone-200">{lastSeenLocation}</span></div>
            <div><b className="text-stone-400">Guardian Contact:</b> <span className="text-amber-400 font-mono">{guardianPhone}</span></div>
          </div>

          <button
            id="btn-report-another-lost"
            onClick={() => {
              playClick();
              setIsSubmitted(false);
              setName('');
            }}
            className="py-2.5 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Submit Another Report / View Form
          </button>
        </div>
      )}

    </div>
  );
};
