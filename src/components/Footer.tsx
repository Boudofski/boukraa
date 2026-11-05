import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Locale } from '../types';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { locale, setLocale, t } = useLanguage();

  const languages: { code: Locale; label: string }[] = [
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];

  return (
    <footer className="bg-brand-navy border-t border-brand-silver/10 py-12 sm:py-16 text-brand-silver relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-brand-steel/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-brand-silver/10">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left rtl:md:text-right">
            <a href="#" className="mb-3 block focus:outline-none">
              <img
                src="/logo-header.png"
                alt="BOUKRAA"
                className="h-8 sm:h-9 w-auto object-contain opacity-95"
              />
            </a>
            <p className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick links & Language Switcher in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-brand-gray">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-brand-steel border border-brand-silver/10">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    locale === l.code ? 'bg-brand-red text-white' : 'hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-steel/60 hover:bg-brand-steel border border-brand-silver/10 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>{t.footer.adminLink}</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright & privacy statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-gray font-medium text-center sm:text-left rtl:sm:text-right">
          <div>
            © {new Date().getFullYear()} BOUKRAA · Mohamed Amine Boukraa. {t.footer.rights}
          </div>
          <div className="text-brand-silver/70">
            {t.footer.privatePolicy}
          </div>
        </div>
      </div>
    </footer>
  );
};
