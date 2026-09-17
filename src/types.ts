export type UserRole = 'pilgrim' | 'vendor' | 'admin';

export type Language = 'en' | 'hi' | 'mr';

export type FacilityCategory = 
  | 'ghat' 
  | 'medical' 
  | 'food' 
  | 'water' 
  | 'toilet' 
  | 'lodging' 
  | 'parking';

export interface Facility {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  category: FacilityCategory;
  lat: number;
  lng: number;
  address: string;
  verified: boolean;
  isFree: boolean;
  priceText?: string;
  liveStatus: string;
  waitTimeMinutes?: number;
  capacityPercent?: number;
  distanceMeters: number;
  rating: number;
  reviewsCount: number;
  photos: string[];
  accessibilityFeatures: string[];
  openHours: string;
  description: string;
  contactPhone?: string;
}

export type VendorStatus = 'pending' | 'verified' | 'rejected';

export interface VendorMenuItem {
  name: string;
  price: number;
  unit?: string;
}

export interface VendorOcrDoc {
  licenseNumber: string;
  expiryDate: string;
  issuingAuthority: string;
  complianceScore: number;
  documentType: string;
  fileUrl?: string;
  verifiedDate?: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  status: VendorStatus;
  menuOrProducts: VendorMenuItem[];
  photos: string[];
  ocrDocument?: VendorOcrDoc;
  isOpen: boolean;
  stockLevelPercent: number;
  capacityRooms?: number;
  footfallCount: number;
  registeredAt: string;
}

export type AlertType = 'sos' | 'lost_person' | 'crowd_warning' | 'announcement';
export type AlertStatus = 'active' | 'responding' | 'resolved';

export interface LostPersonData {
  name: string;
  age: number;
  gender: string;
  lastSeenTime: string;
  photoUrl?: string;
  clothing: string;
  guardianName: string;
  guardianPhone: string;
}

export interface EmergencyAlert {
  id: string;
  type: AlertType;
  title: string;
  details: string;
  lat: number;
  lng: number;
  locationName: string;
  location?: string;
  severity?: 'high' | 'medium' | 'low';
  status: AlertStatus;
  timestamp: string;
  reportedBy?: string;
  phone?: string;
  lostPersonDetails?: LostPersonData;
  responseUnit?: string;
  etaMinutes?: number;
}

export type AlertItem = EmergencyAlert;

export interface CrowdZone {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  severity: 'low' | 'moderate' | 'heavy';
  densityPercent: number;
  coordinates: [number, number][];
  currentFootfall: string;
  advice: string;
}

export interface RouteOption {
  id: string;
  name: string;
  type: 'normal' | 'crowd_aware';
  distanceKm: number;
  walkingMinutes: number;
  crowdRisk: 'low' | 'moderate' | 'high';
  accessible: boolean;
  points: [number, number][];
  highlights: string[];
}

export type UserApprovalStatus = 'approved' | 'pending_approval' | 'rejected';

export interface UserProfile {
  id: string;
  role: UserRole;
  phone: string;
  name: string;
  email?: string;
  language: Language;
  elderlyOrDisabledMode: boolean;
  status: UserApprovalStatus;
  vendorId?: string;
  shopName?: string;
  licenseOrGstin?: string;
  category?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  facilityRecommendation?: Facility;
  actionButton?: {
    label: string;
    screen: string;
    targetId?: string;
  };
}

export type PilgrimScreen = 
  | 'home_map' 
  | 'routes' 
  | 'ai_assistant' 
  | 'sos' 
  | 'lost_person' 
  | 'preferences';

export type VendorScreen = 
  | 'dashboard' 
  | 'registration' 
  | 'certificate' 
  | 'availability';

export type AdminScreen = 
  | 'dashboard' 
  | 'vendor_queue' 
  | 'crowd_map' 
  | 'live_alerts'
  | 'analytics'
  | 'alerts';
