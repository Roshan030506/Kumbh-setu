import { Facility, Vendor, EmergencyAlert, CrowdZone, RouteOption } from '../types';

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Ramkund Sacred Bathing Ghat',
    nameHi: 'रामकुंड पवित्र स्नान घाट',
    nameMr: 'रामकुंड पवित्र स्नान घाट',
    category: 'ghat',
    lat: 19.9975,
    lng: 73.7898,
    address: 'Panchavati, Godavari Riverbank, Nashik',
    verified: true,
    isFree: true,
    priceText: 'Free Holy Bathing',
    liveStatus: 'High Pilgrimage Flow • 15 Rescue Divers On-Duty',
    waitTimeMinutes: 12,
    capacityPercent: 88,
    distanceMeters: 240,
    rating: 4.9,
    reviewsCount: 14200,
    photos: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Anti-slip ramps', 'Life jacket distribution', 'Dedicated women bathing enclosures'],
    openHours: 'Open 24/7 (Aarti at 06:30 AM & 07:00 PM)',
    description: 'The epicentral holiest bathing spot of Kumbh Mela Nashik where millions take the divine dip in the sacred Godavari waters.',
    contactPhone: '+91 253 222 0100'
  },
  {
    id: 'fac-2',
    name: 'Laxman Kund & Gandhi Ghat',
    nameHi: 'लक्ष्मण कुंड एवं गांधी घाट',
    nameMr: 'लक्ष्मण कुंड आणि गांधी घाट',
    category: 'ghat',
    lat: 19.9962,
    lng: 73.7915,
    address: 'Downstream Godavari, Panchavati, Nashik',
    verified: true,
    isFree: true,
    priceText: 'Free Holy Bathing',
    liveStatus: 'Moderate Footfall • Ideal for Senior Citizens',
    waitTimeMinutes: 5,
    capacityPercent: 46,
    distanceMeters: 450,
    rating: 4.8,
    reviewsCount: 3800,
    photos: [
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Handrail support steps', 'Battery cart drop-off point', 'Changing tents'],
    openHours: 'Open 24/7',
    description: 'Serene holy ghat located slightly downstream from Ramkund with spacious paved courtyards and gentle stone steps.',
    contactPhone: '+91 253 222 0101'
  },
  {
    id: 'fac-3',
    name: 'Central Emergency Trauma & ICU Camp Sector-1',
    nameHi: 'केंद्रीय आपातकालीन आघात एवं आईसीयू शिविर सेक्टर-१',
    nameMr: 'मध्यवर्ती अतिदक्षता व अपघात निवारण छावणी सेक्टर-१',
    category: 'medical',
    lat: 19.9988,
    lng: 73.7885,
    address: 'Near Talkuteshwar Temple Ground, Panchavati',
    verified: true,
    isFree: true,
    priceText: 'Free Emergency Medical Care',
    liveStatus: 'Fully Staffed • 8 Doctors & 4 Ambulances Ready',
    waitTimeMinutes: 2,
    capacityPercent: 28,
    distanceMeters: 310,
    rating: 4.9,
    reviewsCount: 940,
    photos: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Stretcher ramp', 'Wheelchairs available', 'Cardiac defibrillator', 'Oxygen bank'],
    openHours: '24/7 Emergency Operation',
    description: 'Equipped with 20 critical care beds, mobile ECG, heat stroke cooling stations, and snake venom anti-sera.',
    contactPhone: '108 / +91 253 257 0108'
  },
  {
    id: 'fac-4',
    name: 'Red Cross First-Aid & Hydration Booth #4',
    nameHi: 'रेड क्रॉस प्राथमिक चिकित्सा एवं जल संचयन बूथ #४',
    nameMr: 'रेड क्रॉस प्रथमोपचार व जल केंद्र #४',
    category: 'medical',
    lat: 19.9950,
    lng: 73.7872,
    address: 'Ahilyabai Holkar Bridge Approach, Nashik',
    verified: true,
    isFree: true,
    priceText: 'Free First-Aid & ORS',
    liveStatus: 'Open • Minor dressings & ORS packs available',
    waitTimeMinutes: 1,
    capacityPercent: 15,
    distanceMeters: 550,
    rating: 4.7,
    reviewsCount: 420,
    photos: [
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Blood pressure check', 'Glucose monitoring', 'Foot blister clinic'],
    openHours: '06:00 AM - 11:00 PM',
    description: 'Rapid response station handling heat fatigue, dehydration, foot blisters, and emergency bandage care.',
    contactPhone: '+91 253 259 8899'
  },
  {
    id: 'fac-5',
    name: 'Shri Ram Mandir Mahaprasad Annakshetra',
    nameHi: 'श्री राम मंदिर महाप्रसाद अन्नक्षेत्र',
    nameMr: 'श्री राम मंदिर महाप्रसाद अन्नछत्र',
    category: 'food',
    lat: 19.9992,
    lng: 73.7920,
    address: 'Adjacent to Kalaram Sansthan, Panchavati, Nashik',
    verified: true,
    isFree: true,
    priceText: 'Free Satvik Bhojan (No Charge)',
    liveStatus: 'Active Serving • Continuous Hot Meal Langar',
    waitTimeMinutes: 8,
    capacityPercent: 72,
    distanceMeters: 420,
    rating: 5.0,
    reviewsCount: 8900,
    photos: [
      'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Elderly seating row', 'Pure filtered drinking water', 'Queue management railings'],
    openHours: '10:00 AM - 10:30 PM continuously',
    description: 'Serves hygienic warm Satvik meals (Rice, Moong Dal, Roti, Sabzi, and Sheera) to over 50,000 devotees daily.',
    contactPhone: '+91 253 251 1234'
  },
  {
    id: 'fac-6',
    name: 'Panchavati Pure Veg Bhojanalaya & Snacks',
    nameHi: 'पंचवटी शुद्ध शाकाहारी भोजनालय एवं अल्पाहार',
    nameMr: 'पंचवटी शुद्ध शाकाहारी भोजनालय आणि नाश्ता',
    category: 'food',
    lat: 19.9942,
    lng: 73.7890,
    address: 'Near Malviya Chowk, Panchavati',
    verified: true,
    isFree: false,
    priceText: '₹40 - ₹90 per thali',
    liveStatus: 'FSSAI Grade A • Fast Service',
    waitTimeMinutes: 4,
    capacityPercent: 60,
    distanceMeters: 620,
    rating: 4.6,
    reviewsCount: 1650,
    photos: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Ground floor level entry', 'Digital UPI accepted'],
    openHours: '05:30 AM - Midnight',
    description: 'Hot Poha, Sabudana Khichdi, Maharashtrian Thali, and hygienic bottled beverages with regulated pricing.',
    contactPhone: '+91 98220 54321'
  },
  {
    id: 'fac-7',
    name: 'Godavari Sheetal Jal RO Plant #12',
    nameHi: 'गोदावरी शीतल जल आरओ संयंत्र #१२',
    nameMr: 'गोदावरी शीतल जल आरओ शुद्धीकरण केंद्र #१२',
    category: 'water',
    lat: 19.9970,
    lng: 73.7891,
    address: 'Opposite Sita Gufa, Main Ghat Road',
    verified: true,
    isFree: true,
    priceText: 'Free 100% UV-RO Water',
    liveStatus: 'Normal Flow • 40 Dispensing Taps Active',
    waitTimeMinutes: 1,
    capacityPercent: 20,
    distanceMeters: 180,
    rating: 4.9,
    reviewsCount: 3100,
    photos: [
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Low height taps for children & wheelchair users', 'Cold water dispenser'],
    openHours: '24/7 Uninterrupted',
    description: 'Municipal UV treated and tested drinking water station with dedicated copper vessel refilling lanes.',
    contactPhone: '+91 253 222 0108'
  },
  {
    id: 'fac-8',
    name: 'Eco-Smart Bio-Sanitation Complex Block-3',
    nameHi: 'इको-स्मार्ट जैव-स्वच्छता कॉम्प्लेक्स ब्लॉक-३',
    nameMr: 'इको-स्मार्ट जैव-स्वच्छता संकुल ब्लॉक-३',
    category: 'toilet',
    lat: 19.9968,
    lng: 73.7925,
    address: 'Behind Kapila Sangam Walkway, Panchavati',
    verified: true,
    isFree: true,
    priceText: 'Free Municipal Facility',
    liveStatus: 'Cleaned 10 mins ago • 30 Cabin Units Available',
    waitTimeMinutes: 2,
    capacityPercent: 40,
    distanceMeters: 380,
    rating: 4.8,
    reviewsCount: 2200,
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Dedicated disabled accessible cubicles with handrails', 'Baby care changing shelf'],
    openHours: '24/7 Attendant on Duty',
    description: 'High-tech bio-digester sanitation units continuously disinfected with water sensor flushes and liquid soap.',
    contactPhone: '+91 253 222 0104'
  },
  {
    id: 'fac-9',
    name: 'Rain Basera Pilgrim Mega Dormitory #2',
    nameHi: 'रैन बसेरा तीर्थयात्री मेगा शयनागार #२',
    nameMr: 'रेन बसेरा भाविक महाविश्रामगृह #२',
    category: 'lodging',
    lat: 20.0010,
    lng: 73.7870,
    address: 'Near Old Nashik Bus Stand Ground, Panchavati',
    verified: true,
    isFree: true,
    priceText: 'Free Night Shelter (Aadhaar/Pass required)',
    liveStatus: '140 Beds Vacant • Secure Luggage Cloakroom',
    waitTimeMinutes: 5,
    capacityPercent: 65,
    distanceMeters: 750,
    rating: 4.5,
    reviewsCount: 1920,
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Elevator access', 'Special senior citizen floor', '24/7 CCTV surveillance'],
    openHours: 'Check-in: 05:00 AM - 11:30 PM',
    description: 'Government subsidized carpeted resting hall with clean mattresses, woolen blankets, charging docks, and security guards.',
    contactPhone: '+91 253 257 5500'
  },
  {
    id: 'fac-10',
    name: 'Tapovan Pilgrim Luxury Tent City Sector-B',
    nameHi: 'तपोवन तीर्थयात्री टेंट सिटी सेक्टर-बी',
    nameMr: 'तपोवन भाविक तंबू नगरी सेक्टर-बी',
    category: 'lodging',
    lat: 19.9920,
    lng: 73.8010,
    address: 'Tapovan Cultural Ground, Nashik',
    verified: true,
    isFree: false,
    priceText: '₹350 - ₹950 per night',
    liveStatus: 'Verified Deluxe Cottages & Shared Tents Available',
    waitTimeMinutes: 0,
    capacityPercent: 55,
    distanceMeters: 1400,
    rating: 4.7,
    reviewsCount: 880,
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Paved wooden pathways', 'Attached washrooms', 'Free shuttle to Ghats'],
    openHours: '24/7 Reception',
    description: 'Spacious waterproof tents equipped with beds, fans, warm water geysers, and spiritual satsang pavilions.',
    contactPhone: '+91 94222 10101'
  },
  {
    id: 'fac-11',
    name: 'Panchavati Holding Ground Parking P-3',
    nameHi: 'पंचवटी होल्डिंग ग्राउंड पार्किंग पी-३',
    nameMr: 'पंचवटी वाहन तळ पी-३',
    category: 'parking',
    lat: 20.0035,
    lng: 73.7950,
    address: 'Aurangabad Road Bypass, Panchavati',
    verified: true,
    isFree: true,
    priceText: 'Free Mela Parking',
    liveStatus: '320 Car Slots & 650 Two-Wheeler Slots Open',
    waitTimeMinutes: 3,
    capacityPercent: 58,
    distanceMeters: 1100,
    rating: 4.6,
    reviewsCount: 1450,
    photos: [
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Dedicated disabled vehicle parking next to shuttle stand', 'E-rickshaw hub'],
    openHours: '24/7 Monitored with Boom Barriers',
    description: 'Safe fenced parking area with CCTV surveillance, EV chargers, and free battery shuttle buses directly to Ramkund.',
    contactPhone: '+91 253 222 0110'
  },
  {
    id: 'fac-12',
    name: 'Kapila-Godavari Sangam Holy Ghat',
    nameHi: 'कपिला-गोदावरी संगम पवित्र घाट',
    nameMr: 'कपिला-गोदावरी संगम पवित्र घाट',
    category: 'ghat',
    lat: 19.9948,
    lng: 73.7942,
    address: 'Sangam Point, Panchavati, Nashik',
    verified: true,
    isFree: true,
    priceText: 'Free Holy Snan',
    liveStatus: 'Pleasant Flow • Deep Water Safety Nets Installed',
    waitTimeMinutes: 3,
    capacityPercent: 35,
    distanceMeters: 610,
    rating: 4.8,
    reviewsCount: 2900,
    photos: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    accessibilityFeatures: ['Gradual gradient ramps', 'Sitting steps along riverbanks'],
    openHours: 'Open 24/7',
    description: 'Sacred confluence where river Kapila merges with holy Godavari. Highly recommended during peak hour congestion at Ramkund.',
    contactPhone: '+91 253 222 0102'
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'ven-1',
    businessName: 'Nashik Sugandhi Modak & Mahaprasad Stall',
    ownerName: 'Santosh Vitthal Joshi',
    phone: '9822104567',
    category: 'Prasad & Sweets',
    lat: 19.9978,
    lng: 73.7889,
    address: 'Stall #14, Ramkund North Promenade',
    status: 'verified',
    menuOrProducts: [
      { name: 'Pure Ghee Ukadiche Modak (2 pcs)', price: 40 },
      { name: 'Dry Fruit Peda Box (250g)', price: 120 },
      { name: 'Panchamrit Prasad Cup', price: 20 },
      { name: 'Kumbh Souvenir Brass Diya', price: 60 }
    ],
    photos: ['https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=600&q=80'],
    ocrDocument: {
      licenseNumber: 'FSSAI-MH-2026-89412',
      expiryDate: '2026-12-31',
      issuingAuthority: 'Food Safety & Standards Authority of India - Nashik Circle',
      complianceScore: 98,
      documentType: 'Food Safety Hygiene Certificate',
      verifiedDate: '2026-08-14'
    },
    isOpen: true,
    stockLevelPercent: 85,
    footfallCount: 3420,
    registeredAt: '2026-08-10'
  },
  {
    id: 'ven-2',
    businessName: 'Godavari Jal Seva & Copper Kalash Bhandar',
    ownerName: 'Ganesh Narayan Patil',
    phone: '9850021345',
    category: 'Puja Articles & Souvenirs',
    lat: 19.9969,
    lng: 73.7905,
    address: 'Shop 8, Laxman Kund Steps',
    status: 'verified',
    menuOrProducts: [
      { name: 'Pure Copper Holy Water Kalash', price: 150 },
      { name: 'Sealed Ganga-Godavari Sacred Jal (1L)', price: 30 },
      { name: 'Tulsi Mala & Rudraksha Japa Beads', price: 50 },
      { name: 'Cotton Puja Vastra Pair', price: 80 }
    ],
    photos: ['https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=600&q=80'],
    ocrDocument: {
      licenseNumber: 'NMC-TRADE-2026-0419',
      expiryDate: '2027-03-31',
      issuingAuthority: 'Nashik Municipal Corporation License Bureau',
      complianceScore: 95,
      documentType: 'Municipal Trade & Merchant License',
      verifiedDate: '2026-08-18'
    },
    isOpen: true,
    stockLevelPercent: 70,
    footfallCount: 2150,
    registeredAt: '2026-08-15'
  },
  {
    id: 'ven-3',
    businessName: 'Mauli Satvik Pure Bhojanalaya',
    ownerName: 'Eknath Shinde',
    phone: '9423189900',
    category: 'Food Stall',
    lat: 19.9984,
    lng: 73.7912,
    address: 'Lane 2, Panchavati Temple Road',
    status: 'pending',
    menuOrProducts: [
      { name: 'Special Poori Bhaji & Sheera Plate', price: 50 },
      { name: 'Hot Sabudana Vada (2 pcs)', price: 40 },
      { name: 'Gir Cow Masala Chaas (200ml)', price: 20 },
      { name: 'Warm Jaggery Halwa Cup', price: 30 }
    ],
    photos: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'],
    ocrDocument: {
      licenseNumber: 'FSSAI-MH-2026-99301',
      expiryDate: '2026-11-30',
      issuingAuthority: 'FSSAI State Level Inspectorate',
      complianceScore: 92,
      documentType: 'Commercial Food Safety License'
    },
    isOpen: true,
    stockLevelPercent: 90,
    footfallCount: 890,
    registeredAt: '2026-09-12'
  },
  {
    id: 'ven-4',
    businessName: 'Anand Ashram Pilgrim Dormitory',
    ownerName: 'Mahant Rajeshwar Giri',
    phone: '9890123450',
    category: 'Lodging / Rest',
    lat: 20.0005,
    lng: 73.7895,
    address: 'Near Old Panchavati Post Office',
    status: 'pending',
    menuOrProducts: [
      { name: 'Single Clean Dorm Bed (Night)', price: 200 },
      { name: 'Family Room 4 Beds', price: 750 },
      { name: 'Hot Water Bucket Service', price: 20 }
    ],
    photos: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'],
    ocrDocument: {
      licenseNumber: 'NMC-HOTEL-2026-7812',
      expiryDate: '2026-12-31',
      issuingAuthority: 'Nashik District Tourism & Hospitality Board',
      complianceScore: 89,
      documentType: 'Temporary Tourist Accommodations Permit'
    },
    isOpen: true,
    stockLevelPercent: 40,
    capacityRooms: 18,
    footfallCount: 650,
    registeredAt: '2026-09-14'
  },
  {
    id: 'ven-5',
    businessName: 'Nashik Herbal Ayurvedic Kadha & Balm',
    ownerName: 'Dr. Vaidya Shrikant Deshpande',
    phone: '9823055443',
    category: 'Healthcare & Essentials',
    lat: 19.9958,
    lng: 73.7880,
    address: 'Booth 5, Victoria Bridge Walkway',
    status: 'verified',
    menuOrProducts: [
      { name: 'Immunity Tulsi Kadha Cup', price: 15 },
      { name: 'Foot Fatigue Ayurvedic Pain Oil (100ml)', price: 80 },
      { name: 'Herbal Throat Lozenges (Strip)', price: 25 }
    ],
    photos: ['https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80'],
    ocrDocument: {
      licenseNumber: 'AYUSH-MH-2026-1188',
      expiryDate: '2027-01-31',
      issuingAuthority: 'Ministry of Ayush Maharashtra Council',
      complianceScore: 97,
      documentType: 'Ayurvedic Drug Retail Authorization',
      verifiedDate: '2026-08-20'
    },
    isOpen: true,
    stockLevelPercent: 75,
    footfallCount: 1480,
    registeredAt: '2026-08-16'
  },
  {
    id: 'ven-6',
    businessName: 'Kumbh Express Battery Cart & Luggage Porter',
    ownerName: 'Ashok Rao Kadam',
    phone: '9765432109',
    category: 'Mobility & Services',
    lat: 19.9995,
    lng: 73.7940,
    address: 'Stand A, Near Kalaram Gate',
    status: 'verified',
    menuOrProducts: [
      { name: 'Senior Citizen Battery Cart Ride to Ramkund', price: 30 },
      { name: 'Luggage Cloakroom (4 Hours)', price: 20 },
      { name: 'Wheelchair Day Rental with Escort', price: 150 }
    ],
    photos: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'],
    ocrDocument: {
      licenseNumber: 'RTO-NSK-EV-2026-0921',
      expiryDate: '2026-10-31',
      issuingAuthority: 'Nashik Regional Transport Authority',
      complianceScore: 96,
      documentType: 'Electric Mobility Feeder Permit',
      verifiedDate: '2026-08-25'
    },
    isOpen: true,
    stockLevelPercent: 80,
    footfallCount: 2900,
    registeredAt: '2026-08-12'
  }
];

export const INITIAL_ALERTS: EmergencyAlert[] = [
  {
    id: 'alt-1',
    type: 'sos',
    title: 'Medical Assistance SOS - Ramkund East Steps',
    details: 'Elderly pilgrim collapsed due to dehydration and mild heat exhaustion. Immediate oxygen requested.',
    lat: 19.9976,
    lng: 73.7901,
    locationName: 'Ramkund East Ghat Step #14',
    status: 'responding',
    timestamp: '2 mins ago (10:42 AM)',
    reportedBy: 'Kailash Nath Mishra',
    phone: '+91 98224 88771',
    responseUnit: 'Quick Response Medical Patrol Unit #14',
    etaMinutes: 2
  },
  {
    id: 'alt-2',
    type: 'lost_person',
    title: 'Missing Person: Smt. Parvati Devi (Age 71)',
    details: 'Got separated from family near Kalaram temple entrance during morning crowd surge. Wearing yellow Paithani saree with rudraksha mala.',
    lat: 19.9990,
    lng: 73.7918,
    locationName: 'Kalaram Temple North Archway',
    status: 'active',
    timestamp: '15 mins ago (10:29 AM)',
    reportedBy: 'Maheshwar Sharma (Son)',
    phone: '+91 97665 12090',
    lostPersonDetails: {
      name: 'Parvati Devi',
      age: 71,
      gender: 'Female',
      lastSeenTime: '10:15 AM at Kalaram Gate',
      clothing: 'Yellow saree, red blouse, carrying small cloth bag with medication',
      guardianName: 'Maheshwar Sharma',
      guardianPhone: '+91 97665 12090',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'alt-3',
    type: 'crowd_warning',
    title: 'High Density Surge at Ahilyabai Bridge Approach',
    details: 'Pedestrian density exceeding 4.2 persons/sq meter. Police diversions active. Pilgrims redirected to Victoria Promenade.',
    lat: 19.9952,
    lng: 73.7878,
    locationName: 'Ahilyabai Holkar Bridge Approach',
    status: 'active',
    timestamp: '25 mins ago (10:18 AM)',
    reportedBy: 'Traffic Control Tower #3',
    phone: '+91 253 222 0100',
    responseUnit: 'Sector 2 Rapid Action Force'
  }
];

export const CROWD_ZONES: CrowdZone[] = [
  {
    id: 'zone-1',
    name: 'Ramkund Core Bathing Zone',
    nameHi: 'रामकुंड मुख्य स्नान क्षेत्र',
    nameMr: 'रामकुंड मुख्य स्नान परिसर',
    severity: 'heavy',
    densityPercent: 91,
    coordinates: [
      [19.9982, 73.7885],
      [19.9984, 73.7912],
      [19.9965, 73.7915],
      [19.9962, 73.7888]
    ],
    currentFootfall: '~78,000 pilgrims/hour',
    advice: 'Heavy congestion. Use Laxman Kund or Gandhi Ghat for peaceful holy snan.'
  },
  {
    id: 'zone-2',
    name: 'Panchavati Temple Bazaar Lane',
    nameHi: 'पंचवटी मंदिर बाज़ार लेन',
    nameMr: 'पंचवटी मंदिर बाजार रस्ता',
    severity: 'moderate',
    densityPercent: 64,
    coordinates: [
      [20.0005, 73.7905],
      [20.0015, 73.7935],
      [19.9988, 73.7942],
      [19.9980, 73.7915]
    ],
    currentFootfall: '~28,000 pilgrims/hour',
    advice: 'Moderate movement. Queue system active with average wait of 15 minutes.'
  },
  {
    id: 'zone-3',
    name: 'Tapovan Green Corridor & Riverwalk',
    nameHi: 'तपोवन हरित गलियारा एवं नदी तट',
    nameMr: 'तपोवन हरित कॉरिडॉर व नदी किनारा मार्ग',
    severity: 'low',
    densityPercent: 28,
    coordinates: [
      [19.9945, 73.7950],
      [19.9955, 73.8010],
      [19.9915, 73.8020],
      [19.9910, 73.7955]
    ],
    currentFootfall: '~9,500 pilgrims/hour',
    advice: 'Very low congestion. Ideal scenic bypass route with shade and rest booths.'
  }
];

export const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'route-normal',
    name: 'Direct Temple Bazaar Route',
    type: 'normal',
    distanceKm: 1.1,
    walkingMinutes: 34,
    crowdRisk: 'high',
    accessible: false,
    points: [
      [20.0035, 73.7950], // Parking P3
      [20.0008, 73.7925], // Old bazaar road
      [19.9995, 73.7910], // Bottleneck junction
      [19.9982, 73.7895], // Dense crowd gate
      [19.9975, 73.7898]  // Ramkund
    ],
    highlights: [
      'Passes directly through high-density bottleneck (91% density)',
      'Uneven narrow stone stairs near bazaar',
      'Average 20-30 min wait at barricade checkpoints',
      'Not recommended for elderly, children, or wheelchair pilgrims'
    ]
  },
  {
    id: 'route-crowd-aware',
    name: 'AI Crowd-Aware River Promenade Route',
    type: 'crowd_aware',
    distanceKm: 1.45,
    walkingMinutes: 18,
    crowdRisk: 'low',
    accessible: true,
    points: [
      [20.0035, 73.7950], // Parking P3
      [20.0020, 73.7980], // Wide bypass lane
      [19.9970, 73.7985], // Riverwalk entrance
      [19.9950, 73.7940], // Kapila Sangam garden path
      [19.9962, 73.7915], // Laxman Kund approach
      [19.9975, 73.7898]  // Ramkund (Arrive smoothly from West Ramp)
    ],
    highlights: [
      'Visibly curves around the red high-density congestion zone',
      'Fully wheelchair & senior-citizen friendly with gradual anti-slip ramps',
      'Continuous mist cooling fans and shaded drinking water chhatris',
      'Average walking time is 16 mins faster due to zero bottleneck halts'
    ]
  }
];
