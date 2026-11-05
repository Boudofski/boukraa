import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Locale } from '../types';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { locale, setLocale, t } = useLanguage();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const languages: { code: Locale; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <footer className="bg-brand-navy border-t border-brand-silver/10 pt-16 pb-12 text-brand-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-12 border-b border-brand-steel">
          
          {/* Logo & Core Tagline */}
          <div className="md:col-span-5 text-left rtl:text-right">
            <a href="#" className="inline-block mb-3">
              <img
                src="/logo-header.png"
                alt="BOUKRAA"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </a>
            <p className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-brand-gray mt-2 max-w-sm leading-relaxed">
              {t.footer.privatePolicy}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 flex flex-wrap gap-5 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('#programs')}
              className="text-brand-silver hover:text-white transition-colors"
            >
              {t.nav.programs}
            </button>
            <button
              onClick={() => handleNavClick('#private-coaching')}
              className="text-brand-silver hover:text-white transition-colors"
            >
              {t.nav.privateCoaching}
            </button>
            <button
              onClick={() => handleNavClick('#courses')}
              className="text-brand-silver hover:text-white transition-colors"
            >
              {t.nav.courses}
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="text-brand-silver hover:text-white transition-colors"
            >
              {t.nav.about}
            </button>
          </div>

          {/* Language Switcher & Admin Access */}
          <div className="md:col-span-3 flex items-center md:justify-end gap-3">
            <div className="flex bg-brand-steel p-1 rounded-lg border border-brand-silver/10">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                    locale === l.code ? 'bg-brand-red text-white' : 'text-brand-gray hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-steel text-xs font-bold text-brand-gray hover:text-white transition-colors border border-brand-silver/10"
              title={t.footer.adminLink}
            >
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>{t.footer.adminLink}</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-gray gap-2">
          <div>
            © {new Date().getFullYear()} BOUKRAA — Mohamed Amine Boukraa. {t.footer.rights}
          </div>
          <div className="font-mono text-[11px] text-brand-gray/70">
            SIMPLE. EFFECTIVE. PURPOSEFUL.
          </div>
        </div>

      </div>
    </footer>
  );
};
