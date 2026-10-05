import { createContext, useContext, useState, useEffect } from "react";

// Dictionary-based translation — not a full i18n library, but covers every
// static English string across the public-facing site (Nav, Hero, Home,
// Footer, Properties, PropertyDetails, filters, forms). Any key not listed
// here just falls back to the English string passed in, so adding a new
// page never breaks — it just stays English until a line is added below.
//
// NOTE: this only translates the site's OWN wording. Property titles,
// descriptions, and other content sellers type in stays in whatever
// language it was written in — there's no way to auto-translate
// user-submitted database content without a translation API.
const TRANSLATIONS = {
  hi: {
    // Nav
    Home: "होम",
    Properties: "प्रॉपर्टी",
    About: "हमारे बारे में",
    Contact: "संपर्क करें",
    Login: "लॉगिन",
    "Sign Up": "साइन अप",
    Dashboard: "डैशबोर्ड",
    Logout: "लॉगआउट",
    Saved: "सेव की गई",
    Profile: "प्रोफ़ाइल",

    // Common / shared
    "For Rent": "किराये के लिए",
    "For Sale": "बिक्री के लिए",
    "Event Space": "इवेंट स्पेस",
    "Event Space (per day)": "इवेंट स्पेस (प्रति दिन)",
    "Request to Book": "बुक करने का अनुरोध करें",
    "Browse Properties": "प्रॉपर्टी देखें",
    "View All Properties": "सभी प्रॉपर्टी देखें",
    "View Details": "विवरण देखें",
    "Learn More": "और जानें",
    rooms: "कमरे",
    Any: "कोई भी",
    Max: "अधिकतम",
    "Clear filters": "फ़िल्टर हटाएं",

    // Hero
    "Verified Builder Floors": "सत्यापित बिल्डर फ्लोर",
    "Spaces That Fit": "ऐसी जगहें जो फिट बैठें",
    "Your Life": "आपकी ज़िंदगी में",
    "Verified builder floors across Aurangabad & Delhi — reviewed by our Admin team, connected through local pincode Owners you can trust.":
      "औरंगाबाद और दिल्ली में सत्यापित बिल्डर फ्लोर — हमारी एडमिन टीम द्वारा जांचे गए, भरोसेमंद स्थानीय पिनकोड मालिकों के माध्यम से जुड़े हुए।",
    "Explore Properties": "प्रॉपर्टी एक्सप्लोर करें",
    "Verified Properties": "सत्यापित प्रॉपर्टी",
    "See the process": "प्रोसेस देखें",
    "How It Works": "यह कैसे काम करता है",

    // Home — Quick Browse
    "Quick Browse": "तुरंत खोजें",
    "Find Exactly What You're Looking For": "जो आप ढूंढ रहे हैं वो बिल्कुल मिलेगा",
    "By Type": "प्रकार के अनुसार",
    "By Category": "श्रेणी के अनुसार",
    "By City": "शहर के अनुसार",

    // Home — Discover
    "Live Inventory": "लाइव लिस्टिंग",
    "Discover Real Builder Floors": "असली बिल्डर फ्लोर खोजें",

    // Home — What is The Briques
    "Who We Serve": "हम किसकी सेवा करते हैं",
    "What is The Briques?": "The Briques क्या है?",
    "A dedicated platform connecting Sellers, Owners, and Buyers for builder floors in Delhi & NCR. Simple, transparent, and trustworthy.":
      "दिल्ली और NCR में बिल्डर फ्लोर के लिए विक्रेताओं, मालिकों और खरीदारों को जोड़ने वाला एक समर्पित प्लेटफ़ॉर्म। सरल, पारदर्शी और भरोसेमंद।",

    // Roles
    "For Sellers": "विक्रेताओं के लिए",
    "List your property and reach genuine, verified buyers faster.":
      "अपनी प्रॉपर्टी लिस्ट करें और असली, सत्यापित खरीदारों तक तेज़ी से पहुंचें।",
    "Post your property directly": "अपनी प्रॉपर्टी सीधे पोस्ट करें",
    "Admin-reviewed for trust": "भरोसे के लिए एडमिन-समीक्षित",
    "No broker spam": "कोई ब्रोकर स्पैम नहीं",
    "Your phone stays private": "आपका फोन नंबर निजी रहता है",

    "For Owners": "मालिकों के लिए",
    "Manage your assigned pincode's listings and transactions with full visibility.":
      "अपने असाइन किए गए पिनकोड की लिस्टिंग और लेनदेन को पूरी पारदर्शिता के साथ प्रबंधित करें।",
    "Dedicated pincode dashboard": "समर्पित पिनकोड डैशबोर्ड",
    "Track local transactions": "स्थानीय लेनदेन ट्रैक करें",
    "Transparent commission": "पारदर्शी कमीशन",
    "Local-first support": "स्थानीय-प्राथमिकता सहायता",

    "For Buyers": "खरीदारों के लिए",
    "Find genuine listings only — no fake prices or misleading info.":
      "केवल असली लिस्टिंग खोजें — कोई नकली कीमत या भ्रामक जानकारी नहीं।",
    "100% verified listings": "100% सत्यापित लिस्टिंग",
    "No fake prices": "कोई नकली कीमत नहीं",
    "Transparent pricing": "पारदर्शी मूल्य निर्धारण",
    "Direct seller connection": "सीधा विक्रेता संपर्क",

    // Why Choose
    "Our Edge": "हमारी खासियत",
    "Why Choose The Briques?": "The Briques क्यों चुनें?",
    "We understand the builder floor market inside out.":
      "हम बिल्डर फ्लोर बाज़ार को अच्छी तरह समझते हैं।",
    "Only Builder Floors": "सिर्फ बिल्डर फ्लोर",
    "We focus exclusively on builder floors, not apartments or villas.":
      "हम केवल बिल्डर फ्लोर पर ध्यान केंद्रित करते हैं, अपार्टमेंट या विला पर नहीं।",
    "Admin-Reviewed Listings": "एडमिन-समीक्षित लिस्टिंग",
    "Every listing is verified by our Admin team before going live.":
      "लाइव होने से पहले हर लिस्टिंग हमारी एडमिन टीम द्वारा सत्यापित की जाती है।",
    "Seller Privacy Protected": "विक्रेता की गोपनीयता सुरक्षित",
    "Seller phone numbers are never shown to buyers — ever.":
      "विक्रेता के फोन नंबर खरीदारों को कभी नहीं दिखाए जाते।",
    "Transparent Pricing": "पारदर्शी मूल्य निर्धारण",
    "See exactly what you pay, with full price history on record.":
      "आप वास्तव में क्या भुगतान करते हैं देखें, पूरे मूल्य इतिहास के साथ।",
    "Fair, Configurable Commission": "उचित, समायोज्य कमीशन",
    "Commission is set transparently and can never surprise you.":
      "कमीशन पारदर्शी तरीके से तय किया जाता है और यह आपको कभी हैरान नहीं करेगा।",
    "Local-First": "स्थानीय-प्राथमिकता",
    "Deep expertise in Delhi and surrounding NCR areas, via local Owners.":
      "स्थानीय मालिकों के माध्यम से दिल्ली और आसपास के NCR क्षेत्रों में गहरी विशेषज्ञता।",

    // How It Works
    Process: "प्रक्रिया",
    "A simple, transparent process that benefits everyone in the ecosystem.":
      "एक सरल, पारदर्शी प्रक्रिया जिससे हर कोई लाभान्वित होता है।",
    Step: "चरण",
    "Seller Posts Property": "विक्रेता प्रॉपर्टी पोस्ट करता है",
    "Sellers list their property with photos, price and pincode — reviewed before going live.":
      "विक्रेता फोटो, कीमत और पिनकोड के साथ अपनी प्रॉपर्टी लिस्ट करते हैं — लाइव होने से पहले समीक्षा की जाती है।",
    "Owner & Admin Review": "मालिक और एडमिन समीक्षा",
    "The pincode's assigned Owner and our Admin team verify every listing for accuracy.":
      "पिनकोड के असाइन किए गए मालिक और हमारी एडमिन टीम हर लिस्टिंग की सटीकता जांचते हैं।",
    "Buyer Explores": "खरीदार खोजता है",
    "Buyers browse verified listings, filter by price/area/rooms, and connect through the platform.":
      "खरीदार सत्यापित लिस्टिंग ब्राउज़ करते हैं, कीमत/क्षेत्र/कमरों के हिसाब से फ़िल्टर करते हैं, और प्लेटफ़ॉर्म के ज़रिए संपर्क करते हैं।",
    "Secure Transaction": "सुरक्षित लेनदेन",
    "Payments and commissions are handled transparently, with a full record for everyone involved.":
      "भुगतान और कमीशन पारदर्शी तरीके से संभाले जाते हैं, सभी के लिए पूरा रिकॉर्ड रखा जाता है।",

    // Testimonials / CTA
    Community: "समुदाय",
    "What People Say": "लोग क्या कहते हैं",
    "From search to keys in hand — real stories from our community.":
      "खोज से लेकर चाबी हाथ में आने तक — हमारे समुदाय की असली कहानियां।",
    "Ready to find or list a builder floor with confidence?":
      "भरोसे के साथ बिल्डर फ्लोर ढूंढने या लिस्ट करने के लिए तैयार हैं?",

    // SearchBar
    "Search by title, area...": "टाइटल, इलाके से खोजें...",
    Search: "खोजें",

    // FilterSidebar
    City: "शहर",
    Pincode: "पिनकोड",
    Type: "प्रकार",
    Category: "श्रेणी",
    Rooms: "कमरे",
    "Price range (₹)": "मूल्य सीमा (₹)",
    "e.g. Aurangabad": "जैसे औरंगाबाद",
    "e.g. 824101": "जैसे 824101",
    "Min 8,000": "न्यूनतम 8,000",

    // PropertyDetails
    "View on Google Maps": "Google Maps पर देखें",
    "Admin verified": "एडमिन सत्यापित",
    "Share on WhatsApp": "WhatsApp पर शेयर करें",
    "This property has already been booked.": "यह प्रॉपर्टी पहले ही बुक हो चुकी है।",
    "Request sent!": "अनुरोध भेज दिया गया!",
    "Choose your date": "अपनी तारीख चुनें",
    "Processing payment...": "भुगतान प्रोसेस हो रहा है...",
    "Sending request...": "अनुरोध भेजा जा रहा है...",
    "Login as Buyer to Request": "अनुरोध के लिए खरीदार के रूप में लॉगिन करें",
    "For your privacy and safety, seller contact details are managed by our platform.":
      "आपकी गोपनीयता और सुरक्षा के लिए, विक्रेता का संपर्क विवरण हमारे प्लेटफ़ॉर्म द्वारा प्रबंधित किया जाता है।",
    "We'll share your registered phone number with our team only — never with the Seller directly.":
      "हम आपका रजिस्टर्ड फोन नंबर केवल अपनी टीम के साथ शेयर करेंगे — कभी भी सीधे विक्रेता के साथ नहीं।",
    "off original price": "मूल कीमत पर छूट",
    dashboard: "डैशबोर्ड",
    Pay: "भुगतान करें",
    "& Request to Book": "और बुक करने का अनुरोध करें",
    "A small": "एक छोटा",
    "connect fee applies (non-refundable).": "कनेक्ट फीस लागू होती है (गैर-वापसी योग्य)।",

    // Footer
    "Verified property platform": "सत्यापित प्रॉपर्टी प्लेटफ़ॉर्म",
    "Find a space that": "ऐसी जगह ढूंढें जो",
    "feels like yours.": "आपकी अपनी लगे।",
    "Explore verified builder-floor properties and discover a place that fits your life.":
      "सत्यापित बिल्डर-फ्लोर प्रॉपर्टी देखें और अपनी ज़िंदगी के लिए सही जगह खोजें।",
    "India's trusted platform to buy, sell and rent builder-floor properties, area by area.":
      "बिल्डर-फ्लोर प्रॉपर्टी खरीदने, बेचने और किराए पर लेने के लिए भारत का भरोसेमंद प्लेटफ़ॉर्म, इलाके दर इलाके।",
    India: "भारत",
    Explore: "एक्सप्लोर करें",
    "All Properties": "सभी प्रॉपर्टी",
    "About The Briques": "The Briques के बारे में",
    "For Users": "उपयोगकर्ताओं के लिए",
    Buyer: "खरीदार",
    Seller: "विक्रेता",
    "Owner Login": "मालिक लॉगिन",
    "List Your Property": "अपनी प्रॉपर्टी लिस्ट करें",
    Support: "सहायता",
    "Contact Us": "हमसे संपर्क करें",
    "Help & Support": "मदद और सहायता",
    "Email Us": "हमें ईमेल करें",
    "Popular Searches": "लोकप्रिय खोजें",
    "Builder Floors": "बिल्डर फ्लोर",
    "Properties for Sale": "बिक्री के लिए प्रॉपर्टी",
    "Properties for Rent": "किराये के लिए प्रॉपर्टी",
    More: "और",
    "All rights reserved.": "सर्वाधिकार सुरक्षित।",
    "Verified Property Platform": "सत्यापित प्रॉपर्टी प्लेटफ़ॉर्म",
    "Built for better spaces": "बेहतर जगहों के लिए बनाया गया",

    // Profile / Settings
    Appearance: "दिखावट",
    Light: "लाइट",
    Dark: "डार्क",
    System: "सिस्टम",
    Sharing: "शेयरिंग",
    "Payment History": "भुगतान इतिहास",

    // ChooseRole
    "Choose Account Type": "अकाउंट टाइप चुनें",
    "Select how you'd like to use The Briques.": "चुनें कि आप The Briques का उपयोग कैसे करना चाहते हैं।",
    "I'm looking to buy or rent a property.": "मैं प्रॉपर्टी खरीदना या किराए पर लेना चाहता हूं।",
    "I want to list/sell/rent out my property.": "मैं अपनी प्रॉपर्टी लिस्ट/बेचना/किराए पर देना चाहता हूं।",

    // Profile page
    Appearance: "दिखावट",
    Light: "लाइट",
    Dark: "डार्क",
    System: "सिस्टम",
    "App Language": "ऐप की भाषा",
    "View your saved properties": "अपनी सेव की गई प्रॉपर्टी देखें",
    "No notifications yet.": "अभी तक कोई सूचना नहीं।",
    "Mark all as read": "सबको पढ़ा हुआ चिह्नित करें",
    "WhatsApp doesn't tell us which contact you picked — we can only show what you shared, not who you sent it to.":
      "WhatsApp हमें यह नहीं बताता कि आपने कौन सा संपर्क चुना — हम केवल यह दिखा सकते हैं कि आपने क्या शेयर किया, किसे भेजा यह नहीं।",
    "You haven't shared any properties yet.": "आपने अभी तक कोई प्रॉपर्टी शेयर नहीं की है।",
    "Clear history": "इतिहास हटाएं",
    "Connect Fees": "कनेक्ट फीस",
    Transactions: "लेनदेन",
    "No payment history yet.": "अभी तक कोई भुगतान इतिहास नहीं।",
    "Loading...": "लोड हो रहा है...",
    "App Update": "ऐप अपडेट",
    "You're on the latest version.": "आप नवीनतम संस्करण पर हैं।",
    "Check for Updates": "अपडेट जांचें",
    "Account Privacy": "अकाउंट प्राइवेसी",
    "Change Password": "पासवर्ड बदलें",
    "Password changed successfully.": "पासवर्ड सफलतापूर्वक बदल दिया गया।",
    "Verification Code": "सत्यापन कोड",
    "New Password": "नया पासवर्ड",
    "Confirm New Password": "नए पासवर्ड की पुष्टि करें",
    "We'll email a 6-digit code to": "हम एक 6-अंकों का कोड ईमेल करेंगे",
    "Send Verification Code": "सत्यापन कोड भेजें",
    "Sending...": "भेजा जा रहा है...",
    "Checking...": "जांच की जा रही है...",

    // Properties page
    "Newest first": "सबसे नया पहले",
    "Price: Low to High": "कीमत: कम से ज़्यादा",
    "Price: High to Low": "कीमत: ज़्यादा से कम",
    in: "में",
    "Filtered by": "फ़िल्टर किया गया",
    "Sorted by best match for": "इसके लिए सबसे अच्छे मेल के अनुसार क्रमबद्ध",
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("briques_lang") || "en");

  useEffect(() => {
    localStorage.setItem("briques_lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "hi" : "en"));
  const t = (english) => (lang === "hi" && TRANSLATIONS.hi[english]) || english;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
