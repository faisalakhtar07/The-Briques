import { createContext, useContext, useState, useEffect } from "react";

// Small, hand-picked dictionary rather than a full i18n library — covers
// the navigation and the highest-traffic labels first. Add more keys here
// as pages get translated; any key not listed just falls back to the
// English string passed in.
const TRANSLATIONS = {
  hi: {
    Home: "होम",
    Properties: "प्रॉपर्टी",
    About: "हमारे बारे में",
    Contact: "संपर्क करें",
    Login: "लॉगिन",
    "Sign Up": "साइन अप",
    Dashboard: "डैशबोर्ड",
    Logout: "लॉगआउट",
    Saved: "सेव की गई",
    "For Rent": "किराये के लिए",
    "For Sale": "बिक्री के लिए",
    "Request to Book": "बुक करने का अनुरोध करें",
    "Browse Properties": "प्रॉपर्टी देखें",
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
