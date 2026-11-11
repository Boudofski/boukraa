import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Mail } from 'lucide-react';

// lucide-react v1 no longer ships brand icons
const Instagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-brand-border bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Logo */}
          <button
            onClick={onOpenAdmin}
            className="hover:opacity-70 transition-opacity"
            title="Coach Portal"
          >
            <img
              src="/logo-header.png"
              alt="BOUKRAA"
              className="h-5 w-auto opacity-60"
            />
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@boukraa.com"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-brand-muted font-medium tracking-wide">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
