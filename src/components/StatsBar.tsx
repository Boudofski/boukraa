import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, Award } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      num: t.stats.stat1Number,
      label: t.stats.stat1Label,
      sub: t.stats.stat1Sub,
      icon: Target,
    },
    {
      num: t.stats.stat2Number,
      label: t.stats.stat2Label,
      sub: t.stats.stat2Sub,
      icon: Zap,
    },
    {
      num: t.stats.stat3Number,
      label: t.stats.stat3Label,
      sub: t.stats.stat3Sub,
      icon: Shield,
    },
    {
      num: t.stats.stat4Number,
      label: t.stats.stat4Label,
      sub: t.stats.stat4Sub,
      icon: Award,
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl bg-brand-surface/90 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-white/[0.08]"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`flex flex-col items-start ${
                i > 0 ? 'pt-4 sm:pt-0 lg:px-6' : 'lg:pr-6 rtl:lg:pl-6'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-navy border border-white/[0.08] flex items-center justify-center text-brand-red shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono tracking-tight text-white">
                  {stat.num}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-brand-silver uppercase tracking-wider mb-0.5">
                {stat.label}
              </h4>
              <p className="text-[11px] text-brand-gray font-medium">
                {stat.sub}
              </p>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};
