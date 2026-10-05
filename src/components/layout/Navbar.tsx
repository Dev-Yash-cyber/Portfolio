import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, FileText, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Journey', path: '/journey' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070913]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Monogram */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-glow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="font-mono text-base tracking-tighter">YB</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Yash Barot
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white shadow-glow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-200 transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Actions and Hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#070913]/98 border-b border-white/10 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/resume"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-slate-800 border border-white/10 text-slate-200"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Download / View Resume</span>
            </Link>
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-glow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Let's Work Together</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
