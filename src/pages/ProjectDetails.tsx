import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Database, 
  Server, 
  Code2, 
  AlertCircle,
  Sparkles,
  TrendingUp,
  Award,
  Image as ImageIcon,
  Maximize2,
  X
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { api } from '../services/api';
import { Project } from '../types';
import { updateSEO } from '../utils/seo';
import { CtaBanner } from '../components/sections/CtaBanner';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [allProjects, setAllProjects] = useState<Project[]>(projectsData);
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await api.getProjects();
      setAllProjects(data);
      const found = data.find((p) => p.slug === slug) || null;
      setProject(found);
    };
    fetchProject();
  }, [slug]);

  useEffect(() => {
    if (project) {
      updateSEO({
        title: `${project.title} | Case Study & Architecture`,
        description: project.shortDescription,
        ogImage: project.image,
        canonicalUrl: `https://yashbarot.dev/projects/${project.slug}`,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-2">Project Not Found</h2>
        <p className="text-slate-400 light:text-slate-600 text-sm mb-6">The requested case study could not be located.</p>
        <Link
          to="/projects"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const projectIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(projectIndex + 1) % allProjects.length] || allProjects[0];
  const caseStudy = project.caseStudy;
  const galleryImages = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

  return (
    <article className="pt-10 pb-20 relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <img 
                src={selectedImage} 
                alt="Full preview" 
                className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 light:text-slate-600 leading-relaxed max-w-3xl">
            {project.fullDescription || project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-sm hover:from-blue-500 hover:to-indigo-500 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-slate-800 light:bg-slate-100 text-slate-200 light:text-slate-800 border border-white/10 light:border-slate-300 hover:bg-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Hero Banner Image */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 light:border-slate-200 shadow-2xl mb-8 max-h-[520px] group">
          <img
            src={galleryImages[activeGalleryIndex] || project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center max-h-[520px] transition-transform duration-500"
          />
          <button
            onClick={() => setSelectedImage(galleryImages[activeGalleryIndex] || project.image)}
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur text-white flex items-center gap-1.5 text-xs font-mono transition-opacity opacity-80 hover:opacity-100"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full View</span>
          </button>
        </div>

        {/* Multiple Screenshots Gallery Strip */}
        {galleryImages.length > 1 && (
          <div className="mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 light:text-slate-600 font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Project Screenshots & Gallery ({galleryImages.length})</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGalleryIndex(i)}
                  className={`relative rounded-xl overflow-hidden border transition-all text-left group ${
                    activeGalleryIndex === i 
                      ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-glow-sm' 
                      : 'border-white/10 light:border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Metrics Row */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/5 light:border-slate-200 text-center"
              >
                <span className="text-2xl sm:text-3xl font-black text-blue-400 block mb-1">
                  {m.value}
                </span>
                <span className="text-xs font-medium text-slate-400 light:text-slate-600">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-16 p-6 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Technology Stack & Architecture
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-800/90 light:bg-slate-100 text-cyan-300 light:text-blue-700 border border-white/10 light:border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Dive Case Study Content */}
        {caseStudy && (
          <div className="space-y-12 mb-20 text-slate-300 light:text-slate-700">
            {/* Overview & Problem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200">
                <h3 className="text-lg font-bold text-white light:text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  The Problem
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300 light:text-slate-600">
                  {caseStudy.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200">
                <h3 className="text-lg font-bold text-white light:text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Business Requirements
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300 light:text-slate-600">
                  {caseStudy.businessRequirement}
                </p>
              </div>
            </div>

            {/* My Role & The Solution */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
              <div className="mb-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-1">
                  RESPONSIBILITY
                </span>
                <h3 className="text-xl font-bold text-white light:text-slate-900">
                  My Engineering Role
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {caseStudy.myRole}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 light:border-slate-200">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block mb-1">
                  IMPLEMENTATION
                </span>
                <h3 className="text-xl font-bold text-white light:text-slate-900">
                  The Solution & Architecture
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                  {caseStudy.solution}
                </p>
                <div className="p-4 rounded-xl bg-slate-900/60 light:bg-slate-50 font-mono text-xs text-blue-300 light:text-blue-800 border border-white/5 light:border-slate-200">
                  {caseStudy.architecture}
                </div>
              </div>
            </div>

            {/* Technical Challenges Solved */}
            {caseStudy.technicalChallenges && caseStudy.technicalChallenges.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
                <h3 className="text-xl font-bold text-white light:text-slate-900 mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Technical Challenges & Solutions</span>
                </h3>

                <div className="space-y-6">
                  {caseStudy.technicalChallenges.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/50 light:bg-slate-50 border border-white/5 light:border-slate-200"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-rose-300 light:text-rose-700 mb-2">
                        Challenge: {item.challenge}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                        <strong className="text-emerald-400 light:text-emerald-700">Solution: </strong>
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance & Security 2-Col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200">
                <h3 className="text-base font-bold text-white light:text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Performance Improvements</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 light:text-slate-600">
                  {caseStudy.performanceImprovements.map((perf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{perf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200">
                <h3 className="text-base font-bold text-white light:text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Security Considerations</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 light:text-slate-600">
                  {caseStudy.securityConsiderations.map((sec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results & Lessons */}
            <div className="p-6 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200">
              <h3 className="text-base font-bold text-white light:text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Results & What I Learned</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                    Key Outcomes:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300 light:text-slate-600">
                    {caseStudy.results.map((res, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                    Engineering Lessons:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300 light:text-slate-600">
                    {caseStudy.whatILearned.map((l, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Project Footer Bar */}
        <div className="pt-8 border-t border-white/10 light:border-slate-200 flex items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-glow-sm transition-all"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-16">
          <CtaBanner />
        </div>
      </div>
    </article>
  );
};
