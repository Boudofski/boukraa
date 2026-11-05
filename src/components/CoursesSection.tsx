import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Bell, CheckCircle2, Sparkles } from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="courses" className="py-24 bg-brand-navy relative border-t border-brand-silver/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto rounded-2xl bg-brand-steel border border-brand-silver/15 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle diagonal background line */}
          <div className="absolute top-0 right-10 w-48 h-1 bg-brand-red skew-x-[-25deg] opacity-60" />

          {/* Badge & Coming Soon Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 rounded bg-brand-navy border border-brand-silver/15 text-xs font-black uppercase tracking-wider text-brand-silver">
              {t.courses.badge}
            </span>
            <span className="px-3 py-1 rounded bg-brand-red/20 border border-brand-red/40 text-xs font-black uppercase tracking-wider text-brand-red">
              {t.courses.comingSoon}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-white uppercase tracking-tight mb-4">
            {t.courses.title}
          </h2>

          {/* Subtitle & Description */}
          <p className="text-base sm:text-lg text-brand-silver/90 font-medium max-w-2xl mx-auto mb-4 leading-relaxed">
            {t.courses.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-brand-gray max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            {t.courses.desc}
          </p>

          {/* Stay informed waitlist input */}
          <div className="max-w-md mx-auto">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-brand-navy border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{t.courses.notifySuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.courses.emailPlaceholder}
                  required
                  className="flex-1 px-4 py-3 bg-brand-navy border border-brand-silver/20 focus:border-brand-red rounded-lg text-brand-white text-xs sm:text-sm font-medium placeholder:text-brand-gray/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-red hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>{t.courses.notifyMe}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
