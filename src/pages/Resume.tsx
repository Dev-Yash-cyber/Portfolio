import React, { useEffect, useState } from 'react';
import { 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code2,
  FileText,
  Eye,
  Sparkles
} from 'lucide-react';
import { developerData } from '../data/portfolioData';
import { experienceData, educationData, certificationsData, languagesData } from '../data/experienceData';
import { skillsData } from '../data/skillsData';
import { api } from '../services/api';
import { DeveloperInfo } from '../types';
import { updateSEO } from '../utils/seo';
import { useToast } from '../contexts/ToastContext';

export const Resume: React.FC = () => {
  const [settings, setSettings] = useState<DeveloperInfo>(developerData);
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const { success } = useToast();

  useEffect(() => {
    updateSEO({
      title: 'Resume & Curriculum Vitae | Yash Barot',
      description: 'Interactive and downloadable official resume of Yash Barot - Full-Stack Developer with 2+ years of experience.',
      canonicalUrl: 'https://yashbarot.dev/resume',
    });

    const fetchSettings = async () => {
      const data = await api.getSettings();
      if (data) {
        setSettings(data);
        if (data.resumeUrl?.startsWith('data:application/pdf') || data.resumeUrl?.endsWith('.pdf')) {
          setViewMode('pdf');
        }
      }
    };
    fetchSettings();
  }, []);

  const isCustomPdf = settings.resumeUrl?.startsWith('data:application/pdf') || settings.resumeUrl?.endsWith('.pdf');

  const handleDownloadExactPdf = () => {
    if (isCustomPdf && settings.resumeUrl) {
      const link = document.createElement('a');
      link.href = settings.resumeUrl;
      link.download = settings.resumeFileName || `${settings.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      success('Downloading exact uploaded PDF resume...');
    } else {
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Action Header (Hidden on print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[#0a0f20]/80 border border-white/10 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">
                {settings.name} — Resume
              </h1>
              {isCustomPdf && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Official PDF
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Updated for 2026 • {settings.role} • {settings.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isCustomPdf && (
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'pdf' ? 'bg-blue-600 text-white font-semibold shadow-glow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PDF Document
                </button>
                <button
                  onClick={() => setViewMode('interactive')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'interactive' ? 'bg-blue-600 text-white font-semibold shadow-glow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Interactive View
                </button>
              </div>
            )}

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadExactPdf}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-glow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </button>
          </div>
        </div>

        {/* If user uploaded a custom PDF and selected PDF view */}
        {isCustomPdf && viewMode === 'pdf' && (
          <div className="bg-[#0b1021] rounded-3xl border border-white/10 p-2 sm:p-4 shadow-2xl mb-8">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 mb-3 text-xs">
              <span className="font-mono text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-400" />
                {settings.resumeFileName || 'Official_Resume.pdf'}
              </span>
              <button
                onClick={handleDownloadExactPdf}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Exact File</span>
              </button>
            </div>
            <div className="w-full h-[85vh] rounded-2xl overflow-hidden bg-slate-900 border border-white/5">
              <iframe
                src={settings.resumeUrl}
                title="Resume PDF Document"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}

        {/* Paper / Interactive Resume Container */}
        {(!isCustomPdf || viewMode === 'interactive') && (
          <div className="bg-[#0b1021] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl text-slate-200">
            {/* Header */}
            <header className="border-b border-white/10 pb-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    {settings.name}
                  </h2>
                  <p className="text-sm font-semibold text-blue-400 mt-0.5">
                    {settings.role}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-xs text-slate-400">
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-white">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>{settings.email}</span>
                  </a>
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-white">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{settings.phone}</span>
                  </a>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{settings.location}</span>
                  </span>
                  <div className="flex items-center gap-3 pt-1">
                    <a href={settings.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                      LinkedIn
                    </a>
                    <span>•</span>
                    <a href={settings.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {settings.bio}
                </p>
              </div>
            </header>

            {/* Work Experience */}
            <section className="mb-8">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Work Experience & Internships</span>
              </h3>

              <div className="space-y-6">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div>
                        <span className="font-bold text-white">{exp.company}</span>
                        <span className="text-slate-400">, {exp.role}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {exp.startDate} – {exp.endDate} | {exp.location}
                      </span>
                    </div>

                    <ul className="list-disc list-inside space-y-1 text-slate-300 ml-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="leading-relaxed">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills Summary */}
            <section className="mb-8 pt-6 border-t border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Technical Skills</span>
              </h3>

              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <strong className="text-white">Frontend: </strong>
                  <span className="text-slate-300">React.js, TypeScript, AngularJS, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS, jQuery, AdminLTE</span>
                </div>
                <div>
                  <strong className="text-white">Backend & APIs: </strong>
                  <span className="text-slate-300">.NET Core, C#, Node.js, Express.js, REST APIs, CRUD Operations, Third-Party API Integration, Clean Architecture</span>
                </div>
                <div>
                  <strong className="text-white">Databases: </strong>
                  <span className="text-slate-300">Microsoft SQL Server, MySQL, MongoDB, Query Optimization</span>
                </div>
                <div>
                  <strong className="text-white">AI & Automation: </strong>
                  <span className="text-slate-300">OpenAI API, Vapi AI Voice Agents, Prompt Engineering, n8n Workflow Automation</span>
                </div>
                <div>
                  <strong className="text-white">Tools: </strong>
                  <span className="text-slate-300">Git, GitHub, Visual Studio, VS Code, Postman, Swagger</span>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8 pt-6 border-t border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h3>

              {educationData.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="font-bold text-white">{edu.institution}</span>
                      <span className="text-slate-400">, {edu.degree}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  <p className="text-slate-300">{edu.location} • Information Technology</p>
                </div>
              ))}
            </section>

            {/* Certificates */}
            <section className="mb-8 pt-6 border-t border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Certificates & Training</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                {certificationsData.map((cert) => (
                  <div key={cert.id}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{cert.title}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{cert.date}</span>
                    </div>
                    <p className="text-slate-300">{cert.issuer} • {cert.skills.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="pt-6 border-t border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                {languagesData.map((l) => (
                  <div key={l.language}>
                    <span className="font-bold text-white">{l.language}: </span>
                    <span className="text-slate-300">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
