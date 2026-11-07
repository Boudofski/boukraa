import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

interface AthleteEvaluatorProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const AthleteEvaluator: React.FC<AthleteEvaluatorProps> = ({ onSelectService }) => {
  const { t, isRtl } = useLanguage();
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [selectedFreqIndex, setSelectedFreqIndex] = useState(1); // default 3 sessions

  const activeGoal = t.evaluator.goals[selectedGoalIndex];
  const targetServiceId = activeGoal.service as ServiceId;

  // Methodological profile descriptors based on combinations
  const getProfileInsights = () => {
    switch (activeGoal.id) {
      case 'strength':
        return {
          system: 'Force / Hypertrophie Fonctionnelle',
          periodizationType: 'Périodisation Ondulatoire Quotidienne (DUP)',
          emphasis: 'Intensité 80-92% 1RM · RPE 7-9 · Contrôle Excentrique',
          targetResponse: 'Adaptation neuromusculaire & recrutement des unités motrices rapides',
          serviceName: t.services.sAndC.title,
        };
      case 'power':
        return {
          system: 'Vitesse & Puissance Réactive (RFD)',
          periodizationType: 'Entraînement par Contraste & Complexes Français',
          emphasis: 'Vélocité maximale · Décélération · Pliométrie de haut niveau',
          targetResponse: 'Taux de montée en force & transfert direct sur le terrain',
          serviceName: t.services.sAndC.title,
        };
      case 'rehab':
        return {
          system: 'Réathlétisation & Reconditionnement Moteur',
          periodizationType: 'Protocole Isométrique & Chargement Progressif',
          emphasis: 'Tolérance tendineuse · Symétrie bilatérale · Gestuelle spécifique',
          targetResponse: 'Sécurisation tissulaire & réintégration sportive sans risque',
          serviceName: t.services.reathle.title,
        };
      case 'private':
      default:
        return {
          system: 'Coaching Haute Précision 1-on-1',
          periodizationType: 'Régulation Directe de la Charge par le Coach',
          emphasis: 'Correction biomécanique en direct · Individualisation chirurgicale',
          targetResponse: 'Efficacité motrice maximale & progression sans dispersion',
          serviceName: t.services.privateCoach.title,
        };
    }
  };

  const insights = getProfileInsights();

  return (
    <section className="py-24 sm:py-32 bg-brand-navy relative border-t border-white/[0.08] overflow-hidden">
      {/* Background glow & subtle mesh */}
      <div className="absolute inset-0 bg-tech-grid mask-radial opacity-40 pointer-events-none" />
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[600px] h-[400px] bg-brand-red/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-surface border border-white/[0.08] rounded-full text-xs font-black tracking-widest text-brand-red uppercase mb-4 shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-brand-red" />
            <span>{t.evaluator.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {t.evaluator.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-silver/90 font-medium leading-relaxed max-w-2xl mx-auto">
            {t.evaluator.subtitle}
          </p>
        </div>

        {/* Configurator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-brand-surface/90 backdrop-blur-2xl border border-white/[0.1] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top subtle red accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-80" />

          {/* Question 1: Goal */}
          <div className="mb-8">
            <label className="block text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span>{t.evaluator.goalLabel}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.evaluator.goals.map((g, idx) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoalIndex(idx)}
                  className={`p-4 rounded-xl text-left rtl:text-right border transition-all flex items-start gap-3.5 ${
                    selectedGoalIndex === idx
                      ? 'bg-brand-navy border-brand-red shadow-lg shadow-brand-red/15 text-white'
                      : 'bg-brand-navy/60 border-white/[0.08] text-brand-silver hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedGoalIndex === idx
                        ? 'border-brand-red bg-brand-red text-white'
                        : 'border-white/20'
                    }`}
                  >
                    {selectedGoalIndex === idx && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold leading-snug">
                    {g.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Frequency */}
          <div className="mb-8 pb-8 border-t border-b border-white/[0.08] pt-8">
            <label className="block text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span>{t.evaluator.freqLabel}</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {t.evaluator.freqOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFreqIndex(idx)}
                  className={`py-3.5 px-4 rounded-xl text-center border font-mono font-bold text-xs sm:text-sm transition-all ${
                    selectedFreqIndex === idx
                      ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/25'
                      : 'bg-brand-navy/60 text-brand-silver border-white/[0.08] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Live Dynamic Blueprint Result */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedGoalIndex}-${selectedFreqIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-brand-navy border border-brand-red/40 relative shadow-inner"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="text-[10px] sm:text-xs font-mono font-black text-brand-red uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{t.evaluator.blueprintTitle}</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-wide">
                    {insights.system}
                  </h3>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg bg-brand-surface border border-white/[0.1] text-xs font-mono text-white font-bold">
                  {t.evaluator.freqOptions[selectedFreqIndex]} / semaine
                </div>
              </div>

              {/* Data points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-xs text-brand-silver/90">
                <div className="p-4 rounded-xl bg-brand-surface/60 border border-white/[0.08]">
                  <span className="text-[10px] uppercase font-mono font-bold text-brand-gray block mb-1">
                    Structure de Périodisation
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {insights.periodizationType}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface/60 border border-white/[0.08]">
                  <span className="text-[10px] uppercase font-mono font-bold text-brand-gray block mb-1">
                    Paramètres d’Intensité Cible
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {insights.emphasis}
                  </span>
                </div>
              </div>

              {/* Bottom CTA to start assessment */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <p className="text-xs text-brand-gray font-medium">
                  {t.evaluator.blueprintSub}
                </p>

                <button
                  onClick={() => onSelectService(targetServiceId)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-red hover:bg-brand-redHover text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-brand-red/35 active:scale-[0.99] flex-shrink-0"
                >
                  <span>{t.evaluator.cta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
