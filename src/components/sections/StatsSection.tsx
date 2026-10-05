import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Layers, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { statsData } from '../../data/portfolioData';

export const StatsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-rose-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-pink-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getGlow = (idx: number) => {
    switch (idx) {
      case 0:
        return 'border-blue-500/20 group-hover:border-blue-500/50 bg-blue-950/10';
      case 1:
        return 'border-rose-500/20 group-hover:border-rose-500/50 bg-rose-950/10';
      case 2:
        return 'border-cyan-500/20 group-hover:border-cyan-500/50 bg-cyan-950/10';
      case 3:
        return 'border-pink-500/20 group-hover:border-pink-500/50 bg-pink-950/10';
      default:
        return 'border-indigo-500/20 group-hover:border-indigo-500/50 bg-indigo-950/10';
    }
  };

  return (
    <section className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`group relative rounded-2xl p-5 md:p-6 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 bg-[#090e1f]/80 light:bg-white light:border-slate-200 ${getGlow(
                idx
              )}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 light:bg-slate-100 flex items-center justify-center shrink-0 border border-white/5 light:border-slate-200 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(stat.icon)}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white light:text-slate-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold text-slate-200 light:text-slate-800 leading-tight">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-slate-400 light:text-slate-500 mt-0.5">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
