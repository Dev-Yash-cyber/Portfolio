import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 relative">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-glow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
        ERROR 404
      </span>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-white light:text-slate-900 mb-4 tracking-tight">
        Page Not Found
      </h1>

      <p className="text-slate-400 light:text-slate-600 max-w-md text-sm sm:text-base leading-relaxed mb-8">
        The page you are looking for might have been moved, deleted, or does not exist on this route.
      </p>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
        >
          <span>View Projects</span>
        </Link>
      </div>
    </div>
  );
};
