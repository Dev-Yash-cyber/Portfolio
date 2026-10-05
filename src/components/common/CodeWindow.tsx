import React from 'react';
import { motion } from 'framer-motion';

export const CodeWindow: React.FC = () => {
  return (
    <div className="relative group max-w-lg w-full">
      {/* Ambient background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      <div className="relative rounded-2xl bg-[#090d1a] border border-white/10 shadow-2xl overflow-hidden">
        {/* Window Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#060913] border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs font-mono text-slate-400">developer.ts</div>
          <div className="text-xs font-mono text-slate-500">UTF-8</div>
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-slate-300">
          <div className="flex">
            <span className="select-none text-slate-600 w-8 text-right pr-4">1</span>
            <div>
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">developer</span>{' '}
              <span className="text-slate-400">=</span> <span className="text-amber-300">{'{'}</span>
            </div>
          </div>
          
          <div className="flex">
            <span className="select-none text-slate-600 w-8 text-right pr-4">2</span>
            <div className="pl-4">
              <span className="text-slate-300">name</span>: <span className="text-emerald-400">"Yash Barot"</span>,
            </div>
          </div>

          <div className="flex">
            <span className="select-none text-slate-600 w-8 text-right pr-4">3</span>
            <div className="pl-4">
              <span className="text-slate-300">role</span>: <span className="text-emerald-400">"Full-Stack Developer"</span>,
            </div>
          </div>

          <div className="flex">
            <span className="select-none text-slate-600 w-8 text-right pr-4">4</span>
            <div className="pl-4">
              <span className="text-slate-300">passion</span>: <span className="text-emerald-400">"Building useful products"</span>,
            </div>
          </div>

          <div className="flex">
            <span className="select-none text-slate-600 w-8 text-right pr-4">5</span>
            <div className="pl-4">
              <span className="text-slate-300">available</span>: <span className="text-cyan-400">true</span>
            </div>
          </div>

          <div className="flex">
            <span className="select-none text-slate-600 w-8 text-right pr-4">6</span>
            <div>
              <span className="text-amber-300">{'}'}</span>;
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-[#04060d] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            TypeScript 5.7 • Ready
          </span>
          <span>Clean Architecture</span>
        </div>
      </div>
    </div>
  );
};
