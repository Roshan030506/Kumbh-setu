import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Check,
  AlertCircle,
  RefreshCw,
  Eye,
  Building2,
  Calendar,
  UserCheck
} from 'lucide-react';

export const CertificateOcrUpload: React.FC = () => {
  const { currentVendor, setVendorScreen, updateVendorOcr, verifyVendor, t, playClick, playSuccess, showToast } = useApp();

  // Pipeline Stages: 'idle' | 'verifying_certificate' | 'extracted' | 'online_checking' | 'completed'
  const [pipelineState, setPipelineState] = useState<'idle' | 'verifying_certificate' | 'extracted' | 'online_checking' | 'completed'>(
    currentVendor.ocrDocument ? 'completed' : 'idle'
  );
  
  // Verification Checks Checklist
  const [checks, setChecks] = useState<{
    format: boolean;
    expiry: boolean;
    registry: boolean;
  }>({
    format: !!currentVendor.ocrDocument,
    expiry: !!currentVendor.ocrDocument,
    registry: !!currentVendor.ocrDocument
  });

  // Result Outcome: 'verified' | 'pending'
  const [verificationResult, setVerificationResult] = useState<'verified' | 'pending'>(
    currentVendor.status === 'verified' ? 'verified' : 'pending'
  );

  // OCR Extracted Fields
  const [licenseNumber, setLicenseNumber] = useState(currentVendor.ocrDocument?.licenseNumber || 'FSSAI-MH-2026-994821');
  const [issueDate, setIssueDate] = useState('2024-03-15');
  const [expiryDate, setExpiryDate] = useState(currentVendor.ocrDocument?.expiryDate || '2027-12-31');
  const [holderName, setHolderName] = useState(currentVendor.ocrDocument?.holderName || currentVendor.ownerName || 'Santosh Vitthal Joshi');
  const [issuingAuthority, setIssuingAuthority] = useState(
    currentVendor.ocrDocument?.issuingAuthority || 'Food Safety and Standards Authority of India (Nashik Division)'
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    currentVendor.ocrDocument ? 'FSSAI_Certificate_Nashik2026.pdf' : null
  );

  const startVerificationPipeline = (fileName: string, targetOutcome: 'verified' | 'pending' = 'verified') => {
    setUploadedFileName(fileName);
    setVerificationResult(targetOutcome);
    setChecks({ format: false, expiry: false, registry: false });
    
    // Step 1: Loading animation labeled "Verifying certificate..." for 2.5 seconds
    setPipelineState('verifying_certificate');
    playClick();

    setTimeout(() => {
      // Step 2: OCR Extraction auto-populates fields
      setPipelineState('extracted');
      setLicenseNumber(targetOutcome === 'verified' ? 'FSSAI-MH-2026-994821' : 'FSSAI-MH-2026-REV301');
      setIssueDate('2024-03-15');
      setExpiryDate('2027-12-31');
      setHolderName(currentVendor.ownerName || 'Santosh Vitthal Joshi');
      setIssuingAuthority('Food Safety & Standards Authority of India (Nashik Circle)');
      playSuccess();
      showToast('OCR Extraction Complete', 'License data successfully parsed from document', 'info');

      // Step 3: Trigger Online Verification sequential checklist
      setTimeout(() => {
        setPipelineState('online_checking');
        
        // Checklist item 1: "Checking license format ✓" (700ms)
        setTimeout(() => {
          setChecks(prev => ({ ...prev, format: true }));
          playClick();

          // Checklist item 2: "Validating expiry date ✓" (1400ms)
          setTimeout(() => {
            setChecks(prev => ({ ...prev, expiry: true }));
            playClick();

            // Checklist item 3: "Cross-checking registry ✓" (2100ms)
            setTimeout(() => {
              setChecks(prev => ({ ...prev, registry: true }));
              playClick();

              // Step 4: Final Outcome
              setTimeout(() => {
                setPipelineState('completed');
                if (targetOutcome === 'verified') {
                  playSuccess();
                  verifyVendor(currentVendor.id, 'verified');
                  updateVendorOcr(currentVendor.id, {
                    licenseNumber: 'FSSAI-MH-2026-994821',
                    issuingAuthority: 'Food Safety & Standards Authority of India (Nashik Circle)',
                    expiryDate: '2027-12-31',
                    holderName: currentVendor.ownerName || 'Santosh Vitthal Joshi',
                    complianceScore: 99.2,
                    extractedAt: new Date().toLocaleDateString()
                  });
                  showToast('Certificate Verified!', 'Official Kumbh 2026 Merchant Badge Awarded', 'success');
                } else {
                  playClick();
                  verifyVendor(currentVendor.id, 'pending');
                  updateVendorOcr(currentVendor.id, {
                    licenseNumber: 'FSSAI-MH-2026-REV301',
                    issuingAuthority: 'Food Safety & Standards Authority of India (Nashik Circle)',
                    expiryDate: '2027-12-31',
                    holderName: currentVendor.ownerName || 'Santosh Vitthal Joshi',
                    complianceScore: 88.0,
                    extractedAt: new Date().toLocaleDateString()
                  });
                  showToast('Routed for Manual Review', 'Assigned to Municipal Inspector queue', 'info');
                }
              }, 400);

            }, 700);

          }, 700);

        }, 700);

      }, 800);

    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      startVerificationPipeline(file.name, 'verified');
    }
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-4xl mx-auto w-full p-4 sm:p-6 text-stone-100 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100">
              {t.certificateOcr}
            </h1>
            <p className="text-xs text-stone-400">
              Simhastha Kumbh Mela 2026 Nashik • Automated License Verification Pipeline
            </p>
          </div>
        </div>

        {pipelineState === 'completed' && verificationResult === 'verified' && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-md animate-fadeIn">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Kumbh Verified Seal</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Upload Box, Verification Pipeline, & Certificate Specimen */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Food License / FSSAI Certificate</span>
              </h3>
              <span className="text-[10px] text-stone-400">PDF, JPG, PNG</span>
            </div>

            {/* Upload Drag & Drop Area */}
            <div className="relative border-2 border-dashed border-stone-700 hover:border-emerald-500/70 rounded-2xl p-6 text-center bg-stone-950/70 transition-all overflow-hidden group">
              
              {/* Step 1 Loading Animation: "Verifying certificate..." for 2-3 seconds */}
              {pipelineState === 'verifying_certificate' && (
                <div className="absolute inset-0 bg-stone-950/90 flex flex-col items-center justify-center p-6 z-20 backdrop-blur-sm space-y-3">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                    <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-bold text-emerald-300 font-cinzel">
                      Verifying certificate...
                    </p>
                    <p className="text-[11px] text-stone-400 max-w-xs">
                      Parsing document structure, security micro-holograms, and official FSSAI Nashik watermarks...
                    </p>
                  </div>
                </div>
              )}

              <input
                type="file"
                id="input-certificate-file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-200">
                    {uploadedFileName ? uploadedFileName : 'Click to browse or drop certificate'}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Upload Food License / FSSAI / Health Trade Certificate
                  </p>
                </div>
                <button
                  type="button"
                  id="btn-browse-file"
                  className="px-4 py-2 rounded-xl bg-stone-800 group-hover:bg-emerald-600 text-stone-200 group-hover:text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Select Document File
                </button>
              </div>

            </div>

            {/* Quick Demo Pre-seed Buttons for Judges */}
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-300 block">
                ⚡ Judge Demo Simulator:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  id="btn-simulate-pass"
                  onClick={() => startVerificationPipeline('FSSAI_Maharastra_SatvikPass_2026.pdf', 'verified')}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test Fast Verification (Pass)</span>
                </button>

                <button
                  type="button"
                  id="btn-simulate-pending"
                  onClick={() => startVerificationPipeline('FSSAI_Special_Inspection_Doc.pdf', 'pending')}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Fallback (Pending Review)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Certificate Specimen Preview Graphic */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-4 shadow-lg">
            <div className="w-16 h-22 bg-amber-50 rounded-lg p-2 text-[6px] text-stone-900 font-mono shadow-md border border-amber-200 flex flex-col justify-between shrink-0 relative overflow-hidden">
              <div className="border-b border-stone-400 pb-0.5 text-center font-bold text-red-800">
                GOVT OF MAHARASHTRA
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-emerald-800">fssai CERTIFICATE</div>
                <div>LIC: {licenseNumber}</div>
                <div>EXP: {expiryDate}</div>
                <div>HOLDER: {holderName.split(' ')[0]}</div>
              </div>
              <div className="flex justify-between items-center pt-0.5 border-t border-stone-300">
                <div className="w-4 h-4 bg-stone-800 rounded-xs" />
                <span className="text-[5px] text-stone-600">SEAL OK</span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="font-bold text-stone-200 block">Uploaded FSSAI Official Specimen</span>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                Standard format for Nashik-Trimbakeshwar Simhastha 2026 authorized pilgrim food services and prasadam vendors.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: OCR Auto-Populate & Online Verification Step */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-sm font-bold text-amber-100 font-cinzel">
                  OCR Extraction Intelligence
                </h3>
                <p className="text-[11px] text-stone-400">
                  {pipelineState === 'verifying_certificate'
                    ? 'Extracting metadata from certificate...'
                    : 'Auto-populated from uploaded document'}
                </p>
              </div>

              {pipelineState === 'completed' && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  99.2% Accuracy
                </span>
              )}
            </div>

            {/* Auto-Populated OCR Extracted Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  License Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="input-ocr-license"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 font-mono text-emerald-300 font-bold text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <FileText className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>Issue Date</span>
                  </label>
                  <input
                    type="date"
                    id="input-ocr-issue-date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Expiry Date</span>
                  </label>
                  <input
                    type="date"
                    id="input-ocr-expiry-date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-stone-400" />
                  <span>License Holder Name</span>
                </label>
                <input
                  type="text"
                  id="input-ocr-holder"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-stone-400" />
                  <span>Issuing Regulatory Authority</span>
                </label>
                <input
                  type="text"
                  id="input-ocr-authority"
                  value={issuingAuthority}
                  onChange={(e) => setIssuingAuthority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Online Verification Step: Animated Sequential Checklist */}
            <div className="pt-3 border-t border-stone-800 space-y-3">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                Online Verification Checks
              </span>

              <div className="space-y-2 bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-xs">
                
                {/* Check 1: Format */}
                <div className="flex items-center justify-between">
                  <span className="text-stone-300">Checking license format</span>
                  {checks.format ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold animate-fadeIn">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>Passed</span>
                    </span>
                  ) : pipelineState === 'online_checking' ? (
                    <span className="text-[11px] text-amber-400 animate-pulse">Checking...</span>
                  ) : (
                    <span className="text-[11px] text-stone-600">Pending</span>
                  )}
                </div>

                {/* Check 2: Expiry */}
                <div className="flex items-center justify-between">
                  <span className="text-stone-300">Validating expiry date</span>
                  {checks.expiry ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold animate-fadeIn">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>Valid (2027)</span>
                    </span>
                  ) : pipelineState === 'online_checking' && checks.format ? (
                    <span className="text-[11px] text-amber-400 animate-pulse">Validating...</span>
                  ) : (
                    <span className="text-[11px] text-stone-600">Pending</span>
                  )}
                </div>

                {/* Check 3: Registry */}
                <div className="flex items-center justify-between">
                  <span className="text-stone-300">Cross-checking registry</span>
                  {checks.registry ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold animate-fadeIn">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>Verified Match</span>
                    </span>
                  ) : pipelineState === 'online_checking' && checks.expiry ? (
                    <span className="text-[11px] text-amber-400 animate-pulse">Querying...</span>
                  ) : (
                    <span className="text-[11px] text-stone-600">Pending</span>
                  )}
                </div>

              </div>
            </div>

            {/* End Result Outcomes */}
            {pipelineState === 'completed' && (
              <div className="pt-2 space-y-3 animate-fadeIn">
                {verificationResult === 'verified' ? (
                  /* ✅ Certificate Verified Result */
                  <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-emerald-200">
                            ✅ Certificate Verified
                          </h4>
                          <p className="text-[11px] text-emerald-300/80">
                            Official Kumbh 2026 digital merchant badge awarded
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-stone-950 font-black text-[10px] uppercase">
                        Active
                      </span>
                    </div>

                    <button
                      id="btn-goto-vendor-dashboard"
                      onClick={() => {
                        playClick();
                        setVendorScreen('dashboard');
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
                    >
                      <span>Proceed to Vendor Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* ⏳ Pending Manual Review Fallback Result */
                  <div className="p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-amber-200">
                            ⏳ Pending Manual Review
                          </h4>
                          <p className="text-[11px] text-amber-300/80">
                            Forwarded to District Control Room verification queue
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-black text-[10px] uppercase">
                        Pending
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        id="btn-goto-vendor-dash-pending"
                        onClick={() => {
                          playClick();
                          setVendorScreen('dashboard');
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        <span>View In Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
