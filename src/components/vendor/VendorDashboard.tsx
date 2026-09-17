import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  FileText, 
  SlidersHorizontal, 
  PlusCircle, 
  QrCode, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  LogOut,
  Edit3,
  Bookmark,
  Eye,
  ShoppingBag,
  Volume2,
  Minus,
  Plus
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const { 
    currentVendor, 
    setVendorScreen, 
    toggleVendorOpen, 
    updateVendorStock, 
    logout, 
    t, 
    playClick, 
    playToggle, 
    playSuccess,
    showToast 
  } = useApp();

  const vendor = currentVendor;

  // Local stock counter state for plates / rooms
  const isRoomCategory = vendor.category === 'Lodge';
  const initialQuantity = isRoomCategory ? 4 : 18;
  const [unitCount, setUnitCount] = useState<number>(initialQuantity);

  const handleToggleOpen = () => {
    playToggle();
    toggleVendorOpen(vendor.id);
    showToast(
      vendor.isOpen ? 'Stall Marked Closed' : 'Stall Marked Open',
      vendor.isOpen ? 'Devotees will see stall as closed on live map' : 'Devotees can now find your stall on pilgrim map',
      vendor.isOpen ? 'alert' : 'success'
    );
  };

  const handleStockSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    updateVendorStock(vendor.id, val);
  };

  const adjustUnitCount = (delta: number) => {
    playClick();
    setUnitCount(prev => Math.max(0, prev + delta));
  };

  const handleEditBusiness = () => {
    playClick();
    setVendorScreen('registration');
  };

  const handleLogout = () => {
    playClick();
    logout();
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-5xl mx-auto w-full p-4 sm:p-6 text-stone-100 space-y-6">
      
      {/* 1. Header showing business name + Verified/Pending badge prominently */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/30 to-stone-900 border border-amber-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Business Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-700 flex items-center justify-center text-stone-950 font-bold shadow-xl shadow-amber-600/30 shrink-0">
              <Store className="w-8 h-8 text-stone-950" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
                  {vendor.businessName}
                </h1>
                
                {vendor.status === 'verified' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Official Merchant</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Pending Manual Review</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-300 mt-1.5 flex flex-wrap items-center gap-2">
                <span>Authorized Owner: <b>{vendor.ownerName}</b></span>
                <span>•</span>
                <span>Category: <b className="text-amber-400">{vendor.category}</b></span>
              </p>
              
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{vendor.address}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit Business Details & Logout */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800">
            <button
              id="btn-vendor-edit-details"
              onClick={handleEditBusiness}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 hover:border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Business Details</span>
            </button>

            <button
              id="btn-vendor-dashboard-logout"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-200 border border-red-800/40 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logout}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Live Operational Controls: Availability Switch & Stock/Room Availability Counter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Availability Toggle — Open/Closed Switch */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Live Storefront Status
              </span>
              <h3 className="text-base font-bold text-stone-100 mt-0.5">
                Stall Availability
              </h3>
            </div>

            <div className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              vendor.isOpen
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}>
              {vendor.isOpen ? '● OPEN TO DEVOTEES' : '○ CURRENTLY CLOSED'}
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed">
            Switching your stall to "Open" immediately updates the Pilgrim live interactive map and search index.
          </p>

          <div className="pt-2 flex items-center justify-between bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-xs text-stone-300 font-semibold">
              Broadcast Operational Status
            </span>

            {/* Custom Styled Switch with Hover and Click Sound */}
            <button
              id="toggle-vendor-open-switch"
              type="button"
              role="switch"
              aria-checked={vendor.isOpen}
              onClick={handleToggleOpen}
              onMouseEnter={() => playClick()}
              className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                vendor.isOpen ? 'bg-emerald-500' : 'bg-stone-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  vendor.isOpen ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Stock / Room Availability Slider & Unit Counter */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                {isRoomCategory ? 'Room & Bed Inventory' : 'Stock & Fresh Portions'}
              </span>
              <h3 className="text-base font-bold text-stone-100 mt-0.5">
                {isRoomCategory ? 'Accommodations Available' : 'Current Serving Stock'}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-lg font-mono font-black text-amber-400">
                {unitCount} {isRoomCategory ? 'Rooms Left' : 'Plates Left'}
              </span>
            </div>
          </div>

          {/* Stepper Counter & Percentage Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-xs text-stone-400 pl-1 font-medium">
                Adjust {isRoomCategory ? 'Rooms' : 'Plates'} Counter:
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-stock-minus"
                  onClick={() => adjustUnitCount(-1)}
                  className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center font-mono font-bold text-sm text-stone-100">
                  {unitCount}
                </span>
                <button
                  type="button"
                  id="btn-stock-plus"
                  onClick={() => adjustUnitCount(1)}
                  className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>Overall Stock Fill Ratio</span>
                <span className="font-mono font-bold text-stone-200">{vendor.stockLevelPercent}%</span>
              </div>
              <input
                type="range"
                id="input-vendor-stock-slider"
                min="0"
                max="100"
                value={vendor.stockLevelPercent}
                onChange={handleStockSliderChange}
                className="w-full accent-amber-500 bg-stone-950 cursor-pointer h-2 rounded-lg"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Quick Stats Cards (Today's views, saved by pilgrims count, footfall, FSSAI status) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Views */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Today's Views</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-stone-100 mt-2 font-mono">
            3,420
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+24% from morning aarti</span>
          </div>
        </div>

        {/* Saved by Pilgrims Count */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Saved by Pilgrims</span>
            <Bookmark className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-2 font-mono">
            486
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Bookmarked in Pilgrim App
          </div>
        </div>

        {/* FSSAI License OCR Card */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>FSSAI License</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xs font-mono font-bold text-stone-100 mt-2 truncate">
            {vendor.ocrDocument ? vendor.ocrDocument.licenseNumber : 'FSSAI-MH-2026-994821'}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>99.2% Validated</span>
          </div>
        </div>

        {/* Price Regulated Catalog */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Approved Items</span>
            <ShoppingBag className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-stone-100 mt-2 font-mono">
            {vendor.menuOrProducts.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Fair Price Directive Cap
          </div>
        </div>

      </div>

      {/* 4. Quick Navigation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          id="btn-dash-to-cert"
          onClick={() => {
            playClick();
            setVendorScreen('certificate');
          }}
          className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between group shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-200">Inspect FSSAI & OCR Verification</h4>
              <p className="text-[11px] text-stone-400">Re-scan document or view official municipal clearance seal</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400">View ➔</span>
        </div>

        <div 
          id="btn-dash-to-edit"
          onClick={handleEditBusiness}
          className="p-4 rounded-2xl bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between group shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-200">Update Stall & Menu Information</h4>
              <p className="text-[11px] text-stone-400">Adjust location pin drop, prices, or add items</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400">Edit ➔</span>
        </div>
      </div>

      {/* Menu / Catalog Items */}
      <div className="p-5 sm:p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-amber-100 font-cinzel">Current Menu & Approved Offerings</h3>
            <p className="text-xs text-stone-400">Compliant with Nashik Municipal Corporation fair price controls</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vendor.menuOrProducts.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-200">{item.name}</span>
              <span className="font-bold text-amber-300 font-mono text-sm">₹{item.price}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
