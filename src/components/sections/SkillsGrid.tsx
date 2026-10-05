import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  ShieldCheck, 
  Boxes, 
  Sparkles,
  Layers,
  Cpu,
  Lock,
  Workflow
} from 'lucide-react';
import { skillsData } from '../../data/skillsData';
import { TechIcon } from '../common/TechIcon';
import { SectionHeader } from '../common/SectionHeader';
import { SkillCategoryType } from '../../types';

interface SkillsGridProps {
  showHeader?: boolean;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ showHeader = true }) => {
  const categories: {
    title: SkillCategoryType;
    icon: React.ReactNode;
    subtitle: string;
    glow: string;
    accentColor: string;
  }[] = [
    {
      title: 'Frontend Development',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      subtitle: 'Building modern, responsive and user-friendly interfaces.',
      glow: 'border-cyan-500/20 hover:border-cyan-500/40 shadow-cyan-500/5',
      accentColor: 'text-cyan-400',
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      subtitle: 'Building secure, scalable and high-performance APIs.',
      glow: 'border-emerald-500/20 hover:border-emerald-500/40 shadow-emerald-500/5',
      accentColor: 'text-emerald-400',
    },
    {
      title: 'Database & Storage',
      icon: <Database className="w-5 h-5 text-purple-400" />,
      subtitle: 'Designing and working with relational and NoSQL databases.',
      glow: 'border-purple-500/20 hover:border-purple-500/40 shadow-purple-500/5',
      accentColor: 'text-purple-400',
    },
    {
      title: 'Development Tools',
      icon: <Wrench className="w-5 h-5 text-amber-400" />,
      subtitle: 'Tools that help me build, test and deliver software efficiently.',
      glow: 'border-amber-500/20 hover:border-amber-500/40 shadow-amber-500/5',
      accentColor: 'text-amber-400',
    },
    {
      title: 'Concepts & Architecture',
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      subtitle: 'Core concepts and best practices I follow in development.',
      glow: 'border-blue-500/20 hover:border-blue-500/40 shadow-blue-500/5',
      accentColor: 'text-blue-400',
    },
    {
      title: 'Other Technologies',
      icon: <Boxes className="w-5 h-5 text-pink-400" />,
      subtitle: 'Additional technologies and tools I work with.',
      glow: 'border-pink-500/20 hover:border-pink-500/40 shadow-pink-500/5',
      accentColor: 'text-pink-400',
    },
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            badge="MY SKILLS"
            title="Skills &"
            highlightText="Technologies"
            description="A comprehensive overview of the technologies, tools and frameworks I work with to build modern, scalable and high-performance applications."
          />
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const categorySkills = skillsData.filter((s) => s.category === cat.title);

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl p-6 bg-[#0a0f20]/90 light:bg-white border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${cat.glow}`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 light:bg-slate-100 border border-white/5 light:border-slate-200">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white light:text-slate-900 tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5 leading-snug">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills Mini-Grid (3 columns x 2 rows) */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-200 text-center"
                        title={skill.description}
                      >
                        <TechIcon name={skill.name} size="md" className="group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-[11px] font-semibold text-slate-200 light:text-slate-800 mt-2 truncate w-full">
                          {skill.name}
                        </span>
                        {skill.experience && (
                          <span className="text-[9px] font-mono text-slate-400 light:text-slate-500 mt-0.5">
                            {skill.experience}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
