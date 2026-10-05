import React, { useEffect } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { TechMarquee } from '../components/sections/TechMarquee';
import { AboutPreview } from '../components/sections/AboutPreview';
import { SkillsGrid } from '../components/sections/SkillsGrid';
import { ContinuousLearning } from '../components/sections/ContinuousLearning';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { WhyWorkWithMe } from '../components/sections/WhyWorkWithMe';
import { JourneyTimeline } from '../components/sections/JourneyTimeline';
import { CtaBanner } from '../components/sections/CtaBanner';
import { updateSEO } from '../utils/seo';

export const Home: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Full-Stack Developer & Software Engineer',
      description: 'Senior Full-Stack Developer specializing in React, TypeScript, .NET Core, Node.js, SQL Server, and MongoDB. Available for freelance & software engineering roles.',
      canonicalUrl: 'https://yashbarot.dev/',
    });
  }, []);

  return (
    <div className="space-y-4">
      <HeroSection />
      <StatsSection />
      <TechMarquee />
      <FeaturedProjects isHomePage />
      <AboutPreview />
      
      {/* Skills Showcase Section */}
      <section className="relative">
        <SkillsGrid showHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ContinuousLearning />
        </div>
      </section>

      <ServicesSection />
      <ProcessSection />
      <WhyWorkWithMe />
      <JourneyTimeline />
      <CtaBanner />
    </div>
  );
};
