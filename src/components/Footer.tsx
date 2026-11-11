import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail } from 'lucide-react';

// Brand SVG icons (lucide-react v1 does not include brand icons)
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.5h2.5l.38-3H13.5V8.6c0-.87.24-1.46 1.49-1.46h1.59V4.45c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.87 1.4-3.87 3.98v2.19H8v3h2.39V21h3.11Z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
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

          {/* Social Links & Email (No public WhatsApp per spec) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/coachboukraa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/p/Coach-Boukraa-61596358826407/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@coach.boukraa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@boukraa.com"
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-brand-border text-xs font-semibold text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors"
              aria-label="Email contact@boukraa.com"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>contact@boukraa.com</span>
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
