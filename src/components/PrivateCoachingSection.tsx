import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';

interface PrivateCoachingSectionProps {
  onStartRequest: () => void;
}

export const PrivateCoachingSection: React.FC<PrivateCoachingSectionProps> = ({ onStartRequest }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section id="private-coaching" className="py-20 sm:py-28 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 sm:p-12 lg:p-14 rounded-2xl bg-gradient-to-br from-brand-steel via-brand-steel to-brand-navy border border-brand-silver/20 shadow-2xl relative overflow-hidden">
          
          {/* Subtle diagonal accent */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-brand-red/10 transform rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Col: Info & Points */}
            <div className="lg:col-span-8 text-left rtl:text-right">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy border border-brand-silver/15 rounded-md text-xs font-black tracking-widest text-brand-red uppercase mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span>{t.privateCoachingSection.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-3 sm:mb-4">
                {t.privateCoachingSection.title}
              </h2>

              <p className="text-sm sm:text-base text-brand-silver/90 font-medium leading-relaxed mb-6 sm:mb-8">
                {t.privateCoachingSection.subtitle}
              </p>

              {/* Pillars points */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-gray mb-3.5">
                  {t.privateCoachingSection.pillarsTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.privateCoachingSection.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-brand-navy/60 border border-brand-silver/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-bold text-brand-white">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flexible location notice (Section 28) */}
              <div className="flex items-center gap-2.5 text-xs text-brand-silver/85 p-3 rounded-xl bg-brand-navy/50 border border-brand-silver/10 max-w-xl">
                <Compass className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{t.privateCoachingSection.locationNote}</span>
              </div>

            </div>

            {/* Right Col: CTA Box */}
            <div className="lg:col-span-4 flex flex-col justify-center items-stretch lg:items-end mt-4 lg:mt-0">
              <div className="p-6 rounded-2xl bg-brand-navy border border-brand-red/35 text-center w-full shadow-xl">
                <div className="text-[11px] font-black uppercase tracking-widest text-brand-red mb-2 font-mono">
                  03 — 1-ON-1 COACHING
                </div>
                <div className="text-base sm:text-lg font-black text-brand-white uppercase tracking-wide mb-3">
                  Prise en charge sur mesure
                </div>
                <p className="text-xs text-brand-gray font-medium mb-6 leading-relaxed">
                  Nombre restreint de sportifs par cycle pour garantir une attention chirurgicale et des retours réguliers.
                </p>
                <button
                  onClick={onStartRequest}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-brand-red hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-brand-red/30 transition-all active:scale-[0.99]"
                >
                  <span>{t.privateCoachingSection.cta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
