import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'purple' | 'amber' | 'cyan' | 'slate';
  dot?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  dot = false,
  className,
  size = 'md',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 light:bg-emerald-50 light:border-emerald-300 light:text-emerald-700',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400 light:bg-blue-50 light:border-blue-300 light:text-blue-700',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400 light:bg-purple-50 light:border-purple-300 light:text-purple-700',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400 light:bg-amber-50 light:border-amber-300 light:text-amber-700',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 light:bg-cyan-50 light:border-cyan-300 light:text-cyan-700',
    slate: 'bg-slate-800/80 border-slate-700 text-slate-300 light:bg-slate-100 light:border-slate-300 light:text-slate-700',
  };

  const dotColors = {
    emerald: 'bg-emerald-400 animate-pulse',
    blue: 'bg-blue-400 animate-pulse',
    purple: 'bg-purple-400 animate-pulse',
    amber: 'bg-amber-400 animate-pulse',
    cyan: 'bg-cyan-400 animate-pulse',
    slate: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs md:text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('w-2 h-2 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
