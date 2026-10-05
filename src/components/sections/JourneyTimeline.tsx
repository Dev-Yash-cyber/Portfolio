import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Layout, 
  Server, 
  Layers, 
  Building2, 
  Cloud, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { journeyMilestones } from '../../data/journeyData';
import { SectionHeader } from '../common/SectionHeader';

export const JourneyTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-4 h-4 text-blue-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-purple-400" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-sky-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="GROWTH STORY"
          title="My Developer"
          highlightText="Journey"
          description="From writing my first line of C++ code in engineering college to architecting production enterprise systems and agentic AI platforms."
        />

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-blue-500/20 ml-4 md:ml-32 space-y-12 py-4">
          {journeyMilestones.map((milestone, idx) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Year Label for Desktop */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                <span className="text-xs font-mono font-bold text-blue-400">
                  {milestone.year}
                </span>
              </div>

              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#070913] border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-glow-sm group-hover:scale-110 transition-transform">
                {getIcon(milestone.icon)}
              </div>

              {/* Card */}
              <div className="p-6 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <div className="md:hidden text-xs font-mono font-bold text-blue-400 mb-1">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-bold text-white light:text-slate-900">
                  {milestone.title}
                </h3>
                <h4 className="text-xs font-semibold text-cyan-400 light:text-blue-700 mb-3">
                  {milestone.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {milestone.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlight */}
                <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{milestone.keyHighlight}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
