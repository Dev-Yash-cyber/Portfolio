import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Search, 
  Sparkles, 
  Layers, 
  Eye, 
  BookOpen, 
  ArrowRight,
  Code2,
  Users,
  Trophy,
  Cpu
} from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { api } from '../../services/api';
import { ProjectCategory, Project } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface FeaturedProjectsProps {
  isHomePage?: boolean;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ isHomePage = false }) => {
  const [allProjects, setAllProjects] = useState<Project[]>(projectsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadProjects = async () => {
    const data = await api.getProjects();
    if (data && data.length > 0) {
      setAllProjects(data);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = useMemo(() => {
    const base = [
      { label: 'All Projects', value: 'All', count: allProjects.length },
      { label: 'Full Stack', value: 'Full Stack', count: allProjects.filter((p) => p.category === 'Full Stack').length },
      { label: 'Business System', value: 'Business System', count: allProjects.filter((p) => p.category === 'Business System').length },
      { label: 'SaaS', value: 'SaaS', count: allProjects.filter((p) => p.category === 'SaaS').length },
      { label: 'AI / SaaS', value: 'AI / SaaS', count: allProjects.filter((p) => p.category === 'AI / SaaS').length },
      { label: 'Developer Tool', value: 'Developer Tool', count: allProjects.filter((p) => p.category === 'Developer Tool').length },
    ];
    return base;
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  const displayedProjects = isHomePage ? filteredProjects.slice(0, 6) : filteredProjects;

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FEATURED PROJECTS"
          title="Some of My"
          highlightText="Recent Work"
          description="A collection of real-world projects showcasing my skills in building modern, scalable and high-performance applications."
        />

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-blue-600 text-white shadow-glow-sm font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects by tech, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group rounded-2xl bg-[#090d1c]/90 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Thumbnail with overlay badges */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d1c] via-transparent to-transparent opacity-80" />

                    {/* Category & Featured Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-600/90 text-white backdrop-blur-md shadow-md">
                        {project.badgeText || project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-amber-500/90 text-slate-950 backdrop-blur-md flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3 fill-slate-950" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1"
                      >
                        {project.title}
                      </Link>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label={`View ${project.title} case study`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] font-mono text-slate-500">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-5 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-auto">
                  <div className="flex items-center gap-2 w-full">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-blue-600/90 hover:bg-blue-600 text-white shadow-glow-sm transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
                        aria-label="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center p-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="Case Study"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects Button */}
        {isHomePage && (
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <span>View All {allProjects.length} Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
