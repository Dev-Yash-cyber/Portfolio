import React from 'react';
import { cn } from '../../utils/cn';

interface TechIconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className, size = 'md' }) => {
  const norm = name.toLowerCase().trim();

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  // Special stylized badges
  if (norm.includes('react')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-glow-cyan/20', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md', sizeClasses[size], className)}>
        <span className="font-mono">TS</span>
      </div>
    );
  }

  if (norm.includes('javascript') || norm === 'js') {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-amber-400 font-black text-black shadow-md', sizeClasses[size], className)}>
        <span className="font-mono">JS</span>
      </div>
    );
  }

  if (norm.includes('html')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-orange-600 font-black text-white shadow-md', sizeClasses[size], className)}>
        <span>5</span>
      </div>
    );
  }

  if (norm.includes('css3') || norm === 'css') {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-blue-500 font-black text-white shadow-md', sizeClasses[size], className)}>
        <span>3</span>
      </div>
    );
  }

  if (norm.includes('tailwind')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-md', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5 fill-current">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('.net') || norm.includes('dotnet')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-purple-700 font-bold text-white shadow-md', sizeClasses[size], className)}>
        <span className="text-[10px] md:text-xs font-mono">.NET</span>
      </div>
    );
  }

  if (norm.includes('c#') || norm.includes('csharp')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-purple-900 border border-purple-500 font-black text-purple-200 shadow-md', sizeClasses[size], className)}>
        <span className="font-mono text-xs md:text-sm">C#</span>
      </div>
    );
  }

  if (norm.includes('node')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold shadow-md', sizeClasses[size], className)}>
        <span className="font-mono text-xs">JS</span>
      </div>
    );
  }

  if (norm.includes('express')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-mono font-bold shadow-md', sizeClasses[size], className)}>
        <span className="text-xs">ex</span>
      </div>
    );
  }

  if (norm.includes('sql server') || norm.includes('mssql')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-rose-950 border border-rose-500/40 text-rose-400 font-bold shadow-md', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('mongodb')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-emerald-950 border border-emerald-600/40 text-emerald-400 shadow-md', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="currentColor">
          <path d="M12 2C12 2 7 9 7 14C7 17.5 9.5 20.5 12 22C14.5 20.5 17 17.5 17 14C17 9 12 2 12 2Z"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('jwt')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-fuchsia-950 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-xs font-bold shadow-md', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('git')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-orange-950 border border-orange-500/40 text-orange-400 shadow-md', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="6" y1="3" x2="6" y2="15"/>
          <circle cx="18" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <path d="M18 9a9 9 0 0 1-9 9"/>
        </svg>
      </div>
    );
  }

  if (norm.includes('docker')) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-sky-950 border border-sky-500/40 text-sky-400 shadow-md', sizeClasses[size], className)}>
        <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>
          <rect x="6" y="8" width="3" height="3"/>
          <rect x="10" y="8" width="3" height="3"/>
          <rect x="14" y="8" width="3" height="3"/>
        </svg>
      </div>
    );
  }

  // Generic fallback badge with clean gradient
  return (
    <div className={cn('flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-slate-300 shadow-md font-mono', sizeClasses[size], className)}>
      <span className="font-semibold text-xs">{name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
};
