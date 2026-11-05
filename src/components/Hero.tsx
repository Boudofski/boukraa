import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment }) => {
  const { locale, t, isRtl } = useLanguage();

  return (
    <section className="relative pt-24 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-brand-navy">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-brand-steel/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Diagonal red logo slashes background pattern */}
      <div className="absolute top-20 right-10 hidden lg:flex flex-col gap-2 pointer-events-none opacity-20">
        <div className="w-40 h-1 bg-brand-red skew-x-[-25deg]" />
        <div className="w-28 h-1 bg-brand-red skew-x-[-25deg]" />
        <div className="w-16 h-1 bg-brand-red skew-x-[-25deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left rtl:text-right">
            
            {/* Tagline / Headline */}
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 sm:w-8 h-[3px] bg-brand-red skew-x-[-20deg]" />
              <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-brand-red uppercase">
                {t.hero.tagline}
              </span>
            </div>

            {/* Main Message */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-white uppercase tracking-tight leading-[1.08] mb-5">
              {t.hero.mainTitle}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-silver via-white to-brand-gray">
                {t.hero.mainTitleSub}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-lg font-medium text-brand-silver/90 mb-8 max-w-xl leading-relaxed">
              {t.hero.disciplines}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onStartAssessment}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red hover:bg-red-600 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-brand-red/30 active:translate-y-0"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>

              <a
                href="#approach"
                className="inline-flex items-center justify-center px-6 py-4 bg-brand-steel hover:bg-brand-steel/80 text-brand-silver hover:text-white font-bold text-sm tracking-wider uppercase rounded-xl border border-brand-silver/15 transition-colors text-center"
              >
                {locale === 'fr' ? 'Découvrir la méthode' : locale === 'ar' ? 'التعرف على المنهجية' : 'Explore the Approach'}
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-brand-silver/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-brand-gray font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{t.hero.coachTrust.split('·')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{t.hero.coachTrust.split('·')[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{t.hero.coachTrust.split('·')[2]}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photograph of Mohamed Amine Boukraa */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Subtle back decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-brand-steel rounded-2xl transform rotate-1 scale-98 filter blur-sm" />

              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-brand-silver/20 bg-brand-steel shadow-2xl">
                <img
                  src="/assets/hero-coach.jpg"
                  alt="Mohamed Amine Boukraa — Strength & Conditioning Coach"
                  className="w-full h-auto object-cover aspect-[4/5] object-top filter contrast-[1.03]"
                  loading="eager"
                />

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent p-5 sm:p-6 pt-16">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase">
                        Mohamed Amine Boukraa
                      </h3>
                      <p className="text-xs text-brand-silver/80 font-medium">
                        {t.hero.coachRole}
                      </p>
                    </div>
                    {/* Official mini logo mark */}
                    <img
                      src="/logo-mark.png"
                      alt="BOUKRAA"
                      className="h-7 sm:h-8 w-auto object-contain opacity-95"
                    />
                  </div>
                </div>

                {/* Subtle top badge */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-brand-navy/90 backdrop-blur-md px-3 py-1 rounded-md border border-brand-silver/15 text-[10px] sm:text-xs font-bold tracking-wider text-brand-white uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <span>Coach Mohamed Amine Boukraa</span>
                </div>
              </div>

              {/* Graphic diagonal tri-slash on bottom right */}
              <div className="absolute -bottom-3 -right-3 rtl:-right-auto rtl:-left-3 hidden sm:flex flex-col gap-1.5 pointer-events-none">
                <div className="w-10 h-1.5 bg-brand-red skew-x-[-25deg]" />
                <div className="w-7 h-1.5 bg-brand-red skew-x-[-25deg]" />
                <div className="w-4 h-1.5 bg-brand-red skew-x-[-25deg]" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
