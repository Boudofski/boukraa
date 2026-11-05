import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Compass, Dumbbell } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Logomark Card & Credentials */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-steel border border-brand-silver/15 relative overflow-hidden shadow-2xl">
              
              {/* Top Accent Bar */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-1 bg-brand-red skew-x-[-20deg]" />
                <span className="w-4 h-1 bg-brand-red skew-x-[-20deg]" />
                <span className="w-2 h-1 bg-brand-red skew-x-[-20deg]" />
              </div>

              {/* Official Stacked Logo */}
              <div className="mb-6 flex justify-center">
                <img
                  src="/logo-stacked.png"
                  alt="BOUKRAA"
                  className="h-20 sm:h-24 w-auto object-contain"
                />
              </div>

              {/* Bio summary credentials */}
              <div className="space-y-3 pt-5 border-t border-brand-silver/10">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-brand-white">
                  <div className="w-7 h-7 rounded-lg bg-brand-navy flex items-center justify-center text-brand-red flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>Enseignant d’Éducation Physique & Sportive</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-brand-white">
                  <div className="w-7 h-7 rounded-lg bg-brand-navy flex items-center justify-center text-brand-red flex-shrink-0">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <span>Strength & Conditioning Coach (Préparation Physique)</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-brand-white">
                  <div className="w-7 h-7 rounded-lg bg-brand-navy flex items-center justify-center text-brand-red flex-shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Coach de Football & Développement Moteur</span>
                </div>
              </div>

              {/* Philosophy Tag at bottom */}
              <div className="mt-6 pt-4 border-t border-brand-navy text-center">
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-brand-red uppercase font-mono">
                  {t.about.signatureTag}
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Coach Manifesto */}
          <div className="lg:col-span-7 text-left rtl:text-right space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-steel border border-brand-silver/15 rounded-md text-xs font-black tracking-widest text-brand-red uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight">
              {t.about.title}
            </h2>

            <p className="text-xs sm:text-sm font-black text-brand-red uppercase tracking-wider font-mono">
              {t.about.subtitle}
            </p>

            <div className="space-y-4 text-brand-silver/90 text-xs sm:text-sm leading-relaxed font-medium">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <div className="p-4 rounded-xl bg-brand-steel/60 border border-brand-silver/10 text-white font-semibold">
                {t.about.p3}
              </div>
              <p>{t.about.p4}</p>
            </div>

            {/* Signature Line */}
            <div className="pt-2 flex items-center gap-4">
              <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest font-mono">
                MOHAMED AMINE BOUKRAA
              </div>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-red to-transparent" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
