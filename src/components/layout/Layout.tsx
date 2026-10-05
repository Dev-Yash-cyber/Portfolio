import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#070913] light:bg-slate-50 text-slate-100 light:text-slate-900 transition-colors duration-300 relative">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
