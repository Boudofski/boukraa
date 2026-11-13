import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { locale, setLocale, t, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: Array<{ code: 'en' | 'fr' | 'ar'; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
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

        {/* Desktop Navigation Links: Home · Services · About */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red transition-colors"
          >
            {t.nav.home}
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, 'services')}
            className="text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red transition-colors"
          >
            {t.nav.services}
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red transition-colors"
          >
            {t.nav.about}
          </a>
        </nav>

        {/* Right side: Language Switcher & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-white rounded-full p-0.5 border border-brand-border">
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-brand-navy hover:bg-white border border-brand-border transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-5 py-4 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col gap-3.5" aria-label="Mobile Navigation">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="text-sm font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red py-1 border-b border-brand-border/40 transition-colors"
            >
              {t.nav.home}
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className="text-sm font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red py-1 border-b border-brand-border/40 transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="text-sm font-bold uppercase tracking-wider text-brand-navy hover:text-brand-red py-1 transition-colors"
            >
              {t.nav.about}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
