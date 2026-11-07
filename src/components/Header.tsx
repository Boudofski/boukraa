import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Locale } from '../types';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

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
      const offset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { label: t.nav.programs, href: '#programs' },
    { label: t.nav.privateCoaching, href: '#private-coaching' },
    { label: t.nav.methodology, href: '#methodology' },
    { label: t.nav.courses, href: '#courses' },
    { label: t.nav.about, href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-2.5 sm:py-3'
          : 'bg-brand-navy/80 backdrop-blur-md border-b border-white/[0.05] py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo on the left (RTL: right) */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="BOUKRAA Homepage"
          >
            <img
              src="/logo-header.png"
              alt="BOUKRAA"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links — Refined, Elegant, Proportionate */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-[13px] font-medium tracking-normal text-brand-silver/85 hover:text-white transition-colors hover:underline underline-offset-8 decoration-brand-red decoration-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Header: Language Switcher, Admin & Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-brand-surface p-0.5 rounded-lg border border-white/[0.08]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
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
              className="p-2 text-brand-gray hover:text-brand-silver rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              aria-label="Coach Portal"
            >
              <ShieldCheck className="w-4 h-4 text-brand-silver/70 hover:text-brand-red transition-colors" />
            </button>

            {/* Primary START CTA — Proportional, Compact & High-Impact */}
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 bg-brand-red hover:bg-brand-redHover text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-md shadow-brand-red/25 active:translate-y-0"
            >
              <span>{(t.nav as any).startCta || t.nav.startAssessment}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center bg-brand-surface p-0.5 rounded-lg border border-white/[0.08]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                    locale === l.code ? 'bg-brand-red text-white' : 'text-brand-gray'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-silver hover:text-white rounded-lg bg-brand-surface border border-white/[0.08] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Refined, Clean Overlay on Mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[57px] bottom-0 z-50 bg-brand-navy/98 backdrop-blur-2xl border-t border-white/[0.08] flex flex-col justify-between p-5 overflow-y-auto sm:hidden">
          <nav className="flex flex-col space-y-1.5 pt-2">
            {navLinks.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left rtl:text-right py-3 px-4 text-sm font-semibold tracking-normal text-white/90 hover:text-white rounded-xl bg-brand-surface/50 hover:bg-brand-surface border border-white/[0.06] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#faq')}
              className="w-full text-left rtl:text-right py-3 px-4 text-sm font-semibold tracking-normal text-white/90 hover:text-white rounded-xl bg-brand-surface/50 hover:bg-brand-surface border border-white/[0.06] transition-colors"
            >
              {t.nav.faq}
            </button>
          </nav>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="space-y-2.5 pt-5 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartAssessment();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-red hover:bg-brand-redHover text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-brand-red/30 active:scale-[0.99] transition-transform"
            >
              <span>{t.nav.startAssessment}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-medium text-brand-gray hover:text-white bg-brand-surface/80 rounded-xl border border-white/[0.06]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
              <span>{t.nav.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
