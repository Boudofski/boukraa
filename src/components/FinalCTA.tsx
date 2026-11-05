import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Activity, UserCheck } from 'lucide-react';
import { ServiceId } from '../types';

interface FinalCTAProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onSelectService }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 sm:py-32 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-steel/40 to-brand-navy pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Logo mark icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/logo-mark.png"
            alt="BOUKRAA"
            className="h-12 sm:h-14 w-auto object-contain opacity-95"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-4"
        >
          {t.finalCta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm sm:text-base text-brand-silver/90 font-medium max-w-xl mx-auto mb-12 leading-relaxed"
        >
          {t.finalCta.subtitle}
        </motion.p>

        {/* 3 Conversion Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          
          {/* Option 1: Strength & Conditioning */}
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectService('strength_conditioning')}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-steel/90 backdrop-blur-md border border-brand-red/50 hover:bg-brand-red text-white transition-all duration-200 group shadow-xl"
          >
            <Dumbbell className="w-6 h-6 mb-3 text-brand-red group-hover:text-white transition-colors" />
            <span className="text-xs font-black uppercase tracking-wider mb-1 text-white">
              Strength & Conditioning
            </span>
            <span className="text-[11px] text-brand-silver/80 group-hover:text-white flex items-center gap-1 font-semibold">
              {t.services.sAndC.cta}
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </motion.button>

          {/* Option 2: Réathlétisation */}
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectService('reathletisation')}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-steel/90 backdrop-blur-md border border-brand-silver/20 hover:bg-brand-red text-white transition-all duration-200 group shadow-xl"
          >
            <Activity className="w-6 h-6 mb-3 text-brand-red group-hover:text-white transition-colors" />
            <span className="text-xs font-black uppercase tracking-wider mb-1 text-white">
              Réathlétisation
            </span>
            <span className="text-[11px] text-brand-silver/80 group-hover:text-white flex items-center gap-1 font-semibold">
              {t.services.reathle.cta}
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </motion.button>

          {/* Option 3: Private Coaching */}
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectService('private_coaching')}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-steel/90 backdrop-blur-md border border-brand-silver/20 hover:bg-brand-red text-white transition-all duration-200 group shadow-xl"
          >
            <UserCheck className="w-6 h-6 mb-3 text-brand-red group-hover:text-white transition-colors" />
            <span className="text-xs font-black uppercase tracking-wider mb-1 text-white">
              Private Coaching
            </span>
            <span className="text-[11px] text-brand-silver/80 group-hover:text-white flex items-center gap-1 font-semibold">
              {t.services.privateCoach.cta}
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </span>
          </motion.button>

        </div>

      </div>
    </section>
  );
};
