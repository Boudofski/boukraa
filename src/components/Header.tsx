import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { locale, setLocale, t } = useLanguage();

  const languages: Array<{ code: 'en' | 'fr' | 'ar'; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Logo — back to top */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          aria-label="BOUKRAA"
        >
          <img
            src="/logo-header.png"
            alt="BOUKRAA"
            className="h-5 sm:h-7 w-auto"
          />
        </a>

        {/* Navigation Links: Home · Services · About */}
        <nav className="flex items-center gap-4 sm:gap-8" aria-label="Main Navigation">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red transition-colors"
          >
            {t.nav.home}
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, 'services')}
            className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red transition-colors"
          >
            {t.nav.services}
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red transition-colors"
          >
            {t.nav.about}
          </a>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white rounded-full p-0.5 border border-brand-border flex-shrink-0">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider transition-all ${
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
