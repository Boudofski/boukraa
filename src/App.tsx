import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { AthleteEvaluator } from './components/AthleteEvaluator';
import { PeriodizationRoadmap } from './components/PeriodizationRoadmap';
import { FieldActionSection } from './components/FieldActionSection';
import { HowItWorks } from './components/HowItWorks';
import { ApproachSection } from './components/ApproachSection';
import { PrivateCoachingSection } from './components/PrivateCoachingSection';
import { FAQSection } from './components/FAQSection';
import { CoursesSection } from './components/CoursesSection';
import { AboutSection } from './components/AboutSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { AdminPortal } from './components/AdminPortal';
import { ServiceId } from './types';
import { useLanguage } from './context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('strength_conditioning');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileSticky(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartAssessment = (serviceId?: ServiceId) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsAssessmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy text-white flex flex-col relative selection:bg-brand-red selection:text-white">
      {/* 1. Header with Language Switcher & Sticky Blur */}
      <Header
        onStartAssessment={() => handleStartAssessment('strength_conditioning')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Live Cohort Badge, Photo 1 (Track Portrait) & Quick Selectors */}
        <Hero onStartAssessment={(id) => handleStartAssessment(id || 'strength_conditioning')} />

        {/* 3. Stats & Credibility Bar */}
        <StatsBar />

        {/* 4. Choose What You Need / 3 Core Services */}
        <ServicesSection onSelectService={(id) => handleStartAssessment(id)} />

        {/* 5. Interactive 30-Second Athlete Assessment Configurator */}
        <AthleteEvaluator onSelectService={(id) => handleStartAssessment(id)} />

        {/* 6. Periodization & Sports Science 4-Stage Lifecycle */}
        <PeriodizationRoadmap />

        {/* 7. Real Pitch & Field Coaching Experience (Authentic On-Pitch Action Gallery) */}
        <FieldActionSection />

        {/* 8. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 9. BOUKRAA Approach (Photo 2: Program Building on PC, 3 Pillars, Quote, 2 Pathways & Pricing Policy) */}
        <ApproachSection />

        {/* 10. Private Coaching In-Depth Focus (1-on-1 & Tactics Board) */}
        <PrivateCoachingSection onStartRequest={() => handleStartAssessment('private_coaching')} />

        {/* 11. Frequently Asked Questions (Animated Accordion) */}
        <FAQSection />

        {/* 12. Courses — Coming Soon Notification Waitlist */}
        <CoursesSection />

        {/* 13. About Coach Mohamed Amine Boukraa & Pitch Portrait */}
        <AboutSection />

        {/* 14. Final Conversion CTA */}
        <FinalCTA onSelectService={(id) => handleStartAssessment(id)} />
      </main>

      {/* 15. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Mobile Quick Assessment Pill */}
      {showMobileSticky && !isAssessmentOpen && !isAdminOpen && (
        <div className="sm:hidden fixed bottom-4 inset-x-4 z-30 animate-in slide-in-from-bottom-6 duration-300">
          <div className="p-2.5 rounded-2xl bg-brand-surface/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 pl-2 rtl:pl-0 rtl:pr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse flex-shrink-0" />
              <div className="text-[11px] font-mono font-bold text-white uppercase tracking-wider leading-tight">
                BOUKRAA <span className="text-brand-gray">· COACHING</span>
              </div>
            </div>
            <button
              onClick={() => handleStartAssessment('strength_conditioning')}
              className="px-4 py-2.5 bg-brand-red hover:bg-brand-redHover text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-red/35 flex items-center gap-1.5 flex-shrink-0"
            >
              <span>{t.nav.startAssessment}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* Direct Interactive Assessment Flow Modal (Single-question mobile-first) */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        initialServiceId={selectedServiceId}
        onClose={() => setIsAssessmentOpen(false)}
      />

      {/* Built-in Coach Submissions Review Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};

export default App;
