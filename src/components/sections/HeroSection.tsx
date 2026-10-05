import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Globe, 
  Sparkles, 
  Coffee, 
  Code2, 
  Layers, 
  Database,
  Terminal
} from 'lucide-react';
import { developerData } from '../../data/portfolioData';
import { CodeWindow } from '../common/CodeWindow';
import { Badge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  const roles = [
    'Full-Stack Developer',
    'Software Developer',
    'React & TypeScript Specialist',
    '.NET Core Backend Engineer',
    'SaaS Product Builder'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const fullText = roles[currentRoleIndex];
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(50);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  return (
    <section className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      {/* Background Gradients & Mesh */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Developer Information & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="emerald" dot size="md" className="mb-6 font-medium">
                {developerData.status}
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <span className="text-slate-400 light:text-slate-600 text-lg md:text-xl font-medium">
                Hello, I'm
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white light:text-slate-950">
                <span className="text-white light:text-slate-900">{developerData.name.split(' ')[0]}</span>{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {developerData.name.split(' ')[1]}
                </span>
              </h1>
            </motion.div>

            {/* Rotating Role Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 flex items-center min-h-[44px]"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-200 light:text-slate-800">
                <span>{displayText}</span>
                <span className="inline-block w-1 h-7 md:h-9 bg-blue-500 ml-1 animate-pulse" />
              </h2>
            </motion.div>

            {/* Short Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-slate-400 light:text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              {developerData.shortBio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-slate-800/80 hover:bg-slate-700/80 light:bg-white light:hover:bg-slate-100 text-slate-200 light:text-slate-800 border border-white/10 light:border-slate-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Let's Work Together</span>
              </Link>
            </motion.div>

            {/* Social Coordinates & Location Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/10 light:border-slate-200 w-full flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <a
                  href={developerData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800/80 light:bg-white border border-white/10 light:border-slate-300 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 hover:bg-slate-700 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={developerData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800/80 light:bg-white border border-white/10 light:border-slate-300 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500 hover:bg-slate-700 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${developerData.email}`}
                  className="w-10 h-10 rounded-xl bg-slate-800/80 light:bg-white border border-white/10 light:border-slate-300 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500 hover:bg-slate-700 transition-all duration-200"
                  aria-label="Email Yash Barot"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 light:text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {developerData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Available Worldwide
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Code Window & Floating Tech Cards */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full relative"
            >
              {/* Code Editor Window */}
              <CodeWindow />

              {/* Floating Tech Stack Floating Pills */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="hidden sm:flex absolute -top-8 -right-4 bg-[#0d1527]/90 border border-blue-500/30 backdrop-blur-md rounded-2xl p-3 shadow-xl items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Full-Stack Architect</p>
                  <p className="text-[10px] text-slate-400 font-mono">React • .NET • Node • SQL</p>
                </div>
              </motion.div>

              {/* Floating Quote Badge with Arrow */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
                className="hidden sm:flex absolute -bottom-8 -left-4 bg-[#0d1527]/90 border border-purple-500/30 backdrop-blur-md rounded-2xl p-3 shadow-xl items-center gap-2.5 z-20 max-w-[240px]"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-200 leading-tight">
                    Turning ideas into scalable digital products
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
