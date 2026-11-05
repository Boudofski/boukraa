import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '../types';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations.fr;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('boukraa_lang');
    if (saved === 'fr' || saved === 'ar' || saved === 'en') {
      return saved;
    }
    // Check browser language
    const navLang = navigator.language.slice(0, 2);
    if (navLang === 'ar') return 'ar';
    if (navLang === 'en') return 'en';
    return 'fr';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('boukraa_lang', newLocale);
  };

  const isRtl = locale === 'ar';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    if (isRtl) {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [locale, isRtl]);

  const t = (translations[locale] || translations.fr) as typeof translations.fr;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
