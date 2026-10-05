import React, { useEffect } from 'react';
import { JourneyTimeline } from '../components/sections/JourneyTimeline';
import { ContinuousLearning } from '../components/sections/ContinuousLearning';
import { CtaBanner } from '../components/sections/CtaBanner';
import { updateSEO } from '../utils/seo';

export const Journey: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Career Journey & Milestones',
      description: 'The evolution of Yash Barot as a software engineer from engineering student to full-stack and AI SaaS architect.',
      canonicalUrl: 'https://yashbarot.dev/journey',
    });
  }, []);

  return (
    <div className="pt-8 pb-16">
      <JourneyTimeline />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ContinuousLearning />
      </div>
      <CtaBanner />
    </div>
  );
};
