import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceId } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onSelectService: (serviceId: ServiceId) => void;
}

const HERO_IMG = '/assets/boukraa-hero-portrait.jpg';

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectService }) => {
  const { t, isRtl } = useLanguage();

  const services: Array<{
    num: string;
    serviceId?: ServiceId;
    key: 's1' | 's2' | 's3' | 's4';
  }> = [
    { num: '01', serviceId: 'strength_conditioning', key: 's1' },
    { num: '02', serviceId: 'reathletisation', key: 's2' },
    { num: '03', serviceId: 'private_coaching', key: 's3' },
    { num: '04', key: 's4' },
  ];

  return (
    <section>
      {/* ---------- HERO ---------- */}
      <div className="relative overflow-hidden bg-brand-navy">
        {/* Mobile / tablet: full-bleed photo behind the text */}
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover object-[50%_10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/0" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-72 sm:pt-96 lg:pt-20 pb-20 sm:pb-24 lg:pb-28 grid lg:grid-cols-12 gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-white/80 uppercase">
                BOUKRAA
              </span>
            </div>

            <h1 className="text-[34px] leading-[1.05] sm:text-5xl lg:text-[60px] font-black text-white uppercase tracking-tight">
              {t.hero.headline}
              <br />
              <span className="text-brand-red">{t.hero.headlineSub}</span>
            </h1>

            <p className="mt-5 text-[15px] sm:text-base text-white/75 font-medium max-w-md leading-relaxed">
              {t.hero.description}
            </p>
          </div>

          {/* Desktop: framed photo */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-[420px] ms-auto rounded-3xl overflow-hidden ring-1 ring-white/10">
              <img
                src={HERO_IMG}
                alt="Mohamed Amine Boukraa"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 h-1 bg-brand-red" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SERVICES (overlapping the hero) ---------- */}
      <div id="services" className="max-w-6xl mx-auto px-5 sm:px-8 -mt-10 relative z-10 scroll-mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map(({ num, serviceId, key }) => {
            const s = t.services[key];
            const isComingSoon = !serviceId;

            return (
              <button
                key={key}
                type="button"
                onClick={serviceId ? () => onSelectService(serviceId) : undefined}
                aria-disabled={isComingSoon || undefined}
                className={`group text-start bg-white rounded-2xl p-6 border border-brand-border shadow-card transition-all duration-300 flex flex-col ${
                  isComingSoon
                    ? 'cursor-default'
                    : 'hover:shadow-card-hover hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-[0.18em] text-brand-red uppercase">
                      {num}
                    </span>
                    {'badge' in s && s.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-bg border border-brand-border text-[9.5px] font-bold tracking-[0.14em] text-brand-gray uppercase">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-navy transition-colors flex-shrink-0 ${
                      isComingSoon
                        ? 'opacity-50'
                        : 'group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white'
                    }`}
                  >
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </div>

                <h3 className="mt-4 text-[15px] font-extrabold uppercase tracking-wide text-brand-navy leading-snug">
                  {s.title}
                </h3>

                <p className="mt-2 text-[13.5px] text-brand-gray leading-relaxed flex-1">
                  {s.desc}
                </p>

                {'disclaimer' in s && s.disclaimer && (
                  <p className="mt-3 pt-3 border-t border-brand-border/70 text-[11.5px] text-brand-gray/90 italic leading-snug">
                    {s.disclaimer}
                  </p>
                )}

                <span
                  className={`mt-5 w-full py-3 text-[11px] font-bold tracking-[0.18em] uppercase rounded-xl transition-colors duration-200 text-center ${
                    isComingSoon
                      ? 'bg-brand-bg text-brand-gray border border-brand-border'
                      : 'bg-brand-navy group-hover:bg-brand-red text-white'
                  }`}
                >
                  {s.cta} {isRtl ? '←' : '→'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pricing note (Section 16) */}
        <p className="mt-6 text-center text-[12.5px] text-brand-gray max-w-2xl mx-auto leading-relaxed">
          {t.services.pricing}
        </p>
      </div>
    </section>
  );
};
