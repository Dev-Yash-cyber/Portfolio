import React from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../../data/servicesData';
import { SectionHeader } from '../common/SectionHeader';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative bg-[#060813]/60 light:bg-slate-100/40 border-y border-white/5 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="WORKFLOW"
          title="How I Bring"
          highlightText="Projects to Life"
          description="A structured, transparent engineering process designed to eliminate guesswork, guarantee code quality, and deliver high-performance software on time."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="relative p-6 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-black text-blue-500/80 light:text-blue-600">
                    {step.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500/40" />
                </div>

                <h3 className="text-base font-bold text-white light:text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-400 light:text-blue-700 mb-3">
                  {step.tagline}
                </p>
                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
