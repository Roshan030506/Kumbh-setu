import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  UserProfile, 
  Facility, 
  Vendor, 
  EmergencyAlert, 
  CrowdZone, 
  PilgrimScreen, 
  VendorScreen, 
  AdminScreen,
  LostPersonData
} from '../types';
import { 
  INITIAL_FACILITIES, 
  INITIAL_VENDORS, 
  INITIAL_ALERTS, 
  CROWD_ZONES 
} from '../services/mockData';
import { translations, Translations } from '../services/i18n';
import { sound } from '../services/audio';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'alert' | 'info';
  timestamp: number;
}

interface AppContextType {
  // Auth & Role
  currentUser: UserProfile | null;
  currentRole: UserRole;
  isLoggedIn: boolean;
  login: (role: UserRole, phone: string, name?: string) => void;
  loginWithProfile: (profile: Partial<UserProfile> & { id: string; role: UserRole }) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Active Screen
  pilgrimScreen: PilgrimScreen;
  setPilgrimScreen: (s: PilgrimScreen) => void;
  vendorScreen: VendorScreen;
  setVendorScreen: (s: VendorScreen) => void;
  adminScreen: AdminScreen;
  setAdminScreen: (s: AdminScreen) => void;

  // Preferences & Accessibility
  language: Language;
  setLanguage: (lang: Language) => void;
  elderlyMode: boolean;
  setElderlyMode: (enabled: boolean) => void;
  t: Translations;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playToggle: (active: boolean) => void;
  playSuccess: () => void;
  playSosAlert: () => void;
  playNotification: () => void;

  // Data Collections
  facilities: Facility[];
  selectedFacility: Facility | null;
  setSelectedFacility: (f: Facility | null) => void;

  vendors: Vendor[];
  currentVendor: Vendor | null;
  alerts: EmergencyAlert[];
  crowdZones: CrowdZone[];

  // Operations
  triggerSos: (lat?: number, lng?: number, note?: string) => EmergencyAlert;
  reportLostPerson: (data: LostPersonData, lat: number, lng: number, spotName: string) => EmergencyAlert;
  registerVendor: (data: Partial<Vendor>) => Vendor;
  verifyVendorOcr: (vendorId: string, ocrData: Vendor['ocrDocument']) => void;
  updateVendorOcr: (vendorId: string, ocrData: Vendor['ocrDocument']) => void;
  updateVendorStatus: (vendorId: string, status: 'verified' | 'rejected') => void;
  verifyVendor: (vendorId: string, status: 'verified' | 'rejected') => void;
  updateVendorAvailability: (vendorId: string, isOpen: boolean, stockPercent: number, rooms?: number) => void;
  resolveAlert: (alertId: string) => void;
  dispatchAlertUnit: (alertId: string, unit: string) => void;
  addAlert: (alert: Partial<EmergencyAlert>) => EmergencyAlert;

  // Modals
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'alert' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage Persistence
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kumbh_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('kumbh_role') as UserRole;
      if (saved && ['pilgrim', 'vendor', 'admin'].includes(saved)) {
        return saved;
      }
      return 'pilgrim';
    } catch {
      return 'pilgrim';
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kumbh_lang') as Language;
      return (saved && ['en', 'hi', 'mr'].includes(saved)) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [elderlyMode, setElderlyModeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kumbh_elderly_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Screens
  const [pilgrimScreen, setPilgrimScreen] = useState<PilgrimScreen>('home_map');
  const [vendorScreen, setVendorScreen] = useState<VendorScreen>('dashboard');
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('dashboard');

  // Facilities, Vendors, Alerts
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem('kumbh_facilities');
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch {
      return INITIAL_FACILITIES;
    }
  });

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    try {
      const saved = localStorage.getItem('kumbh_vendors');
      return saved ? JSON.parse(saved) : INITIAL_VENDORS;
    } catch {
      return INITIAL_VENDORS;
    }
  });

  const [alerts, setAlerts] = useState<EmergencyAlert[]>(() => {
    try {
      const saved = localStorage.getItem('kumbh_alerts');
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  const [crowdZones] = useState<CrowdZone[]>(CROWD_ZONES);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kumbh_user', JSON.stringify(currentUser));
      localStorage.setItem('kumbh_role', currentUser.role);
    } else {
      localStorage.removeItem('kumbh_user');
      localStorage.removeItem('kumbh_role');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('kumbh_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('kumbh_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('kumbh_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const showToast = (title: string, message?: string, type: 'success' | 'alert' | 'info' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev.slice(-3), { id, title, message, type, timestamp: Date.now() }]);

    if (type === 'success') {
      sound.playSuccess();
    } else if (type === 'alert') {
      sound.playSosAlert();
    } else {
      sound.playNotification();
    }

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const playClick = () => {
    sound.playClick();
  };

  const playToggle = (active: boolean) => {
    sound.playToggle(active);
  };

  const playSuccess = () => {
    sound.playSuccess();
  };

  const playSosAlert = () => {
    sound.playSosAlert();
  };

  const playNotification = () => {
    sound.playNotification();
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playClick();
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kumbh_lang', lang);
    sound.playClick();
  };

  const setElderlyMode = (enabled: boolean) => {
    setElderlyModeState(enabled);
    localStorage.setItem('kumbh_elderly_mode', String(enabled));
    sound.playToggle(enabled);
    showToast(
      enabled ? 'Accessibility Mode Enabled' : 'Standard View Enabled',
      enabled ? 'Enlarged buttons, ramp routes & priority assistance' : 'Standard interface preferences restored',
      'info'
    );
  };

  const login = (role: UserRole, phone: string, name?: string) => {
    let assignedVendorId: string | undefined = undefined;
    if (role === 'vendor') {
      // Pick or associate with vendor-1 by default
      assignedVendorId = 'ven-1';
    }

    const defaultNames: Record<UserRole, string> = {
      pilgrim: 'Shriram Sharma (Pilgrim Pass #2026-N1)',
      vendor: 'Santosh Joshi (Modak Stall #14)',
      admin: 'Inspector V. S. Deshmukh (Control Room Unit 3)'
    };

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      role,
      phone: phone || '9876543210',
      name: name || defaultNames[role],
      language,
      elderlyOrDisabledMode: elderlyMode,
      vendorId: assignedVendorId,
      status: 'approved'
    };

    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsRoleModalOpen(false);
    setIsLoginOpen(false);
    if (role === 'vendor') {
      setVendorScreen('dashboard');
    } else if (role === 'admin') {
      setAdminScreen('dashboard');
    }
    sound.playSuccess();
    showToast(
      'Login Verified Successfully',
      `Welcome to Smart Pilgrim Platform as ${role.toUpperCase()}`,
      'success'
    );
  };

  const loginWithProfile = (profile: Partial<UserProfile> & { id: string; role: UserRole }) => {
    const role = profile.role;
    let assignedVendorId = profile.vendorId;
    if (role === 'vendor' && !assignedVendorId) {
      assignedVendorId = profile.status === 'approved' ? 'ven-1' : undefined;
    }

    const fullProfile: UserProfile = {
      id: profile.id,
      role,
      phone: profile.phone || '9876543210',
      email: profile.email,
      name: profile.name || (role === 'pilgrim' ? 'Pandit Shriram Sharma' : role === 'vendor' ? 'Santosh Joshi' : 'Control Room Admin'),
      language: profile.language || language,
      elderlyOrDisabledMode: profile.elderlyOrDisabledMode ?? elderlyMode,
      vendorId: assignedVendorId,
      status: profile.status || (role === 'vendor' ? 'pending_approval' : 'approved'),
      shopName: profile.shopName,
      licenseOrGstin: profile.licenseOrGstin,
      category: profile.category,
      address: profile.address,
      createdAt: profile.createdAt || new Date().toISOString()
    };

    setCurrentUser(fullProfile);
    setCurrentRole(role);
    setIsRoleModalOpen(false);
    setIsLoginOpen(false);

    // Screen routing based on role and status
    if (role === 'vendor') {
      // If approved, show dashboard; if pending, routing will show VendorUnderReview
      setVendorScreen('dashboard');
    } else if (role === 'admin') {
      setAdminScreen('dashboard');
    } else {
      setPilgrimScreen('home_map');
    }

    sound.playSuccess();
  };

  const logout = async () => {
    sound.playClick();
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign out error:', err);
    }
    setCurrentUser(null);
    localStorage.removeItem('kumbh_user');
    localStorage.removeItem('kumbh_role');
    localStorage.removeItem('kumbh_auth_profile');
    localStorage.removeItem('kumbh_auth_role');
    localStorage.removeItem('kumbh_auth_status');
    setIsRoleModalOpen(false);
    showToast('Logged Out', 'You have securely signed out of your session', 'info');
  };

  const switchRole = (role: UserRole) => {
    sound.playClick();
    setCurrentRole(role);
    if (role === 'vendor') {
      setVendorScreen('dashboard');
    } else if (role === 'admin') {
      setAdminScreen('dashboard');
    }
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const currentVendor = currentUser?.vendorId 
    ? vendors.find(v => v.id === currentUser.vendorId) || vendors[0]
    : vendors[0];

  // Pilgrim SOS
  const triggerSos = (lat = 19.9975, lng = 73.7898, note?: string): EmergencyAlert => {
    sound.playSosAlert();
    const newAlert: EmergencyAlert = {
      id: 'alt-' + Date.now(),
      type: 'sos',
      title: '🚨 Emergency Distress Signal Received',
      details: note || 'Pilgrim activated emergency panic beacon with real-time GPS pinpoint.',
      lat,
      lng,
      locationName: 'Ramkund Holy Promenade (Zone A)',
      status: 'active',
      timestamp: 'Just now',
      reportedBy: currentUser?.name || 'Pilgrim User',
      phone: currentUser?.phone || '+91 98220 00000',
      responseUnit: 'Sector-1 Quick Action Medical & Police Team',
      etaMinutes: 3
    };

    setAlerts(prev => [newAlert, ...prev]);
    showToast(
      'Distress Beacon Broadcasted!',
      'Control room alerted. Patrol Unit #14 is on their way (ETA 3 mins)',
      'alert'
    );
    return newAlert;
  };

  // Lost Person
  const reportLostPerson = (data: LostPersonData, lat: number, lng: number, spotName: string): EmergencyAlert => {
    sound.playSuccess();
    const newAlert: EmergencyAlert = {
      id: 'alt-lost-' + Date.now(),
      type: 'lost_person',
      title: `Lost Person: ${data.name} (Age ${data.age})`,
      details: `Reported lost at ${spotName}. Attire: ${data.clothing}. Guardian Contact: ${data.guardianPhone}`,
      lat,
      lng,
      locationName: spotName,
      status: 'active',
      timestamp: 'Just now',
      reportedBy: `${data.guardianName} (Guardian)`,
      phone: data.guardianPhone,
      lostPersonDetails: data,
      responseUnit: 'Nashik Mela Lost & Found Center Hub'
    };

    setAlerts(prev => [newAlert, ...prev]);
    showToast(
      'Missing Report Registered',
      'Broadcasted to all 12 digital police booths & information towers',
      'success'
    );
    return newAlert;
  };

  // Vendor Actions
  const registerVendor = (data: Partial<Vendor>): Vendor => {
    sound.playSuccess();
    const newVendor: Vendor = {
      id: 'ven-' + Date.now(),
      businessName: data.businessName || 'New Kumbh Vendor Stall',
      ownerName: data.ownerName || currentUser?.name || 'Vendor Partner',
      phone: data.phone || currentUser?.phone || '9876543210',
      category: data.category || 'Prasad & Food',
      lat: data.lat || 19.9972,
      lng: data.lng || 73.7902,
      address: data.address || 'Panchavati Ghat Road, Nashik',
      status: 'pending',
      menuOrProducts: data.menuOrProducts || [
        { name: 'Special Item 1', price: 50 },
        { name: 'Special Item 2', price: 30 }
      ],
      photos: data.photos || ['https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=600&q=80'],
      isOpen: true,
      stockLevelPercent: 90,
      footfallCount: 0,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setVendors(prev => [newVendor, ...prev]);
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, vendorId: newVendor.id } : null);
    }
    showToast('Stall Registration Submitted', 'Awaiting administrative verification & certificate review', 'info');
    return newVendor;
  };

  const verifyVendorOcr = (vendorId: string, ocrData: Vendor['ocrDocument']) => {
    sound.playSuccess();
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          ocrDocument: ocrData,
          status: 'verified' // Auto-verified upon valid certificate match
        };
      }
      return v;
    }));
    showToast(
      'Certificate Authenticated!',
      `OCR extracted license ${ocrData?.licenseNumber} with 98% confidence`,
      'success'
    );
  };

  const updateVendorStatus = (vendorId: string, status: 'verified' | 'rejected') => {
    sound.playSuccess();
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status } : v));
    showToast(
      status === 'verified' ? 'Vendor Approved' : 'Vendor Flagged / Rejected',
      `Stall credentials updated to ${status.toUpperCase()}`,
      status === 'verified' ? 'success' : 'alert'
    );
  };

  const updateVendorAvailability = (vendorId: string, isOpen: boolean, stockPercent: number, rooms?: number) => {
    sound.playToggle(isOpen);
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          isOpen,
          stockLevelPercent: stockPercent,
          capacityRooms: rooms !== undefined ? rooms : v.capacityRooms
        };
      }
      return v;
    }));
    showToast(
      isOpen ? 'Stall is OPEN' : 'Stall Marked CLOSED',
      `Availability updated to ${stockPercent}% stock`,
      'info'
    );
  };

  const resolveAlert = (alertId: string) => {
    sound.playSuccess();
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'resolved' } : a));
    showToast('Incident Resolved', 'Status updated in Central Control Registry', 'success');
  };

  const dispatchAlertUnit = (alertId: string, unit: string) => {
    sound.playClick();
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'responding', responseUnit: unit } : a));
    showToast('Emergency Unit Dispatched', `${unit} is en route to site`, 'info');
  };

  const addAlert = (alertData: Partial<EmergencyAlert>): EmergencyAlert => {
    sound.playNotification();
    const newAlert: EmergencyAlert = {
      id: 'alt-' + Date.now(),
      type: alertData.type || 'crowd_warning',
      title: alertData.title || 'Official Kumbh Mela Advisory',
      details: alertData.details || 'Public safety notification from central command.',
      lat: alertData.lat || 19.9980,
      lng: alertData.lng || 73.7915,
      locationName: alertData.locationName || alertData.location || 'Panchavati Sector',
      status: alertData.status || 'active',
      severity: alertData.severity || 'medium',
      timestamp: 'Just now'
    };
    setAlerts(prev => [newAlert, ...prev]);
    return newAlert;
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRole,
      isLoggedIn: !!currentUser,
      login,
      loginWithProfile,
      logout,
      switchRole,

      pilgrimScreen,
      setPilgrimScreen,
      vendorScreen,
      setVendorScreen,
      adminScreen,
      setAdminScreen,

      language,
      setLanguage,
      elderlyMode,
      setElderlyMode,
      t,

      soundEnabled,
      toggleSound,
      playClick,
      playToggle,
      playSuccess,
      playSosAlert,
      playNotification,

      facilities,
      selectedFacility,
      setSelectedFacility,

      vendors,
      currentVendor,
      alerts,
      crowdZones,

      triggerSos,
      reportLostPerson,
      registerVendor,
      verifyVendorOcr,
      updateVendorOcr: verifyVendorOcr,
      updateVendorStatus,
      verifyVendor: updateVendorStatus,
      updateVendorAvailability,
      resolveAlert,
      dispatchAlertUnit,
      addAlert,

      isRoleModalOpen,
      setIsRoleModalOpen,
      isLoginOpen,
      setIsLoginOpen,

      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
