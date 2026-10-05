import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Send } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-500/30 shadow-2xl"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                  LET'S BUILD SOMETHING GREAT
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                These skills help me create <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">real solutions</span>.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                I'm always open to new opportunities, freelance contracts, exciting SaaS projects, or full-time collaborations where I can contribute and build high-impact products.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all duration-300"
              >
                <Download className="w-4 h-4 text-cyan-300" />
                <span>Download Resume</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
