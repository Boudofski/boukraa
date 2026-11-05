import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceId } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Dumbbell, Activity, UserCheck, Flame } from 'lucide-react';

interface HeroProps {
  onStartAssessment: (serviceId?: ServiceId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment }) => {
  const { locale, t, isRtl } = useLanguage();

  return (
    <section className="relative pt-28 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-brand-navy">
      {/* Precision Tech Mesh Grid background with radial mask */}
      <div className="absolute inset-0 bg-tech-grid mask-radial opacity-50 pointer-events-none" />

      {/* Ambient background light sources */}
      <div className="absolute top-10 right-0 -mr-32 w-[500px] h-[500px] bg-brand-steel/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-20 w-[450px] h-[450px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Diagonal red logo slashes background pattern */}
      <div className="absolute top-24 right-10 hidden xl:flex flex-col gap-2 pointer-events-none opacity-25">
        <div className="w-48 h-1.5 bg-brand-red skew-x-[-25deg]" />
        <div className="w-32 h-1.5 bg-brand-red skew-x-[-25deg]" />
        <div className="w-16 h-1.5 bg-brand-red skew-x-[-25deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left rtl:text-right">
            
            {/* Live Cohort Scarcity Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-steel border border-brand-red/30 text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-silver mb-5 w-fit shadow-lg shadow-brand-red/5"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-white font-mono">{t.hero.cohortBadge}</span>
            </motion.div>

            {/* Tagline / Headline */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 mb-3"
            >
              <span className="w-8 sm:w-10 h-[3px] bg-brand-red skew-x-[-20deg]" />
              <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-brand-red uppercase">
                {t.hero.tagline}
              </span>
            </motion.div>

            {/* Main Message */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-white uppercase tracking-tight leading-[1.08] mb-5"
            >
              {t.hero.mainTitle}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-silver via-white to-brand-gray">
                {t.hero.mainTitleSub}
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg font-medium text-brand-silver/90 mb-8 max-w-xl leading-relaxed"
            >
              {t.hero.disciplines}
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8"
            >
              <button
                onClick={() => onStartAssessment('strength_conditioning')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-red hover:bg-red-600 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-brand-red/35 active:translate-y-0 overflow-hidden"
              >
                {/* Shimmer light effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] animate-shimmer pointer-events-none" />
                
                <span className="relative z-10">{t.hero.cta}</span>
                <ArrowRight className={`relative z-10 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>

              <a
                href="#approach"
                className="inline-flex items-center justify-center px-6 py-4 bg-brand-steel hover:bg-brand-steel/80 text-brand-silver hover:text-white font-bold text-sm tracking-wider uppercase rounded-xl border border-brand-silver/15 transition-colors text-center"
              >
                {locale === 'fr' ? 'Découvrir la méthode' : locale === 'ar' ? 'التعرف على المنهجية' : 'Explore the Approach'}
              </a>
            </motion.div>

            {/* Quick Service Direct Access */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-6 border-t border-brand-silver/10"
            >
              <div className="text-[11px] font-mono font-bold text-brand-gray uppercase tracking-wider mb-3">
                {t.hero.quickSelectorTitle}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onStartAssessment('strength_conditioning')}
                  className="px-3 py-1.5 rounded-lg bg-brand-steel/80 hover:bg-brand-steel border border-brand-silver/15 hover:border-brand-red/40 text-[11px] font-bold text-brand-silver hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Dumbbell className="w-3.5 h-3.5 text-brand-red" />
                  <span>01 S&C</span>
                </button>
                <button
                  onClick={() => onStartAssessment('reathletisation')}
                  className="px-3 py-1.5 rounded-lg bg-brand-steel/80 hover:bg-brand-steel border border-brand-silver/15 hover:border-brand-red/40 text-[11px] font-bold text-brand-silver hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-brand-red" />
                  <span>02 Réathlétisation</span>
                </button>
                <button
                  onClick={() => onStartAssessment('private_coaching')}
                  className="px-3 py-1.5 rounded-lg bg-brand-steel/80 hover:bg-brand-steel border border-brand-silver/15 hover:border-brand-red/40 text-[11px] font-bold text-brand-silver hover:text-white transition-all flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-brand-red" />
                  <span>03 Private 1-on-1</span>
                </button>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Photograph of Mohamed Amine Boukraa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Back ambient glowing frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-brand-red/40 via-brand-steel to-transparent rounded-3xl filter blur-xl opacity-70" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-brand-silver/20 bg-brand-steel shadow-2xl">
                <img
                  src="/assets/hero-coach.jpg"
                  alt="Mohamed Amine Boukraa — Strength & Conditioning Coach"
                  className="w-full h-auto object-cover aspect-[4/5] object-top filter contrast-[1.03]"
                  loading="eager"
                />

                {/* Bottom Overlay Label with glassmorphism */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-transparent p-5 sm:p-6 pt-16 backdrop-blur-[2px]">
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
                      className="h-8 sm:h-9 w-auto object-contain opacity-95"
                    />
                  </div>
                </div>

                {/* Top Coach Credential Tag */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-brand-navy/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-brand-silver/20 text-[11px] font-black tracking-wider text-brand-white uppercase flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <span>EPS & S&C EXPERT</span>
                </div>
              </div>

              {/* Athletic diagonal tri-slash on bottom right */}
              <div className="absolute -bottom-3 -right-3 rtl:-right-auto rtl:-left-3 hidden sm:flex flex-col gap-1.5 pointer-events-none">
                <div className="w-12 h-1.5 bg-brand-red skew-x-[-25deg]" />
                <div className="w-8 h-1.5 bg-brand-red skew-x-[-25deg]" />
                <div className="w-4 h-1.5 bg-brand-red skew-x-[-25deg]" />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
