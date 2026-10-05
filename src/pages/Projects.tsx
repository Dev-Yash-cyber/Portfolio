import React, { useEffect } from 'react';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { CtaBanner } from '../components/sections/CtaBanner';
import { updateSEO } from '../utils/seo';

export const Projects: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Featured Projects & Case Studies',
      description: 'Explore production-grade full-stack, .NET Core, React, SaaS, and AI applications engineered by Yash Barot.',
      canonicalUrl: 'https://yashbarot.dev/projects',
    });
  }, []);

  return (
    <div className="pt-8 pb-16">
      <FeaturedProjects isHomePage={false} />
      <CtaBanner />
    </div>
  );
};
