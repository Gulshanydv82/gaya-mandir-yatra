import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.packages': 'Yatra Packages',
    'nav.temples': 'Temples',
    'nav.pinddaan': 'Pind Daan Rituals',
    'nav.hotels': 'Hotels & Stay',
    'nav.pandits': 'Vedic Pandits',
    'nav.blogs': 'Pilgrimage Guide',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact Us',
    'nav.login': 'Login / Signup',
    'nav.dashboard': 'My Dashboard',
    'nav.admin': 'Admin Panel',
    'hero.badge': 'Certified Gayawal Panda & Temple Yatra Services',
    'hero.title': 'Spiritual Peace & Ancestral Salvation at Gaya Dham',
    'hero.subtitle': 'Book complete Vishnupad Temple Yatra, Bodh Gaya Tour, Certified Pandits, Pind Daan, and Hotels with hassle-free pickup.',
    'search.travelDate': 'Travel Date',
    'search.packageType': 'Package Type',
    'search.travelers': 'Travelers',
    'search.button': 'Search Packages',
    'btn.bookNow': 'Book Now',
    'btn.viewDetails': 'View Details',
    'btn.downloadInvoice': 'Download Invoice',
    'btn.cancelBooking': 'Cancel Booking',
    'btn.applyCoupon': 'Apply Coupon',
    'pinddaan.title': 'Sacred Gaya Pind Daan Rituals',
    'pinddaan.sub': 'The premier center for Shradh Karma, Pitru Dosh Shanti & 45-Vedis ancestral liberation.',
    'admin.dashboard': 'Admin Dashboard',
    'admin.packages': 'Package Management',
    'admin.bookings': 'Booking Management',
    'admin.users': 'User Management',
    'admin.temples': 'Temple Management',
    'admin.hotels': 'Hotel Management',
    'admin.vehicles': 'Vehicle Management',
    'admin.pandits': 'Pandit Management',
    'admin.settings': 'Website Settings',
  },
  hi: {
    'nav.home': 'मुख्य पृष्ठ',
    'nav.packages': 'यात्रा पैकेज',
    'nav.temples': 'गया मंदिर दर्शन',
    'nav.pinddaan': 'पिंडदान अनुष्ठान',
    'nav.hotels': 'होटल एवं आवास',
    'nav.pandits': 'वेदिक गयावाल पंडा',
    'nav.blogs': 'तीर्थ यात्रा मार्गदर्शिका',
    'nav.reviews': 'श्रद्धालु समीक्षाएं',
    'nav.contact': 'संपर्क करें',
    'nav.login': 'लॉगिन / पंजीकरण',
    'nav.dashboard': 'मेरा डैशबोर्ड',
    'nav.admin': 'प्रबंधक (एडमिन)',
    'hero.badge': 'प्रमाणित गयावाल पंडा एवं तीर्थ यात्रा सेवाएं',
    'hero.title': 'गया धाम में दिव्य शांति एवं पितृ मोक्ष',
    'hero.subtitle': 'विष्णुपद मंदिर यात्रा, बोधगया दर्शन, वेदिक पंडा जी, पिंडदान एवं होटल बुकिंग एक ही स्थान पर।',
    'search.travelDate': 'यात्रा तिथि',
    'search.packageType': 'पैकेज का प्रकार',
    'search.travelers': 'यात्रियों की संख्या',
    'search.button': 'पैकेज खोजें',
    'btn.bookNow': 'अभी बुक करें',
    'btn.viewDetails': 'विवरण देखें',
    'btn.downloadInvoice': 'रसीद डाउनलोड करें',
    'btn.cancelBooking': 'रद्द करें',
    'btn.applyCoupon': 'कूपन लागू करें',
    'pinddaan.title': 'पवित्र गया पिंडदान एवं श्राद्ध कर्म',
    'pinddaan.sub': 'पितृ दोष शांति, फल्गु स्नान एवं 45-वेदी श्राद्ध अनुष्ठान के लिए सर्वोच्च तीर्थ।',
    'admin.dashboard': 'एडमिन डैशबोर्ड',
    'admin.packages': 'पैकेज प्रबंधन',
    'admin.bookings': 'बुकिंग प्रबंधन',
    'admin.users': 'उपयोगकर्ता प्रबंधन',
    'admin.temples': 'मंदिर प्रबंधन',
    'admin.hotels': 'होटल प्रबंधन',
    'admin.vehicles': 'वाहन प्रबंधन',
    'admin.pandits': 'पंडा प्रबंधन',
    'admin.settings': 'वेबसाइट सेटिंग्स',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
