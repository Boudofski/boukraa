import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Dumbbell, Activity, UserCheck } from 'lucide-react';
import { ServiceId } from '../types';

interface FinalCTAProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onSelectService }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-steel/40 to-brand-navy pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Logo mark icon */}
        <div className="mb-6 flex justify-center">
          <img
            src="/logo-mark.png"
            alt="BOUKRAA"
            className="h-10 sm:h-12 w-auto object-contain opacity-90"
          />
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-4">
          {t.finalCta.title}
        </h2>

        <p className="text-sm sm:text-base text-brand-silver/90 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
          {t.finalCta.subtitle}
        </p>

        {/* 3 Conversion Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          
          {/* Option 1: Strength & Conditioning */}
          <button
            onClick={() => onSelectService('strength_conditioning')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-brand-steel border border-brand-red/40 hover:bg-brand-red text-white transition-all duration-200 group shadow-lg active:scale-[0.99]"
          >
            <Dumbbell className="w-5 h-5 mb-2 text-brand-red group-hover:text-white transition-colors" />
            <span className="text-xs font-black uppercase tracking-wider mb-1 text-white">
              Strength & Conditioning
            </span>
            <span className="text-[11px] text-brand-silver/80 group-hover:text-white flex items-center gap-1 font-semibold">
              {t.services.sAndC.cta}
              <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Option 2: Réathlétisation */}
          <button
            onClick={() => onSelectService('reathletisation')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-brand-steel border border-brand-silver/20 hover:bg-brand-red text-white transition-all duration-200 group shadow-lg active:scale-[0.99]"
          >
            <Activity className="w-5 h-5 mb-2 text-brand-red group-hover:text-white transition-colors" />
            <span className="text-xs font-black uppercase tracking-wider mb-1 text-white">
              Réathlétisation
            </span>
            <span className="text-[11px] text-brand-silver/80 group-hover:text-white flex items-center gap-1 font-semibold">
              {t.services.reathle.cta}
              <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Option 3: Private Coaching */}
          <button
            onClick={() => onSelectService('private_coaching')}
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-brand-steel border border-brand-silver/20 hover:bg-brand-red text-white transition-all duration-200 group shadow-lg active:scale-[0.99]"
          >
            <UserCheck className="w-5 h-5 mb-2 text-brand-red group-hover:text-white transition-colors" />
            <span className="text-xs font-black uppercase tracking-wider mb-1 text-white">
              Private Coaching
            </span>
            <span className="text-[11px] text-brand-silver/80 group-hover:text-white flex items-center gap-1 font-semibold">
              {t.services.privateCoach.cta}
              <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
