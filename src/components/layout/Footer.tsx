import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp, Phone, MapPin, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { developerData } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050711] light:bg-slate-50 border-t border-white/10 light:border-slate-200 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 light:border-slate-200">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-glow-sm">
                <span className="font-mono text-base tracking-tighter">YB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white light:text-slate-900">
                  {developerData.name}
                </span>
                <span className="text-xs font-mono text-slate-400 light:text-slate-500">
                  {developerData.role}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 light:text-slate-600 max-w-sm leading-relaxed">
              Full-Stack Developer passionate about building high-performance, scalable web applications, business systems, and AI-driven SaaS products.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Freelance & Contract Roles</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={developerData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-700/80 transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={developerData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-700/80 transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${developerData.email}`}
                className="w-9 h-9 rounded-xl bg-slate-800/80 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-700/80 transition-all duration-200"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 light:text-slate-800 mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400 light:text-slate-600">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-blue-400 transition-colors">
                  Skills & Tech Stack
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-blue-400 transition-colors">
                  Work Experience
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-blue-400 transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/journey" className="hover:text-blue-400 transition-colors">
                  Career Journey
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition-colors">
                  Developer Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Projects */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 light:text-slate-800 mb-4">
              Key Projects
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400 light:text-slate-600">
              <li>
                <Link to="/projects/acovolt" className="hover:text-blue-400 transition-colors">
                  ACOVOLT EV Platform
                </Link>
              </li>
              <li>
                <Link to="/projects/school-rojmel" className="hover:text-blue-400 transition-colors">
                  School Rojmel System
                </Link>
              </li>
              <li>
                <Link to="/projects/ai-recruity" className="hover:text-blue-400 transition-colors">
                  AI Recruity Platform
                </Link>
              </li>
              <li>
                <Link to="/projects/rezilli" className="hover:text-blue-400 transition-colors">
                  Rezilli Analytics
                </Link>
              </li>
              <li>
                <Link to="/projects/task-management-system" className="hover:text-blue-400 transition-colors">
                  Task Management App
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Direct */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 light:text-slate-800 mb-4">
              Contact Direct
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-400 light:text-slate-600">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${developerData.email}`} className="hover:text-white transition-colors break-all">
                  {developerData.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${developerData.phone}`} className="hover:text-white transition-colors">
                  {developerData.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{developerData.location}</span>
              </li>
              {/* <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Admin Portal</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 light:text-slate-400">
          <p>© {currentYear} {developerData.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> in Gujarat, India
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
