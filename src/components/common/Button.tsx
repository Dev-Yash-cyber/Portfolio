import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  asLink = false,
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-brand-500/50';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-indigo-400/20',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/60 light:bg-slate-200 light:hover:bg-slate-300 light:text-slate-900 light:border-slate-300',
    outline:
      'bg-transparent hover:bg-white/5 border border-slate-700 text-slate-200 hover:border-slate-500 light:border-slate-300 light:text-slate-700 light:hover:bg-slate-100',
    ghost:
      'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100',
    gradient:
      'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (asLink && href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span>{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span>{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
