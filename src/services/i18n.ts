import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  kumbhNashik2026: string;
  selectRole: string;
  roleSubtitle: string;
  pilgrim: string;
  vendor: string;
  admin: string;
  pilgrimDesc: string;
  vendorDesc: string;
  adminDesc: string;
  continueAs: string;
  loginTitle: string;
  loginSubtitle: string;
  phoneLabel: string;
  phonePlaceholder: string;
  sendOtp: string;
  enterOtp: string;
  otpPlaceholder: string;
  verifyAndEnter: string;
  resendOtp: string;
  demoOtpHint: string;
  logout: string;
  preferences: string;
  language: string;
  accessibilityNeeds: string;
  elderlyDisabledMode: string;
  elderlyDisabledDesc: string;
  savePreferences: string;
  
  // Navigation
  map: string;
  routes: string;
  assistant: string;
  sos: string;
  lostPerson: string;
  vendorDashboard: string;
  vendorRegister: string;
  certificates: string;
  availability: string;
  adminDashboard: string;
  vendorQueue: string;
  crowdMonitoring: string;
  liveAlerts: string;

  // Facilities
  all: string;
  ghats: string;
  medical: string;
  food: string;
  water: string;
  toilets: string;
  lodging: string;
  parking: string;
  verifiedBadge: string;
  liveWaitTime: string;
  crowdLevel: string;
  directions: string;
  viewDetails: string;
  freeService: string;

  // Routes
  normalRoute: string;
  crowdAwareRoute: string;
  routeComparison: string;
  avoidCrowdZones: string;
  crowdRiskHigh: string;
  crowdRiskLow: string;
  startNavigation: string;

  // SOS
  emergencySosTitle: string;
  emergencySosSubtitle: string;
  tapForHelp: string;
  sendingAlert: string;
  alertSentSuccess: string;
  gpsCoordinates: string;
  controlRoomNotified: string;
  helpIsOnTheWay: string;
  callPolice: string;
  callAmbulance: string;

  // Lost person
  reportLostPerson: string;
  lostPersonName: string;
  lostPersonAge: string;
  lostPersonGender: string;
  lastSeenLocation: string;
  clothingDesc: string;
  uploadPhoto: string;
  submitReport: string;
  reportBroadcastSuccess: string;

  // Vendor
  businessName: string;
  category: string;
  licenseNumber: string;
  expiryDate: string;
  ocrExtracting: string;
  ocrExtractedSuccess: string;
  uploadGovtCertificate: string;
  storeStatus: string;
  open: string;
  closed: string;
  stockAvailability: string;
  pendingVerification: string;
  approvedVerified: string;
  approve: string;
  reject: string;

  // Admin
  totalVendors: string;
  verifiedVendors: string;
  activePilgrims: string;
  sosAlertsToday: string;
  dispatchUnit: string;
  markResolved: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Smart Pilgrim Platform",
    tagline: "Kumbh Mela 2026 Nashik",
    kumbhNashik2026: "Kumbh Mela 2026 • Nashik-Trimbakeshwar",
    selectRole: "Select Your Access Portal",
    roleSubtitle: "Official digital gateway for pilgrims, registered vendors, and district authorities",
    pilgrim: "Pilgrim / Yatri",
    vendor: "Authorized Vendor",
    admin: "Mela Control Admin",
    pilgrimDesc: "Access crowd-aware routes, verified ghats, drinking water, medical camps, AI guide & SOS.",
    vendorDesc: "Register stalls, verify certificates via OCR, manage real-time inventory & pilgrim footfall.",
    adminDesc: "Live crowd heatmaps, dispatch emergency teams, and verify vendor compliance queue.",
    continueAs: "Continue as",
    loginTitle: "Secure OTP Authentication",
    loginSubtitle: "Enter your registered mobile number for instant Kumbh Pass access",
    phoneLabel: "Mobile Number",
    phonePlaceholder: "Enter 10-digit mobile number",
    sendOtp: "Send Secure OTP",
    enterOtp: "Enter 4-digit verification code",
    otpPlaceholder: "4-digit code",
    verifyAndEnter: "Verify & Enter Portal",
    resendOtp: "Resend Code",
    demoOtpHint: "Demo OTP is 2026 (Auto-fills on button click)",
    logout: "Exit / Logout",
    preferences: "Accessibility & Language",
    language: "Preferred Language",
    accessibilityNeeds: "Assisted Accessibility",
    elderlyDisabledMode: "Elderly & Wheelchair Priority Mode",
    elderlyDisabledDesc: "Highlights step-free ramps, battery carts, priority medical booths, and high contrast markers.",
    savePreferences: "Save Preferences",

    map: "Holy Map & Ghats",
    routes: "Safe Routes",
    assistant: "AI Mela Sahayak",
    sos: "Emergency SOS",
    lostPerson: "Lost & Found",
    vendorDashboard: "My Stall Status",
    vendorRegister: "Register Stall",
    certificates: "OCR Certificate",
    availability: "Stock & Status",
    adminDashboard: "Command Center",
    vendorQueue: "Vendor Approvals",
    crowdMonitoring: "Crowd Heatmap",
    liveAlerts: "Live Emergency Hub",

    all: "All Facilities",
    ghats: "Holy Ghats",
    medical: "Medical Camps",
    food: "Prasadam & Food",
    water: "Drinking Water",
    toilets: "Eco Toilets",
    lodging: "Dharmashala & Tents",
    parking: "Holding Parking",
    verifiedBadge: "District Verified",
    liveWaitTime: "Live Wait",
    crowdLevel: "Crowd Density",
    directions: "Get Directions",
    viewDetails: "View Details",
    freeService: "Free Seva",

    normalRoute: "Standard Route (Direct)",
    crowdAwareRoute: "AI Crowd-Aware Route (Recommended)",
    routeComparison: "Live Route Comparison",
    avoidCrowdZones: "Bypasses Ramkund Main Bottleneck Zone",
    crowdRiskHigh: "High Congestion",
    crowdRiskLow: "Free Moving & Safe",
    startNavigation: "Start Guided Walk",

    emergencySosTitle: "One-Touch Emergency SOS",
    emergencySosSubtitle: "Instantly sends your exact GPS coordinates to Nashik Mela Police & Quick Response Teams",
    tapForHelp: "PRESS FOR IMMEDIATE HELP",
    sendingAlert: "Transmitting GPS beacon to Central Control Room...",
    alertSentSuccess: "Emergency Alert Dispatched Successfully!",
    gpsCoordinates: "Your Captured GPS",
    controlRoomNotified: "Central Control Room has received your distress signal",
    helpIsOnTheWay: "QRT Patrol Unit #14 is moving towards your location (ETA ~3 mins)",
    callPolice: "Call Police (112)",
    callAmbulance: "Call Ambulance (108)",

    reportLostPerson: "Report Missing Pilgrim",
    lostPersonName: "Full Name of Person",
    lostPersonAge: "Approximate Age",
    lostPersonGender: "Gender",
    lastSeenLocation: "Last Seen Spot / Ghat",
    clothingDesc: "Clothing & Distinguishing Marks",
    uploadPhoto: "Upload Recent Photograph",
    submitReport: "Submit Distress Report",
    reportBroadcastSuccess: "Report broadcasted to all 12 Mela information kiosks & police booths",

    businessName: "Business / Stall Name",
    category: "Category",
    licenseNumber: "FSSAI / Municipal License",
    expiryDate: "Valid Thru",
    ocrExtracting: "Running Intelligent Document OCR Analysis...",
    ocrExtractedSuccess: "Document Authenticated! Extracted Fields Verified",
    uploadGovtCertificate: "Upload License / Health Certificate",
    storeStatus: "Current Stall Status",
    open: "Open for Pilgrims",
    closed: "Temporarily Closed",
    stockAvailability: "Real-time Stock / Seat Capacity",
    pendingVerification: "Verification In Review",
    approvedVerified: "Official Kumbh 2026 Vendor Pass",
    approve: "Approve Vendor",
    reject: "Flag / Reject",

    totalVendors: "Total Registered Vendors",
    verifiedVendors: "Verified & Active",
    activePilgrims: "Live Pilgrims in Sector",
    sosAlertsToday: "Active SOS Alerts",
    dispatchUnit: "Dispatch QRT Unit",
    markResolved: "Resolve Incident"
  },

  hi: {
    appName: "स्मार्ट तीर्थयात्री मंच",
    tagline: "कुंभ मेला 2026 नासिक",
    kumbhNashik2026: "कुंभ मेला 2026 • नासिक-त्र्यंबकेश्वर",
    selectRole: "अपना पोर्टल चुनें",
    roleSubtitle: "तीर्थयात्रियों, अधिकृत विक्रेताओं और मेला प्रशासन के लिए आधिकारिक डिजिटल सेवा",
    pilgrim: "तीर्थयात्री / दर्शनार्थी",
    vendor: "अधिकृत विक्रेता",
    admin: "मेला नियंत्रण कक्ष",
    pilgrimDesc: "भीड़-मुक्त मार्ग, सत्यापित घाट, पेयजल, चिकित्सा शिविर, एआई सहायक और आपातकालीन एसओएस।",
    vendorDesc: "स्टॉल पंजीकृत करें, ओसीआर द्वारा प्रमाण पत्र सत्यापित करें और लाइव स्टॉक प्रबंधित करें।",
    adminDesc: "लाइव क्राउड हीटमैप, आपातकालीन दल प्रेषण और विक्रेता सत्यापन कतार।",
    continueAs: "के रूप में प्रवेश करें",
    loginTitle: "ओटीपी द्वारा सुरक्षित प्रवेश",
    loginSubtitle: "कुंभ पास प्राप्त करने के लिए अपना पंजीकृत मोबाइल नंबर दर्ज करें",
    phoneLabel: "मोबाइल नंबर",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
    sendOtp: "सुरक्षित ओटीपी भेजें",
    enterOtp: "4 अंकों का सत्यापन कोड दर्ज करें",
    otpPlaceholder: "4-अंकीय कोड",
    verifyAndEnter: "सत्यापित करें और प्रवेश करें",
    resendOtp: "कोड पुनः भेजें",
    demoOtpHint: "डेमो ओटीपी 2026 है (बटन पर क्लिक करने पर स्वतः भरता है)",
    logout: "लॉगआउट / बाहर निकलें",
    preferences: "सुलभता और भाषा",
    language: "पसंदीदा भाषा",
    accessibilityNeeds: "सुलभता सहायता",
    elderlyDisabledMode: "वरिष्ठ नागरिक एवं दिव्यांग प्राथमिकता मोड",
    elderlyDisabledDesc: "रैंप, बैटरी गाड़ियां, प्राथमिकता चिकित्सा बूथ और सहज मार्ग उजागर करता है।",
    savePreferences: "प्राथमिकताएं सहेजें",

    map: "पवित्र घाट व मानचित्र",
    routes: "सुरक्षित मार्ग",
    assistant: "एआई मेला सहायक",
    sos: "आपातकालीन एसओएस",
    lostPerson: "खोया-पाया केंद्र",
    vendorDashboard: "स्टॉल स्थिति",
    vendorRegister: "स्टॉल पंजीकरण",
    certificates: "ओसीआर प्रमाण पत्र",
    availability: "स्टॉक व उपलब्धता",
    adminDashboard: "कमांड सेंटर",
    vendorQueue: "विक्रेता अनुमोदन",
    crowdMonitoring: "भीड़ हीटमैप",
    liveAlerts: "आपातकालीन हब",

    all: "सभी सुविधाएं",
    ghats: "पवित्र घाट",
    medical: "चिकित्सा शिविर",
    food: "प्रसादम व भोजन",
    water: "शुद्ध पेयजल",
    toilets: "बायो शौचालय",
    lodging: "धर्मशाला व तंबू",
    parking: "पार्किंग क्षेत्र",
    verifiedBadge: "प्रशासन द्वारा सत्यापित",
    liveWaitTime: "प्रतीक्षा समय",
    crowdLevel: "भीड़ घनत्व",
    directions: "दिशा-निर्देश",
    viewDetails: "विवरण देखें",
    freeService: "निःशुल्क सेवा",

    normalRoute: "सामान्य मार्ग (सीधा)",
    crowdAwareRoute: "एआई सुरक्षित मार्ग (अनुशंसित)",
    routeComparison: "लाइव मार्ग तुलना",
    avoidCrowdZones: "रामकुंड के अत्यधिक भीड़ वाले क्षेत्र से बचाता है",
    crowdRiskHigh: "भारी भीड़",
    crowdRiskLow: "सुगम एवं सुरक्षित",
    startNavigation: "नेविगेशन शुरू करें",

    emergencySosTitle: "एक-स्पर्श आपातकालीन एसओएस",
    emergencySosSubtitle: "नासिक मेला पुलिस और त्वरित प्रतिक्रिया दल (QRT) को आपका सटीक जीपीएस भेजता है",
    tapForHelp: "तत्काल सहायता के लिए दबाएं",
    sendingAlert: "केंद्रीय नियंत्रण कक्ष को जीपीएस भेजा जा रहा है...",
    alertSentSuccess: "आपातकालीन संदेश सफलतापूर्वक भेजा गया!",
    gpsCoordinates: "आपका सटीक जीपीएस",
    controlRoomNotified: "केंद्रीय नियंत्रण कक्ष को आपका संकट संदेश मिल गया है",
    helpIsOnTheWay: "क्यूआरटी गश्ती दल #14 आपकी ओर रवाना हो चुका है (लगभग 3 मिनट)",
    callPolice: "पुलिस को कॉल करें (112)",
    callAmbulance: "एंबुलेंस को कॉल करें (108)",

    reportLostPerson: "लापता व्यक्ति की सूचना दें",
    lostPersonName: "व्यक्ति का पूरा नाम",
    lostPersonAge: "अनुमानित आयु",
    lostPersonGender: "लिंग",
    lastSeenLocation: "अंतिम बार देखा गया स्थान / घाट",
    clothingDesc: "पहने हुए कपड़े और पहचान चिह्न",
    uploadPhoto: "हालिया फोटो अपलोड करें",
    submitReport: "सूचना दर्ज करें",
    reportBroadcastSuccess: "सभी 12 मेला सूचना केंद्रों और पुलिस बूथों पर सूचना प्रसारित कर दी गई है",

    businessName: "दुकान / स्टॉल का नाम",
    category: "श्रेणी",
    licenseNumber: "एफएसएसएआई / नगर पालिका लाइसेंस",
    expiryDate: "वैधता तिथि",
    ocrExtracting: "दस्तावेज़ ओसीआर विश्लेषण प्रगति पर है...",
    ocrExtractedSuccess: "दस्तावेज़ सत्यापित! विवरण स्वतः भरे गए",
    uploadGovtCertificate: "लाइसेंस / स्वास्थ्य प्रमाण पत्र अपलोड करें",
    storeStatus: "स्टॉल की वर्तमान स्थिति",
    open: "तीर्थयात्रियों के लिए खुला",
    closed: "अस्थायी रूप से बंद",
    stockAvailability: "लाइव स्टॉक / स्थान उपलब्धता",
    pendingVerification: "सत्यापन प्रक्रियाधीन",
    approvedVerified: "अधिकृत कुंभ 2026 विक्रेता पास",
    approve: "अनुमोदन करें",
    reject: "अस्वीकार करें",

    totalVendors: "कुल पंजीकृत विक्रेता",
    verifiedVendors: "सत्यापित विक्रेता",
    activePilgrims: "सक्रिय तीर्थयात्री",
    sosAlertsToday: "सक्रिय एसओएस अलर्ट",
    dispatchUnit: "क्यूआरटी दल भेजें",
    markResolved: "मामला हल करें"
  },

  mr: {
    appName: "स्मार्ट तीर्थक्षेत्र प्लॅटफॉर्म",
    tagline: "कुंभमेळा २०२६ नाशिक",
    kumbhNashik2026: "कुंभमेळा २०२६ • नाशिक-त्र्यंबकेश्वर",
    selectRole: "आपले पोर्टल निवडा",
    roleSubtitle: "भाविक, अधिकृत विक्रेते आणि जिल्हा प्रशासनासाठी अधिकृत डिजिटल व्यासपीठ",
    pilgrim: "भाविक / वारकरी",
    vendor: "अधिकृत विक्रेता",
    admin: "मेळा नियंत्रण कक्ष",
    pilgrimDesc: "गर्दीमुक्त मार्ग, अधिकृत घाट, शुद्ध पाणी, वैद्यकीय मदत कक्ष, एआय मार्गदर्शक आणि एसओएस.",
    vendorDesc: "स्टॉल नोंदणी करा, ओसीआर द्वारे परवाना तपासा आणि थेट उपलब्धता व्यवस्थापित करा.",
    adminDesc: "थेट गर्दी निरीक्षण, तात्काळ मदत पथके आणि विक्रेता तपासणी कक्ष.",
    continueAs: "म्हणून प्रवेश करा",
    loginTitle: "ओटीपी सुरक्षित प्रवेश",
    loginSubtitle: "कुंभ डिजिटल पास मिळवण्यासाठी आपला अधिकृत मोबाईल क्रमांक प्रविष्ट करा",
    phoneLabel: "मोबाईल क्रमांक",
    phonePlaceholder: "१० अंकी मोबाईल क्रमांक टाका",
    sendOtp: "ओटीपी पाठवा",
    enterOtp: "४ अंकी पडताळणी कोड टाका",
    otpPlaceholder: "४-अंकी कोड",
    verifyAndEnter: "पडताळणी करून प्रवेश करा",
    resendOtp: "पुन्हा पाठवा",
    demoOtpHint: "डेमो ओटीपी २०२६ आहे (बटणावर क्लिक करताच आपोआप भरला जातो)",
    logout: "बाहेर पडा / लॉगआउट",
    preferences: "सुलभता आणि भाषा",
    language: "पसंतीची भाषा",
    accessibilityNeeds: "सुलभता सुविधा",
    elderlyDisabledMode: "ज्येष्ठ नागरिक व दिव्यांग प्राधान्य मोड",
    elderlyDisabledDesc: "पायऱ्या नसलेले रॅम्प, बॅटरी गाड्या, प्राधान्य आरोग्य केंद्र आणि सुलभ मार्ग दाखवते.",
    savePreferences: "प्राधान्ये जतन करा",

    map: "पवित्र घाट व नकाशा",
    routes: "सुरक्षित मार्ग",
    assistant: "एआय मेळा सहाय्यक",
    sos: "तातडीची मदत (SOS)",
    lostPerson: "हरवलेले / सापडलेले",
    vendorDashboard: "स्टॉल स्थिती",
    vendorRegister: "स्टॉल नोंदणी",
    certificates: "ओसीआर प्रमाणपत्र",
    availability: "साठा व उपलब्धता",
    adminDashboard: "नियंत्रण केंद्र",
    vendorQueue: "विक्रेता पडताळणी",
    crowdMonitoring: "गर्दी नकाशा",
    liveAlerts: "तातडीची मदत केंद्र",

    all: "सर्व सुविधा",
    ghats: "पवित्र घाट",
    medical: "वैद्यकीय मदत छावणी",
    food: "महाप्रसाद व अन्नछत्र",
    water: "पिण्याचे पाणी",
    toilets: "स्वच्छता गृह",
    lodging: "धर्मशाळा व तंबू",
    parking: "पार्किंग व्यवस्था",
    verifiedBadge: "प्रशासन प्रमाणित",
    liveWaitTime: "प्रतीक्षा वेळ",
    crowdLevel: "गर्दी प्रमाण",
    directions: "मार्ग दाखवा",
    viewDetails: "तपशील पहा",
    freeService: "मोफत सेवा",

    normalRoute: "नेहमीचा मार्ग (थेट)",
    crowdAwareRoute: "एआय गर्दीमुक्त मार्ग (शिफारस केलेला)",
    routeComparison: "थेट मार्ग तुलना",
    avoidCrowdZones: "रामकुंडावरील प्रचंड गर्दी टाळून सुरक्षित प्रवास",
    crowdRiskHigh: "प्रचंड गर्दी",
    crowdRiskLow: "मोकळा व सुरक्षित",
    startNavigation: "प्रवास सुरू करा",

    emergencySosTitle: "एक-स्पर्श आपत्कालीन एसओएस",
    emergencySosSubtitle: "नाशिक कुंभमेळा पोलीस आणि आपत्कालीन प्रतिसाद पथकाला (QRT) तुमचे अचूक लोकेशन पाठवते",
    tapForHelp: "त्वरित मदतीसाठी दाबा",
    sendingAlert: "मध्यवर्ती नियंत्रण कक्षाकडे लोकेशन पाठवले जात आहे...",
    alertSentSuccess: "तातडीचा संदेश यशस्वीरीत्या पाठवला गेला!",
    gpsCoordinates: "तुमचे जीपीएस लोकेशन",
    controlRoomNotified: "मध्यवर्ती नियंत्रण कक्षाला आपला संदेश प्राप्त झाला आहे",
    helpIsOnTheWay: "मदत पथक #१४ तुमच्या दिशेने रवाना झाले आहे (सुमारे ३ मिनिटे)",
    callPolice: "पोलीस संपर्क (112)",
    callAmbulance: "रुग्णवाहिका (108)",

    reportLostPerson: "हरवलेल्या व्यक्तीची नोंद",
    lostPersonName: "व्यक्तीचे पूर्ण नाव",
    lostPersonAge: "अंदाजे वय",
    lostPersonGender: "लिंग",
    lastSeenLocation: "शेवटचे पाहिलेले ठिकाण / घाट",
    clothingDesc: "अंगातील कपडे व ओळख खूण",
    uploadPhoto: "अलीकडील फोटो जोडा",
    submitReport: "तक्रार नोंदवा",
    reportBroadcastSuccess: "सर्व १२ मेळा माहिती केंद्रे आणि पोलीस चौक्यांवर संदेश प्रसारित केला गेला आहे",

    businessName: "दुकानाचे / स्टॉलचे नाव",
    category: "प्रवर्ग",
    licenseNumber: "एफएसएसएआय / पालिका परवाना क्रमांक",
    expiryDate: "मुदत संपण्याची तारीख",
    ocrExtracting: "कागदपत्राचे ओसीआर विश्लेषण सुरू आहे...",
    ocrExtractedSuccess: "कागदपत्र प्रमाणित! तपशील आपोआप भरले गेले",
    uploadGovtCertificate: "परवाना / आरोग्य प्रमाणपत्र अपलोड करा",
    storeStatus: "स्टॉलची सद्यस्थिती",
    open: "भाविकांसाठी सुरू",
    closed: "तात्पुरते बंद",
    stockAvailability: "थेट साठा / जागा उपलब्धता",
    pendingVerification: "पडताळणी सुरू आहे",
    approvedVerified: "प्रमाणित कुंभ २०२६ विक्रेता पास",
    approve: "मंजूर करा",
    reject: "नाकारा",

    totalVendors: "एकूण नोंदणीकृत विक्रेते",
    verifiedVendors: "प्रमाणित विक्रेते",
    activePilgrims: "सध्याचे भाविक संख्या",
    sosAlertsToday: "सक्रिय एसओएस अलर्ट",
    dispatchUnit: "मदत पथक पाठवा",
    markResolved: "निकाली काढा"
  }
};
