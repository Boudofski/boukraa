import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { locale, setLocale } = useLanguage();

  const languages: Array<{ code: 'en' | 'fr' | 'ar'; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo — back to top */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="BOUKRAA"
        >
          <img
            src="/logo-header.png"
            alt="BOUKRAA"
            className="h-6 sm:h-7 w-auto"
          />
        </a>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-white rounded-full p-0.5 border border-brand-border">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all ${
                locale === code
                  ? 'bg-brand-navy text-white'
                  : 'text-brand-gray hover:text-brand-navy'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
