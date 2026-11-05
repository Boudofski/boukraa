import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, UserCheck2, Quote } from 'lucide-react';

export const ApproachSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section id="approach" className="py-20 sm:py-28 bg-brand-navy relative border-t border-brand-silver/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-steel border border-brand-silver/15 rounded-md text-xs font-black tracking-widest text-brand-red uppercase mb-3 sm:mb-4">
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

        {/* Feature Grid: Photo 2 + 3 Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-24">
          
          {/* Photo 2: Program Building & Sports Science Analysis */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-brand-silver/20 bg-brand-steel shadow-2xl">
              <img
                src="/assets/coach-program-building.jpg"
                alt="Mohamed Amine Boukraa constructing training program and analyzing athletic metrics"
                className="w-full h-auto object-cover aspect-[16/10]"
                loading="lazy"
              />

              {/* Bottom Overlay Label */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent p-5 sm:p-6 pt-12">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-white">
                    Programmation & Analyse Individualisée
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-brand-red bg-brand-steel/90 px-2 py-0.5 rounded border border-brand-red/30">
                    SPORTS SCIENCE
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle diagonal background cut */}
            <div className="absolute -bottom-3 -left-3 rtl:-left-auto rtl:-right-3 w-24 h-2 bg-brand-red skew-x-[-25deg] opacity-70 pointer-events-none" />
          </div>

          {/* Pillars and Quote */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5 text-left rtl:text-right">
            
            {/* The 3 Pillars */}
            <div className="grid grid-cols-1 gap-3.5">
              
              {/* SIMPLE */}
              <div className="p-4 sm:p-5 rounded-xl bg-brand-steel border border-brand-silver/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red flex-shrink-0 font-mono font-black text-sm">
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
              <div className="p-4 sm:p-5 rounded-xl bg-brand-steel border border-brand-silver/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red flex-shrink-0 font-mono font-black text-sm">
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
              <div className="p-4 sm:p-5 rounded-xl bg-brand-steel border border-brand-silver/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red flex-shrink-0 font-mono font-black text-sm">
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
            <div className="p-5 sm:p-6 rounded-xl bg-brand-navy border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red shadow-lg">
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

          </div>

        </div>

        {/* Section 15 & 16: Program Options & Pricing Notice */}
        <div className="pt-12 sm:pt-16 border-t border-brand-silver/10">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-3xl font-black text-brand-white uppercase tracking-tight mb-2">
              {t.approach.optionsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-brand-silver/80 font-medium">
              {t.approach.optionsNotice}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Option A: PROGRAM ONLY */}
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-steel border border-brand-silver/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-brand-navy border border-brand-silver/15 text-[11px] font-black text-brand-silver uppercase tracking-wider">
                    {t.approach.optionProgram.badge}
                  </span>
                  <FileText className="w-5 h-5 text-brand-red" />
                </div>
                <h4 className="text-lg sm:text-xl font-black text-brand-white uppercase tracking-wide mb-3">
                  {t.approach.optionProgram.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium">
                  {t.approach.optionProgram.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-brand-silver/10 flex items-center justify-between text-xs text-brand-gray">
                <span>Livrable</span>
                <span className="font-mono text-brand-white font-bold">PDF Structuré HD</span>
              </div>
            </div>

            {/* Option B: PROGRAM + COACHING */}
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-steel border border-brand-red/35 shadow-xl shadow-brand-red/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-brand-navy border border-brand-red/40 text-[11px] font-black text-brand-red uppercase tracking-wider">
                    {t.approach.optionCoaching.badge}
                  </span>
                  <UserCheck2 className="w-5 h-5 text-brand-red" />
                </div>
                <h4 className="text-lg sm:text-xl font-black text-brand-white uppercase tracking-wide mb-3">
                  {t.approach.optionCoaching.title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium">
                  {t.approach.optionCoaching.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-brand-silver/10 flex items-center justify-between text-xs text-brand-gray">
                <span>Délai de réponse ciblé</span>
                <span className="font-mono text-brand-red font-bold">Sous 36h max</span>
              </div>
            </div>

          </div>

          {/* Pricing Policy Statement (Section 16: No fixed public pricing) */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-brand-navy border border-brand-silver/15 text-center max-w-2xl mx-auto">
            <h5 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-red mb-2">
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
