import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { AthleteEvaluator } from './components/AthleteEvaluator';
import { PeriodizationRoadmap } from './components/PeriodizationRoadmap';
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

export const App: React.FC = () => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('strength_conditioning');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleStartAssessment = (serviceId?: ServiceId) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsAssessmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy text-brand-white flex flex-col relative selection:bg-brand-red selection:text-white">
      {/* 1. Header with Language Switcher & Sticky Blur */}
      <Header
        onStartAssessment={() => handleStartAssessment('strength_conditioning')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Live Cohort Badge, Photo 1 & Quick Selectors */}
        <Hero onStartAssessment={(id) => handleStartAssessment(id || 'strength_conditioning')} />

        {/* 3. Stats & Credibility Bar */}
        <StatsBar />

        {/* 4. Choose What You Need / 3 Core Services */}
        <ServicesSection onSelectService={(id) => handleStartAssessment(id)} />

        {/* 5. Interactive 30-Second Athlete Assessment Configurator */}
        <AthleteEvaluator onSelectService={(id) => handleStartAssessment(id)} />

        {/* 6. Periodization & Sports Science 4-Stage Lifecycle */}
        <PeriodizationRoadmap />

        {/* 7. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 8. BOUKRAA Approach (Photo 2, 3 Pillars, Quote, 2 Pathways & Pricing Policy) */}
        <ApproachSection />

        {/* 9. Private Coaching In-Depth Focus */}
        <PrivateCoachingSection onStartRequest={() => handleStartAssessment('private_coaching')} />

        {/* 10. Frequently Asked Questions (Animated Accordion) */}
        <FAQSection />

        {/* 11. Courses — Coming Soon Notification Waitlist */}
        <CoursesSection />

        {/* 12. About Coach Mohamed Amine Boukraa & Credentials */}
        <AboutSection />

        {/* 13. Final Conversion CTA */}
        <FinalCTA onSelectService={(id) => handleStartAssessment(id)} />
      </main>

      {/* 14. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

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
