import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Compass, Dumbbell, Target } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-brand-surface rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-red/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dual Authentic Photography Showcase (Pitch + Tactics Board) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Primary Photo: Pitch & Field Coaching */}
            <div className="rounded-3xl bg-brand-surface/90 backdrop-blur-2xl border border-white/[0.1] relative overflow-hidden shadow-2xl group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy">
                <img
                  src="/assets/boukraa-coach-pitch.jpg"
                  alt="Mohamed Amine Boukraa on football pitch in national coaching kit"
                  className="w-full h-full object-cover object-top filter contrast-[1.04] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-90" />
                
                {/* Official Logo overlay */}
                <div className="absolute bottom-3 right-4 rtl:right-auto rtl:left-4 bg-brand-navy/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/[0.1] shadow-lg">
                  <img
                    src="/logo-header.png"
                    alt="BOUKRAA"
                    className="h-6 w-auto object-contain"
                  />
                </div>

                {/* Tag on top */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-brand-navy/95 backdrop-blur-md px-3 py-1 rounded-lg border border-white/[0.1] text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                  {locale === 'fr' ? 'TERRAIN & CONDUITE' : locale === 'ar' ? 'الميدان والممارسة' : 'FIELD & COACHING'}
                </div>
              </div>

              {/* Verified Credentials List */}
              <div className="p-5 sm:p-6 space-y-2.5">
                <div className="flex items-center gap-3 text-xs sm:text-[13px] font-bold text-white p-3 rounded-xl bg-brand-navy/90 border border-white/[0.08]">
                  <div className="w-7 h-7 rounded-lg bg-brand-surface flex items-center justify-center text-brand-red flex-shrink-0 shadow-inner">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    {locale === 'ar' ? 'أستاذ تربية بدنية ورياضية (EPS)' : 'Enseignant d’Éducation Physique & Sportive (EPS)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-[13px] font-bold text-white p-3 rounded-xl bg-brand-navy/90 border border-white/[0.08]">
                  <div className="w-7 h-7 rounded-lg bg-brand-surface flex items-center justify-center text-brand-red flex-shrink-0 shadow-inner">
                    <Dumbbell className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    {locale === 'ar' ? 'معد بدني متخصص (Strength & Conditioning)' : 'Strength & Conditioning Coach (Préparateur Physique)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-[13px] font-bold text-white p-3 rounded-xl bg-brand-navy/90 border border-white/[0.08]">
                  <div className="w-7 h-7 rounded-lg bg-brand-surface flex items-center justify-center text-brand-red flex-shrink-0 shadow-inner">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    {locale === 'ar' ? 'مدرب كرة قدم وتطوير الصفات الحركية' : 'Coach de Football & Développement Moteur'}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Photo Card: Tactics Board & Planning */}
            <div className="rounded-2xl bg-brand-surface/80 backdrop-blur-xl border border-white/[0.08] p-3 flex items-center gap-3.5 group hover:border-brand-red/40 transition-colors">
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-navy relative">
                <img
                  src="/assets/boukraa-tactics-board.jpg"
                  alt="Coach Boukraa at tactics board"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                  {locale === 'fr' ? 'ANALYSE TACTICO-PHYSIQUE' : locale === 'ar' ? 'التخطيط التكتيكي والبدني' : 'TACTICAL & PHYSICAL ANALYSIS'}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {locale === 'fr' ? 'Briefing individualisé & gestion de la charge' : locale === 'ar' ? 'تخطيط الجهد وتوجيه الأداء' : 'Individualized briefing & load management'}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-brand-gray group-hover:text-brand-red transition-colors flex-shrink-0">
                <Target className="w-4 h-4" />
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
              <div className="p-5 sm:p-6 rounded-2xl bg-brand-surface border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red text-white font-semibold shadow-inner">
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
              <span className="text-[11px] font-mono font-bold text-brand-red uppercase tracking-wider hidden sm:inline">
                {t.about.signatureTag}
              </span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
