import React, { useEffect } from 'react';
import { SkillsGrid } from '../components/sections/SkillsGrid';
import { ContinuousLearning } from '../components/sections/ContinuousLearning';
import { TechMarquee } from '../components/sections/TechMarquee';
import { CtaBanner } from '../components/sections/CtaBanner';
import { updateSEO } from '../utils/seo';

export const Skills: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Skills & Technologies',
      description: 'Comprehensive overview of frontend, backend, database, and architecture skills used by Yash Barot.',
      canonicalUrl: 'https://yashbarot.dev/skills',
    });
  }, []);

  return (
    <div className="pt-8 pb-16">
      <SkillsGrid showHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ContinuousLearning />
      </div>
      <TechMarquee />
      <CtaBanner />
    </div>
  );
};
