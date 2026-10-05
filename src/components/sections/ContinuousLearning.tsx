import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CodeXml, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { learningRoadmap } from '../../data/skillsData';

export const ContinuousLearning: React.FC = () => {
  return (
    <div className="mt-12 rounded-2xl p-6 md:p-8 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 light:border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <CodeXml className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white light:text-slate-900">
              Continuous Learning
            </h3>
            <p className="text-xs md:text-sm text-slate-400 light:text-slate-500">
              I always try to stay updated with the latest technologies and industry trends.
            </p>
          </div>
        </div>

        <Link
          to="/journey"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 light:border-slate-300 text-slate-200 light:text-slate-800 transition-all duration-200 self-start sm:self-auto"
        >
          <span>View My Learning Journey</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Stages Horizontal Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {learningRoadmap.map((stage, idx) => {
          const stepColors = {
            1: 'bg-blue-600 text-white border-blue-400/30',
            2: 'bg-purple-600 text-white border-purple-400/30',
            3: 'bg-emerald-600 text-white border-emerald-400/30',
            4: 'bg-amber-600 text-white border-amber-400/30',
          };

          return (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between p-4 rounded-xl bg-slate-900/40 light:bg-slate-50 border border-white/5 light:border-slate-200"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono border ${
                      stepColors[stage.step as keyof typeof stepColors]
                    }`}
                  >
                    {stage.step}
                  </div>
                  <span className="text-xs font-bold text-slate-200 light:text-slate-800">
                    {stage.status}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-400 light:text-slate-600">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
