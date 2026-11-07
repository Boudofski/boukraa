import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Locale } from '../types';
import { ShieldCheck } from 'lucide-react';

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
    <footer className="bg-brand-navy border-t border-white/[0.08] py-14 sm:py-18 text-brand-silver relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-brand-surface/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
          
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
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-surface border border-white/[0.08]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    locale === l.code ? 'bg-brand-red text-white' : 'text-brand-gray hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-elevated border border-white/[0.08] hover:text-white transition-colors"
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
