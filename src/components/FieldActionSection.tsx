import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Target, Compass } from 'lucide-react';

export const FieldActionSection: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      image: '/assets/boukraa-tactics-board.jpg',
      tag: t.fieldAction.card1Tag,
      title: t.fieldAction.card1Title,
      desc: t.fieldAction.card1Desc,
      icon: Target,
      aspect: 'aspect-[4/5]',
    },
    {
      image: '/assets/boukraa-pitch-action.jpg',
      tag: t.fieldAction.card3Tag,
      title: t.fieldAction.card3Title,
      desc: t.fieldAction.card3Desc,
      icon: Compass,
      aspect: 'aspect-[4/5]',
    },
    {
      image: '/assets/boukraa-coach-pitch.jpg',
      tag: t.fieldAction.card2Tag,
      title: t.fieldAction.card2Title,
      desc: t.fieldAction.card2Desc,
      icon: Shield,
      aspect: 'aspect-[4/5]',
    },
  ];

  return (
    <section id="field-action" className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-surface rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-surface border border-white/[0.08] rounded-full text-xs font-black tracking-widest text-brand-red uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span>{t.fieldAction.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {t.fieldAction.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-silver/90 font-medium leading-relaxed max-w-2xl mx-auto">
            {t.fieldAction.subtitle}
          </p>
        </div>

        {/* 3 Authentic Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-brand-surface/90 backdrop-blur-xl border border-white/[0.08] hover:border-brand-red/50 transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                {/* Photo with Overlay */}
                <div className={`relative ${card.aspect} w-full overflow-hidden bg-brand-navy`}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter contrast-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-95" />
                  
                  {/* Floating tag on top */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-brand-navy/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/[0.1] text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest shadow-lg">
                    {card.tag}
                  </div>
                </div>

                {/* Content underneath */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-brand-navy border border-white/[0.08] flex items-center justify-center text-brand-red mb-4 group-hover:scale-110 transition-transform shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide mb-2.5 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-silver/85 font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Red bottom accent */}
                  <div className="pt-5 mt-6 border-t border-white/[0.08] flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-1 bg-brand-red skew-x-[-20deg]" />
                    <span className="w-3 h-1 bg-brand-red skew-x-[-20deg]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
