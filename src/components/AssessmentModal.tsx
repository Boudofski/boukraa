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

  useEffect(() => {
    setSelectedServiceId(initialServiceId);
    setCurrentIndex(0);
    setAnswers({});
    setSubmittedData(null);
    setErrorMessage('');
    setIsReviewStep(false);
  }, [initialServiceId, isOpen]);

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

  const activeQuestions: Question[] = useMemo(() => {
    return currentService.questions.filter((q) => {
      if (!q.condition) return true;
      return q.condition(answers);
    });
  }, [currentService, answers]);

  const currentQuestion = activeQuestions[currentIndex];

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
      if (currentQuestion.type === 'contact') {
        const str = String(val).trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str);
        const digits = str.replace(/[^0-9]/g, '');
        if (!isEmail && digits.length < 8) {
          setErrorMessage(
            locale === 'fr'
              ? 'Veuillez saisir un email valide ou un numéro WhatsApp (au moins 8 chiffres).'
              : locale === 'ar'
              ? 'يرجى إدخال بريد إلكتروني صالح أو رقم واتساب (8 أرقام على الأقل).'
              : 'Please enter a valid email or WhatsApp number (at least 8 digits).'
          );
          return false;
        }
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

  const isBlocked = !!(
    currentQuestion?.blockingValues &&
    currentAnswer !== undefined &&
    currentQuestion.blockingValues.includes(currentAnswer)
  );

  const handleNext = () => {
    if (isBlocked) return;
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
        throw new Error(data.error || 'Error submitting');
      }

      setSubmittedData({ id: data.id });

      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF252D', '#14283B', '#F5F5F2'],
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

  const progressPercent = isReviewStep
    ? 100
    : Math.round(((currentIndex + 1) / (activeQuestions.length + 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex flex-col sm:items-center sm:justify-center sm:p-4">
      
      {/* Container */}
      <div className="relative w-full sm:max-w-xl bg-white min-h-screen sm:min-h-0 sm:max-h-[90vh] sm:rounded-2xl border-0 sm:border sm:border-brand-border shadow-modal flex flex-col justify-between overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-brand-bg h-1 relative overflow-hidden">
          <div
            className="h-full bg-brand-red transition-all duration-300 ease-out"
            style={{ width: `${submittedData ? 100 : progressPercent}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-brand-border flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-red flex-shrink-0" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-navy truncate max-w-[240px] sm:max-w-md">
              {currentService.title[locale]}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-1 rtl:-mr-0 rtl:-ml-1 rounded-lg text-brand-gray hover:text-brand-navy hover:bg-brand-bg transition-colors focus:outline-none"
            aria-label={t.questionnaire.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-center">
          
          {/* Post-Submission */}
          {submittedData ? (
            <div className="text-center py-4 space-y-5 my-auto">
              <div className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto text-green-600">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-green-50 border border-green-200 rounded-full text-[11px] font-bold text-green-700 uppercase tracking-wider mb-2">
                  {t.postSubmission.statusBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-navy uppercase tracking-tight mb-1.5">
                  {t.postSubmission.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-brand-navy/80 mb-2">
                  {t.postSubmission.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-brand-gray">
                  {t.postSubmission.referenceLabel}{' '}
                  <span className="font-mono font-black text-brand-navy bg-brand-bg px-2.5 py-0.5 rounded-md border border-brand-border ml-1">
                    {submittedData.id}
                  </span>
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-brand-bg border border-brand-border text-left rtl:text-right space-y-2.5">
                <div className="flex items-center gap-2 text-brand-navy font-extrabold text-xs uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>{t.postSubmission.scarcityHeading}</span>
                </div>
                <p className="text-xs text-brand-navy/80 leading-relaxed">{t.postSubmission.p1}</p>
                <p className="text-xs text-brand-navy/80 leading-relaxed">{t.postSubmission.p2}</p>
                <p className="text-xs text-brand-navy/80 leading-relaxed">{t.postSubmission.p3}</p>
                <p className="text-xs font-semibold text-brand-navy leading-relaxed pt-2 border-t border-brand-border">
                  {t.postSubmission.p4}
                </p>
              </div>

              <div className="pt-1 flex justify-center">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-navy hover:bg-brand-red text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-colors"
                >
                  {t.postSubmission.closeBtn}
                </button>
              </div>
            </div>
          ) : isReviewStep ? (
            /* Review Step */
            <div className="space-y-5 my-auto">
              <div>
                <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider">
                  {locale === 'fr' ? 'Dernière étape' : locale === 'ar' ? 'الخطوة الأخيرة' : 'Final Step'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-brand-navy uppercase tracking-tight mt-1">
                  {t.questionnaire.reviewTitle}
                </h3>
                <p className="text-xs text-brand-gray mt-1">
                  {t.questionnaire.reviewSubtitle}
                </p>
              </div>

              <div className="bg-brand-bg p-4 rounded-xl border border-brand-border space-y-2.5 max-h-[46vh] overflow-y-auto">
                <div className="flex justify-between items-center pb-2.5 border-b border-brand-border">
                  <span className="text-[11px] text-brand-gray uppercase font-semibold">
                    {t.questionnaire.serviceType}
                  </span>
                  <span className="text-[11px] font-extrabold text-brand-red uppercase">
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
                    <div key={q.id} className="flex items-start justify-between gap-3 text-xs pb-2.5 border-b border-brand-border/60">
                      <div className="flex-1">
                        <div className="text-brand-gray text-[11px] font-medium">
                          {q.title[locale]}
                        </div>
                        <div className="text-brand-navy font-bold break-words mt-0.5">
                          {String(displayVal)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditQuestion(idx)}
                        className="p-1.5 text-brand-gray hover:text-brand-red transition-colors rounded-md hover:bg-brand-border/50"
                        title={t.questionnaire.edit}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          ) : (
            /* One Question at a Time */
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id || currentIndex}
                initial={{ opacity: 0, x: isRtl ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 12 : -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-5 my-auto"
              >
                {/* Progress Count */}
                <div className="flex items-center justify-between text-[11px] font-bold text-brand-gray uppercase tracking-wider">
                  <span>
                    {t.questionnaire.stepIndicator}{' '}
                    <span className="text-brand-red">
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>{' '}
                    / {String(activeQuestions.length).padStart(2, '0')}
                  </span>
                  <span className="text-brand-muted">
                    {progressPercent}%
                  </span>
                </div>

                {/* Question */}
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-brand-navy leading-snug tracking-tight">
                    {currentQuestion?.title[locale]}
                  </h3>
                  {currentQuestion?.subtitle && (
                    <p className="text-xs text-brand-gray mt-2 font-medium">
                      {currentQuestion.subtitle[locale]}
                    </p>
                  )}
                </div>

                {/* Input */}
                <div className="py-1" onKeyDown={handleKeyDown}>
                  {(currentQuestion?.type === 'text' ||
                    currentQuestion?.type === 'tel' ||
                    currentQuestion?.type === 'contact' ||
                    currentQuestion?.type === 'number') && (
                    <input
                      ref={inputRef as any}
                      type={currentQuestion.type === 'number' ? 'number' : 'text'}
                      inputMode={
                        currentQuestion.type === 'number'
                          ? 'numeric'
                          : currentQuestion.type === 'contact'
                          ? 'email'
                          : currentQuestion.type === 'tel'
                          ? 'tel'
                          : 'text'
                      }
                      autoComplete={
                        currentQuestion.id === 'fullName' ? 'name' : currentQuestion.type === 'contact' ? 'email' : 'off'
                      }
                      dir={currentQuestion.type === 'contact' ? 'ltr' : undefined}
                      value={currentAnswer || ''}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder={currentQuestion.placeholder?.[locale] || ''}
                      className="w-full px-4 py-3.5 bg-brand-bg border border-brand-border focus:border-brand-red rounded-xl text-brand-navy text-sm font-semibold placeholder:text-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  )}

                  {currentQuestion?.type === 'textarea' && (
                    <textarea
                      ref={inputRef as any}
                      rows={3}
                      value={currentAnswer || ''}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder={currentQuestion.placeholder?.[locale] || ''}
                      className="w-full px-4 py-3.5 bg-brand-bg border border-brand-border focus:border-brand-red rounded-xl text-brand-navy text-sm font-medium placeholder:text-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-red transition-all resize-none"
                    />
                  )}

                  {currentQuestion?.type === 'radio' && currentQuestion.options && (
                    <div className="space-y-2.5 max-h-[46vh] overflow-y-auto">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = currentAnswer === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              handleAnswerChange(opt.value);
                              // Don't auto-advance on a blocking answer (e.g. no medical clearance)
                              if (currentQuestion.blockingValues?.includes(opt.value)) return;
                              setTimeout(() => {
                                if (currentIndex < activeQuestions.length - 1) {
                                  setCurrentIndex((prev) => prev + 1);
                                } else {
                                  setIsReviewStep(true);
                                }
                              }, 200);
                            }}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left rtl:text-right transition-all duration-150 ${
                              isSelected
                                ? 'bg-brand-navy border-brand-navy text-white'
                                : 'bg-brand-bg border-brand-border text-brand-navy hover:border-brand-navy/30'
                            }`}
                          >
                            <span className="text-sm font-bold pr-2 rtl:pr-0 rtl:pl-2">
                              {opt.label[locale]}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'border-white bg-brand-red text-white'
                                  : 'border-brand-border'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Blocking notice (e.g. medical clearance required) */}
                {isBlocked && currentQuestion?.blockingMessage && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-[13px] text-amber-900 leading-relaxed flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{currentQuestion.blockingMessage[locale]}</span>
                  </div>
                )}

                {/* Service disclaimer on the first question */}
                {currentIndex === 0 && currentService.disclaimer && (
                  <p className="text-[11px] text-brand-gray leading-relaxed border-t border-brand-border pt-3">
                    {currentService.disclaimer[locale]}
                  </p>
                )}

                {/* Error */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Bottom Nav */}
        {!submittedData && (
          <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-brand-border flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0 && !isReviewStep}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                currentIndex === 0 && !isReviewStep
                  ? 'opacity-30 cursor-not-allowed text-brand-gray'
                  : 'text-brand-navy hover:bg-brand-bg'
              }`}
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              <span>{t.questionnaire.back}</span>
            </button>

            {isReviewStep ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-red hover:bg-brand-redHover disabled:opacity-50 text-white font-extrabold text-xs tracking-wider uppercase rounded-lg transition-colors"
              >
                <span>{isSubmitting ? t.questionnaire.submitting : t.questionnaire.submit}</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isBlocked}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-navy hover:bg-brand-red disabled:opacity-30 disabled:hover:bg-brand-navy disabled:cursor-not-allowed text-white font-extrabold text-xs tracking-wider uppercase rounded-lg transition-colors"
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
