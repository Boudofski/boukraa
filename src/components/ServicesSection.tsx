import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceId } from '../types';
import { Dumbbell, Activity, UserCheck, ArrowRight, AlertCircle, ShieldAlert } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { t, isRtl } = useLanguage();

  const services = [
    {
      id: 'strength_conditioning' as ServiceId,
      code: t.services.sAndC.code,
      badge: t.services.sAndC.badge,
      title: t.services.sAndC.title,
      description: t.services.sAndC.desc,
      cta: t.services.sAndC.cta,
      icon: Dumbbell,
      hasDisclaimer: false,
      popular: true,
    },
    {
      id: 'reathletisation' as ServiceId,
      code: t.services.reathle.code,
      badge: t.services.reathle.badge,
      title: t.services.reathle.title,
      description: t.services.reathle.desc,
      disclaimer: t.services.reathle.disclaimer,
      cta: t.services.reathle.cta,
      icon: Activity,
      hasDisclaimer: true,
      popular: false,
    },
    {
      id: 'private_coaching' as ServiceId,
      code: t.services.privateCoach.code,
      badge: t.services.privateCoach.badge,
      title: t.services.privateCoach.title,
      description: t.services.privateCoach.desc,
      cta: t.services.privateCoach.cta,
      icon: UserCheck,
      hasDisclaimer: false,
      popular: false,
    },
  ];

  return (
    <section id="programs" className="py-20 sm:py-28 bg-brand-navy relative border-t border-brand-silver/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-steel border border-brand-silver/15 rounded-md text-xs font-black tracking-widest text-brand-red uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>{t.services.sectionBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-4">
            {t.services.sectionTitle}
          </h2>

          <p className="text-sm sm:text-base text-brand-silver/90 font-medium leading-relaxed max-w-2xl mx-auto">
            {t.services.sectionSubtitle}
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 bg-brand-steel border transition-all duration-300 group hover:-translate-y-1 ${
                  srv.popular
                    ? 'border-brand-red/50 shadow-xl shadow-brand-red/10'
                    : 'border-brand-silver/15 hover:border-brand-silver/30'
                }`}
              >
                {/* Top indicator bar */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-red/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar with Number code and badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-black text-brand-red font-mono tracking-tighter">
                      {srv.code}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase rounded-md bg-brand-navy border border-brand-silver/15 text-brand-silver">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-silver/15 flex items-center justify-center text-brand-silver group-hover:text-brand-red group-hover:border-brand-red/40 transition-colors mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-brand-white uppercase tracking-wide mb-3 leading-snug">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-brand-silver/85 font-medium leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Disclaimer for Reathletisation */}
                  {srv.hasDisclaimer && srv.disclaimer && (
                    <div className="mb-6 p-3.5 rounded-xl bg-brand-navy/95 border border-brand-red/40 flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs text-brand-silver/90 leading-normal font-medium">
                        {srv.disclaimer}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 border-t border-brand-silver/10">
                  <button
                    onClick={() => onSelectService(srv.id)}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-brand-navy hover:bg-brand-red text-brand-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl border border-brand-silver/20 hover:border-brand-red transition-all duration-200 group-hover:shadow-lg active:scale-[0.99]"
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
