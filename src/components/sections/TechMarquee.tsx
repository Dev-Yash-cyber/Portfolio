import React from 'react';
import { TechIcon } from '../common/TechIcon';
import { techMarqueeData } from '../../data/portfolioData';

export const TechMarquee: React.FC = () => {
  return (
    <section className="py-12 border-y border-white/5 light:border-slate-200 bg-[#050711]/60 light:bg-slate-100/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 light:text-slate-500 font-semibold">
          Technologies I Work With
        </span>
      </div>

      <div className="flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <div className="flex shrink-0 items-center justify-around gap-8 md:gap-12 animate-marquee">
          {techMarqueeData.concat(techMarqueeData).map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/60 light:bg-white border border-white/5 light:border-slate-200 hover:border-blue-500/40 transition-colors shrink-0"
            >
              <TechIcon name={tech.name} size="sm" />
              <span className="text-xs font-semibold text-slate-200 light:text-slate-800 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
