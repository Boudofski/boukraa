import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Compass, Dumbbell } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-brand-surface rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Portrait + Logomark Card & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-3xl bg-brand-surface/90 backdrop-blur-2xl border border-white/[0.1] relative overflow-hidden shadow-2xl">
              
              {/* Photo on pitch in national training kit */}
              <div className="relative aspect-[4/4] sm:aspect-[4/3] w-full overflow-hidden bg-brand-navy">
                <img
                  src="/assets/boukraa-coach-pitch.jpg"
                  alt="Mohamed Amine Boukraa on football pitch in coaching tracksuit"
                  className="w-full h-full object-cover object-top filter contrast-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-95" />
                
                {/* Official Stacked Logo overlay */}
                <div className="absolute bottom-3 right-4 rtl:right-auto rtl:left-4 bg-brand-navy/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/[0.1] shadow-lg">
                  <img
                    src="/logo-header.png"
                    alt="BOUKRAA"
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Bio summary credentials */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-3.5 text-xs sm:text-sm font-bold text-white p-3.5 rounded-xl bg-brand-navy border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-brand-red flex-shrink-0 shadow-inner">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>Enseignant d’Éducation Physique & Sportive (EPS)</span>
                </div>

                <div className="flex items-center gap-3.5 text-xs sm:text-sm font-bold text-white p-3.5 rounded-xl bg-brand-navy border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-brand-red flex-shrink-0 shadow-inner">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <span>Strength & Conditioning Coach (Préparateur Physique)</span>
                </div>

                <div className="flex items-center gap-3.5 text-xs sm:text-sm font-bold text-white p-3.5 rounded-xl bg-brand-navy border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-brand-red flex-shrink-0 shadow-inner">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Coach de Football & Développement Moteur</span>
                </div>

                {/* Philosophy Tag at bottom */}
                <div className="pt-4 border-t border-white/[0.08] text-center">
                  <span className="text-[11px] sm:text-xs font-black tracking-widest text-brand-red uppercase font-mono">
                    {t.about.signatureTag}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Narrative & Coach Manifesto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left rtl:text-right space-y-5"
          >
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-surface border border-white/[0.08] rounded-full text-xs font-black tracking-widest text-brand-red uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {t.about.title}
            </h2>

            <p className="text-xs sm:text-sm font-black text-brand-red uppercase tracking-wider font-mono">
              {t.about.subtitle}
            </p>

            <div className="space-y-4 text-brand-silver/90 text-sm sm:text-base leading-relaxed font-medium">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <div className="p-5 sm:p-6 rounded-2xl bg-brand-surface border border-brand-red/30 text-white font-semibold shadow-inner">
                {t.about.p3}
              </div>
              <p>{t.about.p4}</p>
            </div>

            {/* Signature Line */}
            <div className="pt-4 flex items-center gap-4">
              <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest font-mono">
                MOHAMED AMINE BOUKRAA
              </div>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-red via-brand-red/40 to-transparent" />
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
