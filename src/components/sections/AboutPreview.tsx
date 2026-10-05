import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Briefcase, 
  Mail, 
  Languages, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Server, 
  Layout, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { developerData } from '../../data/portfolioData';
import { educationData, certificationsData, languagesData } from '../../data/experienceData';
import { SectionHeader } from '../common/SectionHeader';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="ABOUT ME"
          title="Get to Know"
          highlightText="Me"
          description={`I'm ${developerData.name}, a passionate ${developerData.role} who loves building modern, scalable and high-performance web applications that solve real-world problems.`}
        />

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Developer Story & Core Highlights */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
                MY STORY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-900 mb-4">
                From Curiosity to <span className="text-blue-400">Code</span>
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 light:text-slate-600 leading-relaxed">
                <p>
                  My journey in tech started with a simple curiosity — how websites and cloud applications actually work behind the scenes. That curiosity quickly transformed into a deep passion for designing clean, reliable, and user-focused digital systems.
                </p>
                <p>
                  Over the past 2+ years, I have engineered full-stack enterprise solutions across ASP.NET Core, React, Node.js, and SQL Server/MongoDB. From automated school accounting systems to EV charging telemetry platforms and AI hiring portals, I enjoy taking complex domain challenges and converting them into elegant software.
                </p>
              </div>

              {/* Quote Block */}
              <div className="mt-6 p-4 rounded-xl bg-blue-950/30 light:bg-blue-50 border-l-4 border-blue-500 text-xs sm:text-sm italic text-blue-200 light:text-blue-900 font-medium">
                "{developerData.philosophy}"
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 light:border-slate-200 flex flex-wrap items-center gap-4">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-sm hover:from-blue-500 hover:to-indigo-500 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-slate-800 light:bg-slate-100 text-slate-200 light:text-slate-800 border border-white/10 light:border-slate-300 hover:bg-slate-700 transition-colors"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Coordinates & Quick Facts */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl flex flex-col justify-between">
            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Personal Coordinates</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Location</span>
                  <span className="text-xs font-semibold text-white light:text-slate-900">{developerData.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Experience</span>
                  <span className="text-xs font-semibold text-white light:text-slate-900">{developerData.experienceYears} (Software Development)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 block">Direct Email</span>
                  <a href={`mailto:${developerData.email}`} className="text-xs font-semibold text-white light:text-slate-900 hover:text-blue-400 transition-colors truncate block">
                    {developerData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Languages</span>
                  <span className="text-xs font-semibold text-white light:text-slate-900">English, Hindi, Gujarati</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 light:border-slate-200 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Status</span>
              <span className="text-emerald-400 font-semibold">Open for Opportunities</span>
            </div>
          </div>
        </div>

        {/* What I Do 4-Card Strip */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1 block">
              WHAT I DO
            </span>
            <h3 className="text-2xl font-bold text-white light:text-slate-900">
              I Build Digital <span className="text-blue-400">Solutions</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#090e1f]/80 light:bg-white border border-white/5 light:border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1">Web Applications</h4>
              <p className="text-xs text-slate-400 light:text-slate-600">Scalable, responsive and high-performance web systems.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1f]/80 light:bg-white border border-white/5 light:border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1">API Development</h4>
              <p className="text-xs text-slate-400 light:text-slate-600">Secure, robust and high-throughput backend APIs.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1f]/80 light:bg-white border border-white/5 light:border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Layout className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1">Modern UI/UX</h4>
              <p className="text-xs text-slate-400 light:text-slate-600">Intuitive, accessible and user-friendly designs.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#090e1f]/80 light:bg-white border border-white/5 light:border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1">Business Solutions</h4>
              <p className="text-xs text-slate-400 light:text-slate-600">Custom software architected for real-world enterprise needs.</p>
            </div>
          </div>
        </div>

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Card */}
          <div className="rounded-2xl p-6 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white light:text-slate-900">Education</h4>
                <p className="text-xs text-slate-400">Academic foundation in Information Technology</p>
              </div>
            </div>

            {educationData.map((edu) => (
              <div key={edu.id} className="p-4 rounded-xl bg-slate-900/40 light:bg-slate-50 border border-white/5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-sm font-bold text-slate-200 light:text-slate-800">{edu.degree}</h5>
                    <p className="text-xs text-blue-400">{edu.institution}, {edu.location}</p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    {edu.startYear} – {edu.endYear}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications Card */}
          <div className="rounded-2xl p-6 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white light:text-slate-900">Certifications & Programs</h4>
                <p className="text-xs text-slate-400">Continuous skill mastery and professional acceleration</p>
              </div>
            </div>

            <div className="space-y-3">
              {certificationsData.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-xl bg-slate-900/40 light:bg-slate-50 border border-white/5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-bold text-slate-200 light:text-slate-800">{cert.title}</h5>
                      <p className="text-[11px] text-emerald-400">{cert.issuer}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{cert.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cert.skills.map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
