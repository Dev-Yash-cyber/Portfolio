import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glow?: 'blue' | 'cyan' | 'purple' | 'none';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  glow = 'none',
  className,
  ...props
}) => {
  const glowStyles = {
    none: '',
    blue: 'hover:shadow-glow-md hover:border-blue-500/40',
    cyan: 'hover:shadow-glow-cyan hover:border-cyan-500/40',
    purple: 'hover:shadow-glow-lg hover:border-purple-500/40',
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-[#0c1222]/80 dark:bg-[#0c1222]/80 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl p-6 transition-all duration-300 shadow-xl',
        hoverEffect && 'hover:-translate-y-1 hover:border-blue-500/30 light:hover:border-blue-400 light:hover:shadow-xl',
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
