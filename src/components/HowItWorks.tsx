import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { num: '01', ...t.howItWorks.step1 },
    { num: '02', ...t.howItWorks.step2 },
    { num: '03', ...t.howItWorks.step3 },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="block w-10 h-[3px] bg-brand-red mx-auto mb-4 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brand-navy">
            {t.howItWorks.title}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              {/* Number */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-brand-navy mb-4">
                <span className="text-sm font-black text-brand-navy">{step.num}</span>
              </div>

              {/* Title */}
              <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-brand-navy mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-brand-gray leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
