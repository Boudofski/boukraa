import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Photo */}
          <div className="">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto md:mx-0">
              <img
                src="/assets/boukraa-coach-pitch.jpg"
                alt="Coach Boukraa"
                className="w-full h-full object-cover"
              />
              {/* Subtle red accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red" />
            </div>
          </div>

          {/* Text */}
          <div className="">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-brand-red" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-brand-red uppercase">
                {t.about.title}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brand-navy mb-1">
              {t.about.name}
            </h2>

            {/* Roles */}
            <p className="text-[12px] font-bold tracking-wider text-brand-gray uppercase mb-6">
              {t.about.roles}
            </p>

            {/* Bio Paragraphs */}
            <div className="space-y-4">
              <p className="text-[14px] text-brand-navy/80 leading-relaxed">
                {t.about.p1}
              </p>
              <p className="text-[14px] text-brand-navy/80 leading-relaxed">
                {t.about.p2}
              </p>
              <p className="text-[14px] text-brand-navy/80 leading-relaxed font-medium">
                {t.about.p3}
              </p>
            </div>
          </div>
        </div>

        {/* Courses — Coming Soon (Section 22) */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-brand-border">
          <div className="rounded-2xl bg-brand-bg border border-brand-border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-brand-red/10 text-brand-red text-[10px] font-extrabold tracking-[0.18em] uppercase mb-2.5">
                {t.courses.badge}
              </span>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-brand-navy">
                {t.courses.title}
              </h3>
              <p className="mt-1 text-[13.5px] text-brand-gray leading-relaxed">
                {t.courses.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
