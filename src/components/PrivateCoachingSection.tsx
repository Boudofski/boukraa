import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';

interface PrivateCoachingSectionProps {
  onStartRequest: () => void;
}

export const PrivateCoachingSection: React.FC<PrivateCoachingSectionProps> = ({ onStartRequest }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section id="private-coaching" className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-brand-surface/95 border border-white/[0.1] shadow-2xl relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Subtle diagonal accent */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-red/10 transform rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Col: Info & Points */}
            <div className="lg:col-span-7 text-left rtl:text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-navy border border-white/[0.08] rounded-full text-xs font-black tracking-widest text-brand-red uppercase mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-red" />
                <span>{t.privateCoachingSection.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4">
                {t.privateCoachingSection.title}
              </h2>

              <p className="text-base sm:text-lg text-brand-silver/90 font-medium leading-relaxed mb-8">
                {t.privateCoachingSection.subtitle}
              </p>

              {/* Pillars points */}
              <div className="mb-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-gray mb-4 font-mono">
                  {t.privateCoachingSection.pillarsTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {t.privateCoachingSection.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-brand-navy border border-white/[0.08]">
                      <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flexible location notice */}
              <div className="flex items-center gap-3 text-xs text-brand-silver/90 p-4 rounded-xl bg-brand-navy border border-white/[0.08] max-w-xl">
                <Compass className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{t.privateCoachingSection.locationNote}</span>
              </div>

            </div>

            {/* Right Col: Authentic Visual Card & Direct Request Box */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-6 mt-4 lg:mt-0">
              
              {/* Photo preview of on-field instruction */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl aspect-[16/10] bg-brand-navy">
                <img
                  src="/assets/boukraa-tactics-board.jpg"
                  alt="Mohamed Amine Boukraa giving tactical instructions to athletes"
                  className="w-full h-full object-cover object-top filter contrast-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-brand-navy/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/[0.1] text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  Accompagnement 1-on-1 & Terrain
                </div>
              </div>

              {/* CTA Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-brand-navy backdrop-blur-md border border-brand-red/50 text-center w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red" />
                
                <div className="text-[11px] font-black uppercase tracking-widest text-brand-red mb-1.5 font-mono">
                  03 — 1-ON-1 COACHING
                </div>
                <div className="text-base sm:text-lg font-black text-white uppercase tracking-wide mb-2">
                  Prise en charge sur mesure
                </div>
                <p className="text-xs text-brand-gray font-medium mb-6 leading-relaxed">
                  {t.privateCoachingSection.boxDesc}
                </p>

                <button
                  onClick={onStartRequest}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-brand-red hover:bg-brand-redHover text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-xl shadow-brand-red/35 active:scale-[0.99] transition-all"
                >
                  <span>{t.privateCoachingSection.cta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
