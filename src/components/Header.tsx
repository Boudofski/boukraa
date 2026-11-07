import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Locale } from '../types';
import { Menu, X, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

interface HeaderProps {
  onStartAssessment: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartAssessment, onOpenAdmin }) => {
  const { locale, setLocale, t, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const languages: { code: Locale; label: string; full: string }[] = [
    { code: 'fr', label: 'FR', full: 'Français' },
    { code: 'ar', label: 'العربية', full: 'العربية' },
    { code: 'en', label: 'EN', full: 'English' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-md border-b border-brand-silver/10 shadow-xl py-3'
          : 'bg-brand-navy/80 backdrop-blur-sm border-b border-brand-silver/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo on the left (RTL: right) */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="BOUKRAA Homepage"
          >
            <img
              src="/logo-header.png"
              alt="BOUKRAA"
              className="h-7 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('#programs')}
              className="text-xs font-bold tracking-widest text-brand-silver hover:text-white transition-colors uppercase"
            >
              {t.nav.programs}
            </button>
            <button
              onClick={() => handleNavClick('#methodology')}
              className="text-xs font-bold tracking-widest text-brand-silver hover:text-white transition-colors uppercase"
            >
              {t.nav.methodology}
            </button>
            <button
              onClick={() => handleNavClick('#field-action')}
              className="text-xs font-bold tracking-widest text-brand-silver hover:text-white transition-colors uppercase"
            >
              {t.nav.fieldAction}
            </button>
            <button
              onClick={() => handleNavClick('#private-coaching')}
              className="text-xs font-bold tracking-widest text-brand-silver hover:text-white transition-colors uppercase"
            >
              {t.nav.privateCoaching}
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-xs font-bold tracking-widest text-brand-silver hover:text-white transition-colors uppercase"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="text-xs font-bold tracking-widest text-brand-silver hover:text-white transition-colors uppercase"
            >
              {t.nav.about}
            </button>
          </nav>

          {/* Right Header: Language Switcher & Action CTA */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Language Selector */}
            <div className="flex items-center bg-brand-steel p-1 rounded-xl border border-brand-silver/15">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                    locale === l.code
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Admin Discreet Button */}
            <button
              onClick={onOpenAdmin}
              title={t.nav.adminPortal}
              className="p-2 text-brand-gray hover:text-brand-silver rounded-lg hover:bg-brand-steel/60 transition-colors"
              aria-label="Coach Portal"
            >
              <ShieldCheck className="w-5 h-5 text-brand-silver/70 hover:text-brand-red transition-colors" />
            </button>

            {/* Primary START CTA */}
            <button
              onClick={onStartAssessment}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-md shadow-brand-red/25 active:translate-y-0"
            >
              <span>{t.nav.startAssessment}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center bg-brand-steel p-0.5 rounded-lg border border-brand-silver/15">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-md ${
                    locale === l.code ? 'bg-brand-red text-white' : 'text-brand-gray'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-silver hover:text-white rounded-lg bg-brand-steel/80 border border-brand-silver/15 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean Fullscreen Overlay on Mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] bottom-0 z-50 bg-brand-navy/98 backdrop-blur-xl border-t border-brand-silver/15 flex flex-col justify-between p-6 overflow-y-auto sm:hidden">
          <nav className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => handleNavClick('#programs')}
              className="w-full text-left rtl:text-right py-3.5 px-4 text-base font-black tracking-wider text-brand-white uppercase rounded-xl bg-brand-steel/40 hover:bg-brand-steel border border-brand-silver/10 transition-colors"
            >
              {t.nav.programs}
            </button>
            <button
              onClick={() => handleNavClick('#methodology')}
              className="w-full text-left rtl:text-right py-3.5 px-4 text-base font-black tracking-wider text-brand-white uppercase rounded-xl bg-brand-steel/40 hover:bg-brand-steel border border-brand-silver/10 transition-colors"
            >
              {t.nav.methodology}
            </button>
            <button
              onClick={() => handleNavClick('#field-action')}
              className="w-full text-left rtl:text-right py-3.5 px-4 text-base font-black tracking-wider text-brand-white uppercase rounded-xl bg-brand-steel/40 hover:bg-brand-steel border border-brand-silver/10 transition-colors"
            >
              {t.nav.fieldAction}
            </button>
            <button
              onClick={() => handleNavClick('#private-coaching')}
              className="w-full text-left rtl:text-right py-3.5 px-4 text-base font-black tracking-wider text-brand-white uppercase rounded-xl bg-brand-steel/40 hover:bg-brand-steel border border-brand-silver/10 transition-colors"
            >
              {t.nav.privateCoaching}
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="w-full text-left rtl:text-right py-3.5 px-4 text-base font-black tracking-wider text-brand-white uppercase rounded-xl bg-brand-steel/40 hover:bg-brand-steel border border-brand-silver/10 transition-colors"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="w-full text-left rtl:text-right py-3.5 px-4 text-base font-black tracking-wider text-brand-white uppercase rounded-xl bg-brand-steel/40 hover:bg-brand-steel border border-brand-silver/10 transition-colors"
            >
              {t.nav.about}
            </button>
          </nav>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="space-y-4 pt-6 border-t border-brand-steel">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartAssessment();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-red hover:bg-red-600 text-white font-extrabold text-sm tracking-wider uppercase rounded-xl shadow-xl shadow-brand-red/30 active:scale-[0.99] transition-transform"
            >
              <span>{t.nav.startAssessment}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-brand-gray hover:text-white bg-brand-steel/60 rounded-xl border border-brand-silver/10"
            >
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>{t.nav.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
