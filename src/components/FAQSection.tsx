import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-10 bottom-10 w-[500px] h-[500px] bg-brand-surface rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-surface border border-white/[0.08] rounded-full text-xs font-black tracking-widest text-brand-red uppercase mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-brand-red" />
            <span>{t.faq.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {t.faq.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-silver/90 font-medium leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-brand-surface border-brand-red/50 shadow-2xl shadow-brand-red/10'
                    : 'bg-brand-surface/70 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left rtl:text-right flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-black text-white uppercase tracking-wide leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-brand-navy border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-brand-silver transition-transform duration-300 shadow-inner ${
                      isOpen ? 'rotate-180 text-brand-red border-brand-red/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-brand-silver/85 leading-relaxed font-medium border-t border-white/[0.06]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
