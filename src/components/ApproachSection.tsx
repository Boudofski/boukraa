import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { FileText, UserCheck2, Quote, CheckCircle2, Clock, Check } from 'lucide-react';

export const ApproachSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section id="approach" className="py-20 sm:py-28 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-steel border border-brand-silver/15 rounded-md text-xs font-black tracking-widest text-brand-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>{t.approach.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-4">
            {t.approach.title}
          </h2>

          <p className="text-sm sm:text-base text-brand-silver/90 font-medium leading-relaxed max-w-2xl mx-auto">
            {t.approach.subtitle}
          </p>
        </div>

        {/* Feature Grid: Photo 2 (Authentic Program Building Photo) + 3 Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
          
          {/* Photo 2: Real Computer Monitor Athlete Training Programme Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-brand-silver/20 bg-brand-steel shadow-2xl">
              <img
                src="/assets/boukraa-program-building.jpg"
                alt="Mohamed Amine Boukraa designing athlete training programme on computer screen with sports science books and BOUKRAA notebook"
                className="w-full h-auto object-cover aspect-[16/9] filter contrast-[1.02]"
                loading="lazy"
              />

              {/* Bottom Overlay Label */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-transparent p-5 sm:p-6 pt-14 backdrop-blur-[2px]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-white">
                      Programmation & Analyse Individualisée
                    </div>
                    <div className="text-[11px] text-brand-silver/75 font-mono">
                      Trap Bar · Fentes Bulgares · RPE & Vélocité
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-brand-red bg-brand-steel/90 px-2.5 py-1 rounded border border-brand-red/30">
                    SPORTS SCIENCE
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle diagonal background cut */}
            <div className="absolute -bottom-3 -left-3 rtl:-left-auto rtl:-right-3 w-28 h-2 bg-brand-red skew-x-[-25deg] opacity-80 pointer-events-none" />
          </motion.div>

          {/* Pillars and Coach Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5 text-left rtl:text-right"
          >
            
            {/* The 3 Pillars */}
            <div className="grid grid-cols-1 gap-3.5">
              
              {/* SIMPLE */}
              <div className="p-5 rounded-2xl bg-brand-steel/80 backdrop-blur-md border border-brand-silver/15 hover:border-brand-red/40 transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red flex-shrink-0 font-mono font-black text-sm group-hover:bg-brand-red group-hover:text-white transition-colors">
                  01
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-brand-white uppercase tracking-wider mb-1">
                    {t.approach.pillars.simple.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium">
                    {t.approach.pillars.simple.desc}
                  </p>
                </div>
              </div>

              {/* EFFECTIVE */}
              <div className="p-5 rounded-2xl bg-brand-steel/80 backdrop-blur-md border border-brand-silver/15 hover:border-brand-red/40 transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red flex-shrink-0 font-mono font-black text-sm group-hover:bg-brand-red group-hover:text-white transition-colors">
                  02
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-brand-white uppercase tracking-wider mb-1">
                    {t.approach.pillars.effective.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium">
                    {t.approach.pillars.effective.desc}
                  </p>
                </div>
              </div>

              {/* PURPOSEFUL */}
              <div className="p-5 rounded-2xl bg-brand-steel/80 backdrop-blur-md border border-brand-silver/15 hover:border-brand-red/40 transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red flex-shrink-0 font-mono font-black text-sm group-hover:bg-brand-red group-hover:text-white transition-colors">
                  03
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-brand-white uppercase tracking-wider mb-1">
                    {t.approach.pillars.purposeful.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium">
                    {t.approach.pillars.purposeful.desc}
                  </p>
                </div>
              </div>

            </div>

            {/* Coach Quote Box */}
            <div className="p-6 rounded-2xl bg-brand-navy border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red shadow-xl">
              <blockquote className="text-xs sm:text-sm font-semibold italic text-brand-white leading-relaxed mb-3">
                {t.approach.quote}
              </blockquote>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-gray">
                <span>— {t.approach.quoteAuthor}</span>
                <span className="text-brand-red font-mono font-bold tracking-widest hidden sm:inline">
                  SIMPLE · EFFECTIVE · PURPOSEFUL
                </span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Section 15 & 16: Program Options & Pricing Notice */}
        <div className="pt-14 sm:pt-18 border-t border-brand-silver/10">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h3 className="text-xl sm:text-3xl font-black text-brand-white uppercase tracking-tight mb-2">
              {t.approach.optionsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-brand-silver/80 font-medium">
              {t.approach.optionsNotice}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Option A: PROGRAM ONLY */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-7 sm:p-9 rounded-3xl bg-brand-steel/80 backdrop-blur-xl border border-brand-silver/15 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-navy border border-brand-silver/15 text-[11px] font-mono font-black text-brand-silver uppercase tracking-wider">
                    {t.approach.optionProgram.badge}
                  </span>
                  <FileText className="w-5 h-5 text-brand-red" />
                </div>
                <h4 className="text-lg sm:text-xl font-black text-brand-white uppercase tracking-wide mb-3">
                  {t.approach.optionProgram.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium mb-6">
                  {t.approach.optionProgram.desc}
                </p>
              </div>

              <div className="space-y-3 pt-5 border-t border-brand-silver/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray">Livrable :</span>
                  <span className="font-mono text-brand-white font-bold">{t.approach.optionProgram.deliverable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray">Modalité :</span>
                  <span className="text-brand-silver font-semibold">{t.approach.optionProgram.commitment}</span>
                </div>
              </div>
            </motion.div>

            {/* Option B: PROGRAM + COACHING */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-7 sm:p-9 rounded-3xl bg-brand-steel/80 backdrop-blur-xl border border-brand-red/50 shadow-2xl shadow-brand-red/10 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-navy border border-brand-red/40 text-[11px] font-mono font-black text-brand-red uppercase tracking-wider">
                    {t.approach.optionCoaching.badge}
                  </span>
                  <UserCheck2 className="w-5 h-5 text-brand-red" />
                </div>
                <h4 className="text-lg sm:text-xl font-black text-brand-white uppercase tracking-wide mb-3">
                  {t.approach.optionCoaching.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium mb-6">
                  {t.approach.optionCoaching.desc}
                </p>
              </div>

              <div className="space-y-3 pt-5 border-t border-brand-silver/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray">Livrable & Suivi :</span>
                  <span className="font-mono text-brand-white font-bold">{t.approach.optionCoaching.deliverable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray">Délai de réponse ciblé :</span>
                  <span className="font-mono text-brand-red font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.approach.optionCoaching.commitment}</span>
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Pricing Policy Statement (Section 16: No fixed public pricing) */}
          <div className="mt-8 p-6 rounded-2xl bg-brand-navy border border-brand-silver/15 text-center max-w-2xl mx-auto shadow-lg">
            <h5 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-red mb-2 font-mono">
              {t.approach.pricingNote.title}
            </h5>
            <p className="text-xs sm:text-sm text-brand-silver/90 leading-relaxed font-medium">
              {t.approach.pricingNote.body}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
