import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceId, Question } from '../types';
import { servicesData } from '../data/servicesData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  MessageSquare,
  Clock,
  Edit3,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentModalProps {
  isOpen: boolean;
  initialServiceId: ServiceId;
  onClose: () => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  initialServiceId,
  onClose,
}) => {
  const { locale, t, isRtl } = useLanguage();
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReviewStep, setIsReviewStep] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Synchronize initialServiceId when modal opens
  useEffect(() => {
    setSelectedServiceId(initialServiceId);
    setCurrentIndex(0);
    setAnswers({});
    setSubmittedData(null);
    setErrorMessage('');
    setIsReviewStep(false);
  }, [initialServiceId, isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const currentService = useMemo(() => {
    return servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];
  }, [selectedServiceId]);

  // Compute active questions based on condition functions
  const activeQuestions: Question[] = useMemo(() => {
    return currentService.questions.filter((q) => {
      if (!q.condition) return true;
      return q.condition(answers);
    });
  }, [currentService, answers]);

  const currentQuestion = activeQuestions[currentIndex];

  // Auto-focus input on step change
  useEffect(() => {
    if (isOpen && !isReviewStep && !submittedData) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isOpen, isReviewStep, submittedData]);

  if (!isOpen) return null;

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleAnswerChange = (value: any) => {
    setErrorMessage('');
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const validateCurrentQuestion = () => {
    if (!currentQuestion) return true;
    if (currentQuestion.required) {
      const val = answers[currentQuestion.id];
      if (val === undefined || val === null || val === '') {
        setErrorMessage(t.questionnaire.requiredError);
        return false;
      }
      if (currentQuestion.type === 'tel') {
        const cleaned = String(val).replace(/[^0-9+]/g, '');
        if (cleaned.length < 8) {
          setErrorMessage(
            locale === 'fr'
              ? 'Veuillez saisir un numéro WhatsApp valide (au moins 8 chiffres).'
              : locale === 'ar'
              ? 'يرجى إدخال رقم واتساب صالح (8 أرقام على الأقل).'
              : 'Please enter a valid WhatsApp number (at least 8 digits).'
          );
          return false;
        }
      }
      if (currentQuestion.type === 'number') {
        const num = Number(val);
        if (isNaN(num) || num < 12 || num > 99) {
          setErrorMessage(
            locale === 'fr'
              ? 'Veuillez indiquer un âge réaliste (12-99).'
              : locale === 'ar'
              ? 'يرجى إدخال عمر واقعي (12-99).'
              : 'Please enter a realistic age (12-99).'
          );
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) return;

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsReviewStep(true);
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (isReviewStep) {
      setIsReviewStep(false);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleEditQuestion = (index: number) => {
    setIsReviewStep(false);
    setCurrentIndex(index);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        service: selectedServiceId,
        fullName: answers.fullName || '',
        age: answers.age || '',
        whatsapp: answers.whatsapp || '',
        answers,
        language: locale,
      };

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l’envoi');
      }

      setSubmittedData({ id: data.id });

      // Trigger celebratory confetti
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EE1B24', '#FFFFFF', '#141A25'],
      });
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          (locale === 'fr'
            ? 'Une erreur réseau est survenue. Veuillez réessayer.'
            : locale === 'ar'
            ? 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
            : 'A network error occurred. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion?.type !== 'textarea') {
      e.preventDefault();
      handleNext();
    }
  };

  // Progress percentage
  const progressPercent = isReviewStep
    ? 100
    : Math.round(((currentIndex + 1) / (activeQuestions.length + 1)) * 100);

  // WhatsApp shortcut
  const getCoachWhatsAppUrl = () => {
    const refCode = submittedData?.id || '';
    const name = answers.fullName || '';
    const textFr = `Bonjour Coach Mohamed Amine Boukraa. J'ai soumis mon bilan d'évaluation (Réf: ${refCode}). Je m'appelle ${name}.`;
    const textAr = `السلام عليكم كوتش محمد أمين بوقراع، لقد أرسلت طلب التقييم الخاص بي برقم المرجع: ${refCode}. اسمي: ${name}.`;
    const textEn = `Hello Coach Mohamed Amine Boukraa, I submitted my training assessment (Ref: ${refCode}). My name is ${name}.`;
    const msg = locale === 'ar' ? textAr : locale === 'en' ? textEn : textFr;
    return `https://wa.me/212600000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex flex-col sm:items-center sm:justify-center sm:p-4 animate-in fade-in duration-200">
      
      {/* Container: Fullscreen on mobile, Elegant card on desktop */}
      <div className="relative w-full sm:max-w-2xl bg-brand-surface min-h-screen sm:min-h-0 sm:max-h-[90vh] sm:rounded-3xl border-0 sm:border sm:border-white/[0.12] shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Top Thin Red Progress Bar */}
        <div className="w-full bg-brand-navy h-1.5 relative overflow-hidden">
          <div
            className="h-full bg-brand-red transition-all duration-300 ease-out"
            style={{ width: `${submittedData ? 100 : progressPercent}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-brand-surface/90">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red flex-shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider text-white truncate max-w-[240px] sm:max-w-md">
              {currentService.title[locale]}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-1 rtl:-mr-0 rtl:-ml-1 rounded-xl text-brand-gray hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label={t.questionnaire.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-center">
          
          {/* Post-Submission Screen */}
          {submittedData ? (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300 my-auto">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 border border-brand-red/40 flex items-center justify-center mx-auto text-brand-red shadow-lg shadow-brand-red/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-brand-red/20 border border-brand-red/40 rounded-full text-xs font-bold text-brand-red uppercase tracking-wider mb-2.5">
                  {t.postSubmission.statusBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  {t.postSubmission.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-silver/90">
                  {t.postSubmission.referenceLabel}{' '}
                  <span className="font-mono font-black text-white bg-brand-navy px-3 py-1 rounded-lg border border-white/[0.1] ml-1">
                    {submittedData.id}
                  </span>
                </p>
              </div>

              {/* Genuine Capacity / Scarcity Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-brand-navy border border-white/[0.08] text-left rtl:text-right space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-white font-black text-xs sm:text-sm uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>{t.postSubmission.scarcityHeading}</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-silver/90 leading-relaxed font-medium">
                  {t.postSubmission.p1}
                </p>
                <p className="text-xs sm:text-sm text-brand-silver/90 leading-relaxed font-medium">
                  {t.postSubmission.p2}
                </p>
                <p className="text-xs text-brand-gray leading-relaxed pt-2 border-t border-white/[0.06]">
                  {t.postSubmission.p3}
                </p>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getCoachWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.postSubmission.whatsAppAction}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-navy hover:bg-white/5 text-brand-silver font-bold text-sm tracking-wider uppercase rounded-xl border border-white/[0.1] transition-all"
                >
                  {t.postSubmission.closeBtn}
                </button>
              </div>
            </div>
          ) : isReviewStep ? (
            /* Review Step before final submission */
            <div className="space-y-5 my-auto">
              <div>
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider font-mono">
                  {locale === 'fr' ? 'Dernière étape' : locale === 'ar' ? 'الخطوة الأخيرة' : 'Final Step'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                  {t.questionnaire.reviewTitle}
                </h3>
                <p className="text-xs sm:text-sm text-brand-silver/80 mt-1">
                  {t.questionnaire.reviewSubtitle}
                </p>
              </div>

              <div className="bg-brand-navy p-5 rounded-2xl border border-white/[0.08] space-y-3 max-h-[46vh] overflow-y-auto shadow-inner">
                <div className="flex justify-between items-center pb-2.5 border-b border-white/[0.08]">
                  <span className="text-xs text-brand-gray uppercase font-semibold">
                    {t.questionnaire.serviceType}
                  </span>
                  <span className="text-xs font-black text-brand-red uppercase">
                    {currentService.title[locale]}
                  </span>
                </div>

                {activeQuestions.map((q, idx) => {
                  const val = answers[q.id];
                  let displayVal = val;
                  if (q.options && val) {
                    const opt = q.options.find((o) => o.value === val);
                    if (opt) displayVal = opt.label[locale];
                  }
                  if (val === undefined || val === '') return null;

                  return (
                    <div key={q.id} className="flex items-start justify-between gap-3 text-xs sm:text-sm pb-2.5 border-b border-white/[0.06]">
                      <div className="flex-1">
                        <div className="text-brand-gray text-[11px] font-medium">
                          {q.title[locale]}
                        </div>
                        <div className="text-white font-bold break-words mt-0.5">
                          {String(displayVal)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditQuestion(idx)}
                        className="p-1.5 text-brand-gray hover:text-brand-red transition-colors rounded-lg hover:bg-white/5"
                        title={t.questionnaire.edit}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-950/70 border border-brand-red/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          ) : (
            /* One Question at a Time Screen */
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id || currentIndex}
                initial={{ opacity: 0, x: isRtl ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-6 my-auto"
              >
                {/* Progress Count (03 / 10) */}
                <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-gray uppercase tracking-wider">
                  <span>
                    {t.questionnaire.stepIndicator}{' '}
                    <span className="text-brand-red">
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>{' '}
                    / {String(activeQuestions.length).padStart(2, '0')}
                  </span>
                  <span className="text-brand-silver/60 font-semibold">
                    {progressPercent}%
                  </span>
                </div>

                {/* Question Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
                    {currentQuestion?.title[locale]}
                  </h3>
                  {currentQuestion?.subtitle && (
                    <p className="text-xs sm:text-sm text-brand-silver/80 mt-2 font-medium">
                      {currentQuestion.subtitle[locale]}
                    </p>
                  )}
                </div>

                {/* Question Input Renderers */}
                <div className="py-1" onKeyDown={handleKeyDown}>
                  {/* Text / Tel / Number Input */}
                  {(currentQuestion?.type === 'text' ||
                    currentQuestion?.type === 'tel' ||
                    currentQuestion?.type === 'number') && (
                    <div>
                      <input
                        ref={inputRef as any}
                        type={currentQuestion.type === 'number' ? 'number' : 'text'}
                        value={currentAnswer || ''}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        placeholder={currentQuestion.placeholder?.[locale] || ''}
                        className="w-full px-4 py-4 bg-brand-navy border border-white/[0.12] focus:border-brand-red rounded-xl text-white text-base font-semibold placeholder:text-brand-gray/50 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                      />
                    </div>
                  )}

                  {/* Textarea Input */}
                  {currentQuestion?.type === 'textarea' && (
                    <div>
                      <textarea
                        ref={inputRef as any}
                        rows={4}
                        value={currentAnswer || ''}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        placeholder={currentQuestion.placeholder?.[locale] || ''}
                        className="w-full px-4 py-4 bg-brand-navy border border-white/[0.12] focus:border-brand-red rounded-xl text-white text-base font-medium placeholder:text-brand-gray/50 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                      />
                    </div>
                  )}

                  {/* Radio Options */}
                  {currentQuestion?.type === 'radio' && currentQuestion.options && (
                    <div className="space-y-3 max-h-[46vh] overflow-y-auto pr-1">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = currentAnswer === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              handleAnswerChange(opt.value);
                              // Smooth auto-advance
                              setTimeout(() => {
                                if (currentIndex < activeQuestions.length - 1) {
                                  setCurrentIndex((prev) => prev + 1);
                                } else {
                                  setIsReviewStep(true);
                                }
                              }, 200);
                            }}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border text-left rtl:text-right transition-all duration-150 min-h-[54px] ${
                              isSelected
                                ? 'bg-brand-navy border-brand-red text-white shadow-lg shadow-brand-red/10'
                                : 'bg-brand-navy/60 border-white/[0.08] text-brand-silver hover:border-white/20 hover:bg-brand-navy'
                            }`}
                          >
                            <span className="text-sm sm:text-base font-bold pr-2 rtl:pr-0 rtl:pl-2">
                              {opt.label[locale]}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'border-brand-red bg-brand-red text-white'
                                  : 'border-white/20'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="p-3 bg-red-950/70 border border-brand-red/50 rounded-xl text-xs text-red-200 flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Modal Sticky Bottom Navigation Bar */}
        {!submittedData && (
          <div className="px-5 sm:px-6 py-4 bg-brand-surface border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0 && !isReviewStep}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                currentIndex === 0 && !isReviewStep
                  ? 'opacity-30 cursor-not-allowed text-brand-gray'
                  : 'text-brand-silver hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              <span>{t.questionnaire.back}</span>
            </button>

            {isReviewStep ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 bg-brand-red hover:bg-brand-redHover disabled:opacity-50 text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-brand-red/30 transition-all active:scale-[0.99]"
              >
                <span>{isSubmitting ? t.questionnaire.submitting : t.questionnaire.submit}</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 bg-brand-red hover:bg-brand-redHover text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-brand-red/30 transition-all active:scale-[0.99]"
              >
                <span>{t.questionnaire.next}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
