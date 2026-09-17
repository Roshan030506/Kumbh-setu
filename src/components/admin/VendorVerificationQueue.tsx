import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vendor } from '../../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Check, 
  X, 
  FileText, 
  MapPin, 
  Phone, 
  Sparkles, 
  Eye, 
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  UserCheck
} from 'lucide-react';

export const VendorVerificationQueue: React.FC = () => {
  const { vendors, verifyVendor, t, playClick, playSuccess, showToast } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendorForModal, setSelectedVendorForModal] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter(v => {
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      v.businessName.toLowerCase().includes(q) || 
      v.ownerName.toLowerCase().includes(q) || 
      v.category.toLowerCase().includes(q) ||
      (v.ocrDocument?.licenseNumber && v.ocrDocument.licenseNumber.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (vendor: Vendor) => {
    playSuccess();
    verifyVendor(vendor.id, 'verified');
    if (selectedVendorForModal?.id === vendor.id) {
      setSelectedVendorForModal({ ...vendor, status: 'verified' });
    }
    showToast('Vendor Approved', `${vendor.businessName} has been granted official Verified Merchant status`, 'success');
  };

  const handleReject = (vendor: Vendor) => {
    playClick();
    verifyVendor(vendor.id, 'rejected');
    if (selectedVendorForModal?.id === vendor.id) {
      setSelectedVendorForModal({ ...vendor, status: 'rejected' });
    }
    showToast('Application Flagged', `${vendor.businessName} has been flagged for re-inspection`, 'alert');
  };

  const openVendorInspection = (vendor: Vendor) => {
    playClick();
    setSelectedVendorForModal(vendor);
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-6xl mx-auto w-full p-4 sm:p-6 text-stone-100 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
            {t.verificationQueue}
          </h1>
          <p className="text-xs text-stone-400">
            Inspect merchant trade credentials, FSSAI certificates, fair pricing, and grant official Simhastha permits.
          </p>
        </div>

        {/* Search & Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(['pending', 'verified', 'rejected', 'all'] as const).map((status) => (
            <button
              key={status}
              id={`filter-btn-${status}`}
              onClick={() => {
                playClick();
                setFilterStatus(status);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-amber-500 text-stone-950 font-extrabold shadow-md'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-800'
              }`}
            >
              {status} ({vendors.filter(v => status === 'all' ? true : v.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          id="input-vendor-queue-search"
          placeholder="Search by stall name, owner, license number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            id={`vendor-queue-card-${vendor.id}`}
            className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl space-y-4 hover:border-stone-750 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={vendor.photos[0] || 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=400&q=80'}
                    alt={vendor.businessName}
                    className="w-14 h-14 rounded-xl object-cover border border-stone-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-stone-100">{vendor.businessName}</h3>
                    </div>
                    <p className="text-[11px] text-amber-400 font-semibold">{vendor.category}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">Owner: <b>{vendor.ownerName}</b> • {vendor.phone}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${
                  vendor.status === 'verified'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : vendor.status === 'rejected'
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {vendor.status}
                </span>
              </div>

              {/* Address */}
              <p className="text-xs text-stone-400 flex items-center gap-1 mt-3">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="truncate">{vendor.address}</span>
              </p>

              {/* OCR Inspection Snapshot */}
              <div className="mt-3 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 text-[11px] flex items-center gap-1 font-semibold uppercase">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>OCR License Inspection</span>
                  </span>
                  {vendor.ocrDocument && (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      {vendor.ocrDocument.complianceScore}% Match
                    </span>
                  )}
                </div>

                {vendor.ocrDocument ? (
                  <div className="font-mono text-[11px] text-stone-300">
                    <div><b>LIC:</b> {vendor.ocrDocument.licenseNumber}</div>
                    <div className="text-[10px] text-stone-400 truncate"><b>Auth:</b> {vendor.ocrDocument.issuingAuthority}</div>
                    <div className="text-[10px] text-stone-400"><b>Valid Until:</b> {vendor.ocrDocument.expiryDate}</div>
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-300/80 italic">
                    Certificate file uploaded. Click below to inspect OCR specimen.
                  </div>
                )}
              </div>

              {/* Menu samples */}
              <div className="mt-3">
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Declared Price Schedule</span>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.menuOrProducts.slice(0, 3).map((m, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      {m.name}: <b className="text-amber-300">₹{m.price}</b>
                    </span>
                  ))}
                  {vendor.menuOrProducts.length > 3 && (
                    <span className="text-[10px] text-stone-500 self-center">+{vendor.menuOrProducts.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons: Inspect Detail & Approve/Reject */}
            <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
              <button
                type="button"
                id={`btn-inspect-vendor-${vendor.id}`}
                onClick={() => openVendorInspection(vendor)}
                className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Document</span>
              </button>

              <button
                type="button"
                id={`btn-approve-vendor-${vendor.id}`}
                onClick={() => handleApprove(vendor)}
                disabled={vendor.status === 'verified'}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{vendor.status === 'verified' ? 'Approved' : 'Approve Permit'}</span>
              </button>

              <button
                type="button"
                id={`btn-reject-vendor-${vendor.id}`}
                onClick={() => handleReject(vendor)}
                disabled={vendor.status === 'rejected'}
                className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-red-600 disabled:opacity-40 text-stone-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="p-12 text-center text-stone-500 bg-stone-900/50 rounded-2xl border border-stone-800">
          No vendor applications match the selected filter.
        </div>
      )}

      {/* Detail View Modal: Certificate Specimen + Extracted OCR Fields + Approve/Reject */}
      {selectedVendorForModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-stone-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-100 font-cinzel">
                    {selectedVendorForModal.businessName}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Merchant Certificate & Regulatory Compliance Dossier
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="btn-close-vendor-modal"
                onClick={() => {
                  playClick();
                  setSelectedVendorForModal(null);
                }}
                className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate Visualizer Specimen */}
            <div className="p-4 rounded-2xl bg-amber-50 text-stone-900 shadow-inner border-2 border-amber-200 relative overflow-hidden">
              <div className="absolute right-3 top-3 w-16 h-16 rounded-full border-4 border-amber-600/30 flex items-center justify-center rotate-12 pointer-events-none">
                <span className="text-[9px] font-black text-amber-800 text-center uppercase tracking-tighter">
                  KUMBH 2026<br/>NASHIK SEAL
                </span>
              </div>

              <div className="text-center pb-2 border-b border-stone-300">
                <span className="text-[10px] font-bold text-red-800 tracking-wider uppercase block">
                  GOVERNMENT OF MAHARASHTRA • NASHIK MUNICIPAL CORPORATION
                </span>
                <h4 className="text-sm font-black text-stone-900 font-serif">
                  FOOD SAFETY AND STANDARDS AUTHORITY OF INDIA (FSSAI)
                </h4>
                <span className="text-[11px] text-stone-600 font-semibold">
                  Official Simhastha Mela 2026 Fair Price & Satvik Prasadam License
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">License Number</span>
                  <span className="font-mono font-black text-stone-900 text-sm">
                    {selectedVendorForModal.ocrDocument?.licenseNumber || 'FSSAI-MH-2026-994821'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">License Holder</span>
                  <span className="font-bold text-stone-900">
                    {selectedVendorForModal.ocrDocument?.holderName || selectedVendorForModal.ownerName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">Valid Through</span>
                  <span className="font-mono font-bold text-emerald-800">
                    {selectedVendorForModal.ocrDocument?.expiryDate || '31/12/2027'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">Verification Status</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active in State Registry</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Extracted OCR Data Checklist */}
            <div className="space-y-2 bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                OCR Telemetry Extracted Metadata
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                <div>Stall Category: <b>{selectedVendorForModal.category}</b></div>
                <div>Contact Phone: <b>{selectedVendorForModal.phone}</b></div>
                <div>Physical Sector: <b>{selectedVendorForModal.address}</b></div>
                <div>OCR Confidence Score: <b className="text-emerald-400">99.2%</b></div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                id="btn-modal-reject"
                onClick={() => {
                  handleReject(selectedVendorForModal);
                  setSelectedVendorForModal(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reject / Flag
              </button>

              <button
                type="button"
                id="btn-modal-approve"
                onClick={() => {
                  handleApprove(selectedVendorForModal);
                  setSelectedVendorForModal(null);
                }}
                className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Approve & Grant Official Kumbh Permit</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
