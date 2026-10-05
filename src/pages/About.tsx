import React, { useEffect } from 'react';
import { AboutPreview } from '../components/sections/AboutPreview';
import { StatsSection } from '../components/sections/StatsSection';
import { WhyWorkWithMe } from '../components/sections/WhyWorkWithMe';
import { CtaBanner } from '../components/sections/CtaBanner';
import { updateSEO } from '../utils/seo';

export const About: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'About Me | Full-Stack Developer',
      description: 'Learn about Yash Barot, his development philosophy, software engineering background, education, and technical expertise.',
      canonicalUrl: 'https://yashbarot.dev/about',
    });
  }, []);

  return (
    <div className="pt-8 pb-16">
      <AboutPreview />
      <StatsSection />
      <WhyWorkWithMe />
      <CtaBanner />
    </div>
  );
};
