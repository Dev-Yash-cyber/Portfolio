import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  MonitorSmartphone, 
  Layers, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import { whyWorkWithMe } from '../../data/servicesData';
import { SectionHeader } from '../common/SectionHeader';

export const WhyWorkWithMe: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'MonitorSmartphone': return <MonitorSmartphone className="w-5 h-5 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      default: return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="VALUES & STANDARDS"
          title="Why Work"
          highlightText="With Me"
          description="I treat every project as if it were my own product — ensuring rock-solid code, clear updates, fast load times, and tangible business results."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyWorkWithMe.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/5 light:border-slate-200 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 light:bg-slate-100 flex items-center justify-center mb-4 border border-white/5 light:border-slate-200">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-sm font-bold text-white light:text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
