import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { ApproachSection } from './components/ApproachSection';
import { PrivateCoachingSection } from './components/PrivateCoachingSection';
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
      {/* 1. Header */}
      <Header
        onStartAssessment={() => handleStartAssessment('strength_conditioning')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero onStartAssessment={() => handleStartAssessment('strength_conditioning')} />

        {/* 3. Choose What You Need / Assessment */}
        <ServicesSection onSelectService={(id) => handleStartAssessment(id)} />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. BOUKRAA Approach */}
        <ApproachSection />

        {/* 6. Private Coaching */}
        <PrivateCoachingSection onStartRequest={() => handleStartAssessment('private_coaching')} />

        {/* 7. Courses — Coming Soon */}
        <CoursesSection />

        {/* 8. About */}
        <AboutSection />

        {/* 9. Final CTA */}
        <FinalCTA onSelectService={(id) => handleStartAssessment(id)} />
      </main>

      {/* 10. Footer */}
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
