import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Search, Layers, Zap, SlidersHorizontal } from 'lucide-react';

export const PeriodizationRoadmap: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Search, Layers, Zap, SlidersHorizontal];

  return (
    <section id="methodology" className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Background tech grid */}
      <div className="absolute inset-0 bg-tech-grid mask-radial opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-surface border border-white/[0.08] rounded-full text-xs font-black tracking-widest text-brand-red uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span>{t.periodization.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {t.periodization.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-silver/90 font-medium leading-relaxed max-w-2xl mx-auto">
            {t.periodization.subtitle}
          </p>
        </div>

        {/* 4 Stages Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Subtle horizontal connecting bar for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-brand-red/20 via-brand-red/50 to-brand-red/20 -translate-y-16 z-0 pointer-events-none" />

          {t.periodization.stages.map((stage, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative z-10 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-brand-surface/90 border border-white/[0.08] hover:border-brand-red/50 transition-all duration-300 group shadow-xl hover:-translate-y-1.5"
              >
                {/* Top indicator bar on hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar with Number code and badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-black tracking-wider uppercase rounded bg-brand-navy border border-white/[0.08] text-brand-red">
                      {stage.num}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-gray font-mono">
                      {stage.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-navy border border-white/[0.08] flex items-center justify-center text-brand-silver group-hover:text-brand-red group-hover:border-brand-red/40 transition-colors mb-5 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide mb-3 leading-snug">
                    {stage.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-brand-silver/85 font-medium leading-relaxed mb-6">
                    {stage.desc}
                  </p>
                </div>

                {/* Bottom Diagonal Accent */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                  <span className="w-6 h-1 bg-brand-red skew-x-[-20deg]" />
                  <span className="w-3 h-1 bg-brand-red skew-x-[-20deg]" />
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
