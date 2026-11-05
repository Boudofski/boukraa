import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ClipboardList, SearchCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: ClipboardList,
    },
    {
      num: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: SearchCheck,
    },
    {
      num: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-24 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-steel border border-brand-silver/15 rounded text-xs font-black tracking-widest text-brand-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>{t.howItWorks.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-4">
            {t.howItWorks.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-silver/90 font-medium leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-24 right-24 h-0.5 bg-gradient-to-r from-brand-red/30 via-brand-silver/20 to-brand-red/30 -translate-y-12 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 flex flex-col p-8 rounded-xl bg-brand-steel border border-brand-silver/15 hover:border-brand-red/40 transition-all duration-300 group shadow-lg"
              >
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-lg bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-red group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black font-mono text-brand-silver/20 group-hover:text-brand-red/40 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-black text-brand-white uppercase tracking-wide mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-brand-silver/85 font-medium leading-relaxed">
                  {step.desc}
                </p>

                {/* Diagonal accent at bottom */}
                <div className="mt-6 pt-4 border-t border-brand-silver/10 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="w-6 h-1 bg-brand-red skew-x-[-20deg]" />
                  <span className="w-3 h-1 bg-brand-red skew-x-[-20deg]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
