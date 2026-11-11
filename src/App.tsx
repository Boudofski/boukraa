import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { AdminPortal } from './components/AdminPortal';
import { ServiceId } from './types';

export const App: React.FC = () => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('strength_conditioning');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Coach portal shortcut: open boukraa.vercel.app/#admin
  useEffect(() => {
    const check = () => {
      if (window.location.hash === '#admin') setIsAdminOpen(true);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const closeAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleStartAssessment = (serviceId?: ServiceId) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsAssessmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-navy flex flex-col selection:bg-brand-red selection:text-white">
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      <main className="flex-1">
        <HeroSection onSelectService={(id) => handleStartAssessment(id)} />
        <HowItWorks />
        <AboutSection />
      </main>

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      <AssessmentModal
        isOpen={isAssessmentOpen}
        initialServiceId={selectedServiceId}
        onClose={() => setIsAssessmentOpen(false)}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={closeAdmin}
      />
    </div>
  );
};

export default App;
