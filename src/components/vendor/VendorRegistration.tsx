import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { VendorMenuItem } from '../../types';
import { 
  Store, 
  MapPin, 
  Plus, 
  Trash2, 
  Upload, 
  Save, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';

export const VendorRegistration: React.FC = () => {
  const { registerVendor, setVendorScreen, t, playClick, showToast, currentUser, currentVendor } = useApp();

  const [businessName, setBusinessName] = useState(currentVendor?.businessName || '');
  const [ownerName, setOwnerName] = useState(currentVendor?.ownerName || currentUser?.name || 'Santosh Vitthal Joshi');
  const [phone, setPhone] = useState(currentVendor?.phone || currentUser?.phone || '9822456789');
  const [category, setCategory] = useState(currentVendor?.category || 'Food Stall');
  const [description, setDescription] = useState(currentVendor?.description || 'Traditional satvik food and refreshments served fresh under Nashik Municipal Corporation fair price directives.');
  const [address, setAddress] = useState(currentVendor?.address || 'Sector 2, Godavari Ghat Road, Panchavati');
  const [pinCoords, setPinCoords] = useState<[number, number]>([currentVendor?.lat || 19.9978, currentVendor?.lng || 73.7905]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    currentVendor?.photos?.[0] || 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=600&q=80'
  );

  const [menuItems, setMenuItems] = useState<VendorMenuItem[]>(
    currentVendor?.menuOrProducts?.length 
      ? currentVendor.menuOrProducts 
      : [
          { name: 'Sabudana Khichdi (Upvas Special)', price: 40 },
          { name: 'Pure Cow Milk Peda (200g)', price: 90 },
          { name: 'Panchamrit Cup', price: 20 }
        ]
  );
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number | ''>('');

  const miniMapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Mini Map for Stall Pin Drop
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
        className: 'vendor-stall-pin',
        html: `<div style="background:#0284c7;color:#fff;width:30px;height:30px;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.5);font-size:14px;">🏪</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
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

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    playClick();
    setMenuItems(prev => [...prev, { name: newItemName.trim(), price: Number(newItemPrice) }]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleRemoveItem = (index: number) => {
    playClick();
    setMenuItems(prev => prev.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playClick();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        showToast('Stall Photo Attached', 'Image added to registration bundle', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!businessName.trim()) {
      showToast('Business Name Required', 'Please provide your stall or establishment name', 'alert');
      return;
    }

    registerVendor({
      businessName,
      ownerName,
      phone,
      category,
      description,
      address,
      lat: pinCoords[0],
      lng: pinCoords[1],
      menuOrProducts: menuItems,
      photos: photoPreview ? [photoPreview] : []
    });

    // Advance to Certificate OCR screen
    setVendorScreen('certificate');
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-4xl mx-auto w-full p-4 sm:p-6 text-stone-100">
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
              {t.vendorRegister}
            </h1>
            <p className="text-xs text-stone-400">
              Kumbh Mela 2026 Nashik Authorized Merchant Licensing & Stall Directory
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Details & Menu */}
        <div className="lg:col-span-7 space-y-4 bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-2xl shadow-xl">
          
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              {t.businessName} *
            </label>
            <input
              type="text"
              id="input-vendor-business-name"
              placeholder="e.g. Godavari Pure Satvik Bhojanalaya"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                id="select-vendor-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="Food Stall">Food Stall & Refreshments</option>
                <option value="Restaurant">Restaurant / Satvik Bhojanalaya</option>
                <option value="Lodge">Lodge / Dharamshala</option>
                <option value="Medical">Medical / Emergency First Aid</option>
                <option value="Parking">Parking / Cloakroom Service</option>
                <option value="Prasad & Sweets">Prasad & Traditional Sweets</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Owner / Authorized Representative *
              </label>
              <input
                type="text"
                id="input-vendor-owner"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Description & Devotee Services
            </label>
            <textarea
              id="input-vendor-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe offerings, satvik purity, dietary hygiene, or lodging accommodations..."
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Assigned Stall Physical Address / Sector *
            </label>
            <input
              type="text"
              id="input-vendor-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          {/* Pricing & Menu Builder */}
          <div className="pt-2 border-t border-stone-800">
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Menu Items & Regulated Pricing
            </label>

            {/* Add item input row */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Item name (e.g. Sabudana Khichdi)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
              <input
                type="number"
                placeholder="₹ Price"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-24 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                id="btn-add-menu-item"
                onClick={handleAddItem}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Items list */}
            <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs">
                  <span className="font-medium text-stone-200">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-amber-300 font-bold">₹{item.price}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-stone-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo upload */}
          <div className="pt-2 border-t border-stone-800">
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Stall Frontage Photograph
            </label>
            <div className="flex items-center gap-3">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Stall preview"
                  className="w-14 h-14 rounded-xl object-cover border border-stone-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-600">
                  <Camera className="w-5 h-5" />
                </div>
              )}
              <label 
                htmlFor="input-vendor-photo"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-dashed border-stone-700 text-xs text-stone-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                <span>Choose Frontage Image</span>
                <input
                  type="file"
                  id="input-vendor-photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              id="btn-save-stall-registration"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Save Stall & Proceed to OCR Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Location Pin Drop Map */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Pinpoint Stall on Holy Map</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                {pinCoords[0].toFixed(4)}, {pinCoords[1].toFixed(4)}
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Drag the blue marker to your assigned booth/stall location. Pilgrims will navigate directly to this spot.
            </p>

            <div 
              ref={miniMapRef} 
              id="vendor-registration-mini-map"
              className="w-full h-64 rounded-xl overflow-hidden border border-stone-800 bg-stone-950" 
            />
          </div>

          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-2">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>Next Step: Instant OCR Verification</span>
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Once submitted, you will upload your FSSAI or municipal trade certificate. Our simulated OCR engine extracts valid license numbers in 2 seconds to issue your official digital verified badge.
            </p>
          </div>
        </div>

      </form>

    </div>
  );
};
