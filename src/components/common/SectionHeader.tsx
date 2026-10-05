import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlightText,
  description,
  align = 'center',
  className,
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 md:mb-16', alignStyles[align], className)}>
      {badge && (
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 inline-block">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white light:text-slate-900 leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {highlightText}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-slate-400 light:text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
