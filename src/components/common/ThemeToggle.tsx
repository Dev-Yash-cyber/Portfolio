import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 light:border-slate-300 text-slate-300 light:text-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
};
