import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Award, 
  GraduationCap, 
  Layers, 
  Building2,
  Sparkles,
  ArrowRight,
  Code2,
  Users,
  Trophy,
  Download,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { experienceData } from '../data/experienceData';
import { TechIcon } from '../components/common/TechIcon';
import { updateSEO } from '../utils/seo';

export const Experience: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Experience & Career Journey | Full-Stack Developer',
      description: 'Explore the professional journey, work history, roles, responsibilities, and achievements of Yash Barot.',
      canonicalUrl: 'https://yashbarot.dev/experience',
    });
  }, []);

  const stats = [
    { label: 'Years Experience', value: '2+', icon: Briefcase },
    { label: 'Projects Completed', value: '20+', icon: Code2 },
    { label: 'Happy Clients', value: '5+', icon: Users },
    { label: 'Commitment to Quality', value: '100%', icon: Trophy },
  ];

  const journeySteps = [
    { year: '2024', role: 'Full-Stack Developer', company: 'Software Minds Studio / Nxt-India' },
    { year: '2023', role: 'Backend Developer', company: 'Freelance & Enterprise Projects' },
    { year: '2022', role: 'Frontend Developer (Intern)', company: 'Learning & Practice' },
    { year: '2020', role: 'Started Learning', company: 'Self Study & Personal Projects' },
  ];

  const techWorkedWith = [
    'React', '.NET Core', 'Node.js', 'TypeScript', 'SQL Server', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'Git'
  ];

  const whatIveGained = [
    { title: 'Real-world Problem Solving', desc: 'Experience in solving complex business problems through technology.', icon: Lightbulb, color: 'text-amber-400' },
    { title: 'End-to-end Development', desc: 'From UI/UX to database and deployment.', icon: Code2, color: 'text-purple-400' },
    { title: 'Team Collaboration', desc: 'Clear communication and working in teams.', icon: Users, color: 'text-blue-400' },
    { title: 'Continuous Learning', desc: 'Always exploring new technologies and best practices.', icon: BookOpen, color: 'text-pink-400' },
  ];

  return (
    <div className="pt-8 pb-20 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold mb-2 block">
            EXPERIENCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight leading-tight">
            My Professional <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 light:text-slate-600 leading-relaxed">
            A timeline of my professional experience, roles, responsibilities and the impact I've created through real-world projects and continuous learning.
          </p>
        </div>

        {/* 4 Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 light:bg-slate-100 flex items-center justify-center text-blue-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white light:text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-400 light:text-slate-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Work Experience Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <div className="mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-1">
                PROFESSIONAL EXPERIENCE
              </span>
              <h2 className="text-2xl font-bold text-white light:text-slate-900">
                Work <span className="text-blue-400">Experience</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                My professional journey in building scalable applications, solving complex problems and working with modern technologies.
              </p>
            </div>

            <div className="relative border-l-2 border-blue-500/20 ml-3 md:ml-4 space-y-8 pt-4">
              {experienceData.map((exp, idx) => (
                <div key={exp.id} className="relative pl-6 md:pl-8 group">
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#070913] border-2 border-blue-500 group-hover:scale-125 transition-transform" />

                  {/* Card */}
                  <div className="p-6 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl hover:border-blue-500/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white light:text-slate-900">
                            {exp.role}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300">
                            {exp.employmentType}
                          </span>
                        </div>
                        <div className="text-xs text-blue-400 font-semibold mt-0.5">
                          {exp.company}
                        </div>
                      </div>

                      <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.startDate} – {exp.endDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-1.5 mb-4 text-xs text-slate-300 light:text-slate-700">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 light:bg-slate-100 text-cyan-300 light:text-blue-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar (Journey Glance, Tech, What I've Gained) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Journey at a Glance */}
            <div className="p-6 rounded-3xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
              <h3 className="text-sm font-bold text-white light:text-slate-900 mb-4">
                My Journey at a Glance
              </h3>
              <div className="space-y-4">
                {journeySteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <div>
                      <span className="text-xs font-bold text-blue-400 font-mono">{step.year}: </span>
                      <span className="text-xs font-bold text-white light:text-slate-900">{step.role}</span>
                      <span className="text-[11px] text-slate-400 block">{step.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies I've Worked With */}
            <div className="p-6 rounded-3xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
              <h3 className="text-sm font-bold text-white light:text-slate-900 mb-4">
                Technologies I've Worked With
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {techWorkedWith.map((tech) => (
                  <div
                    key={tech}
                    className="p-2.5 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 flex flex-col items-center justify-center text-center"
                  >
                    <TechIcon name={tech} size="sm" />
                    <span className="text-[10px] font-semibold text-slate-300 light:text-slate-800 mt-1 truncate w-full">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What I've Gained */}
            <div className="p-6 rounded-3xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 space-y-3.5">
              <h3 className="text-sm font-bold text-white light:text-slate-900 mb-2">
                What I've Gained
              </h3>
              {whatIveGained.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl bg-slate-800 light:bg-slate-100 ${item.color} shrink-0 mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white light:text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold block mb-1">
              LET'S WORK TOGETHER
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Looking for a Developer with <span className="text-blue-400">Real Experience</span>?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects or ways we can work together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/contact"
              className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-2 shadow-lg"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/resume"
              className="px-5 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
