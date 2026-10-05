import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Star, 
  Check, 
  X, 
  Search, 
  Upload, 
  Image as ImageIcon,
  Layers,
  FileText,
  BarChart3,
  BookOpen,
  Globe,
  Github
} from 'lucide-react';
import { api } from '../../services/api';
import { Project, ProjectCategory } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { compressImage } from '../../utils/imageCompressor';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'images' | 'metrics' | 'caseStudy'>('basic');

  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    badgeText: '',
    category: 'Full Stack',
    techStack: [],
    image: '',
    gallery: [],
    featured: false,
    liveUrl: '',
    githubUrl: '',
    metrics: [],
    caseStudy: {
      overview: '',
      problem: '',
      businessRequirement: '',
      myRole: '',
      solution: '',
      architecture: '',
      technicalChallenges: [],
      databaseAndApi: '',
      performanceImprovements: [],
      securityConsiderations: [],
      results: [],
      whatILearned: []
    }
  });

  const [techInput, setTechInput] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { success, error } = useToast();

  const loadProjects = async () => {
    const data = await api.getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleEdit = (proj: Project) => {
    const existingGallery = proj.gallery && proj.gallery.length > 0
      ? proj.gallery
      : (proj.image ? [proj.image] : []);

    const existingMetrics = proj.metrics && proj.metrics.length > 0 
      ? [...proj.metrics] 
      : [
          { label: '', value: '' },
          { label: '', value: '' },
          { label: '', value: '' }
        ];

    while (existingMetrics.length < 3) {
      existingMetrics.push({ label: '', value: '' });
    }

    setCurrentProject({
      ...proj,
      image: proj.image || existingGallery[0] || '',
      gallery: existingGallery,
      metrics: existingMetrics,
      caseStudy: proj.caseStudy || {
        overview: '',
        problem: '',
        businessRequirement: '',
        myRole: '',
        solution: '',
        architecture: '',
        technicalChallenges: [],
        databaseAndApi: '',
        performanceImprovements: [],
        securityConsiderations: [],
        results: [],
        whatILearned: []
      }
    });
    setTechInput(proj.techStack ? proj.techStack.join(', ') : '');
    setActiveTab('basic');
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    const defaultImg = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    setCurrentProject({
      id: `proj-${Date.now()}`,
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      badgeText: '',
      category: 'Full Stack',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      image: defaultImg,
      gallery: [defaultImg],
      featured: false,
      liveUrl: '',
      githubUrl: '',
      metrics: [
        { label: '', value: '' },
        { label: '', value: '' },
        { label: '', value: '' }
      ],
      caseStudy: {
        overview: '',
        problem: '',
        businessRequirement: '',
        myRole: '',
        solution: '',
        architecture: '',
        technicalChallenges: [],
        databaseAndApi: '',
        performanceImprovements: [],
        securityConsiderations: [],
        results: [],
        whatILearned: []
      }
    });
    setTechInput('React, TypeScript, Tailwind CSS');
    setActiveTab('basic');
    setIsEditing(true);
  };

  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const fileList = Array.from(files);
      const compressPromises = fileList.map((file) => compressImage(file, 1600, 1600, 0.85));
      const results = await Promise.allSettled(compressPromises);
      const newImages: string[] = [];

      results.forEach((res) => {
        if (res.status === 'fulfilled' && res.value) {
          newImages.push(res.value);
        }
      });

      if (newImages.length > 0) {
        setCurrentProject((prev) => {
          const prevGallery = (prev.gallery && prev.gallery.length > 0)
            ? prev.gallery
            : (prev.image ? [prev.image] : []);
          const updatedGallery = [...prevGallery, ...newImages];
          const coverImage = prev.image || updatedGallery[0] || '';
          return {
            ...prev,
            image: coverImage,
            gallery: updatedGallery,
          };
        });
        success(`Added ${newImages.length} image(s) to project gallery!`);
      } else {
        error('Failed to process image files.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      error('An error occurred during file upload.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddImageUrl = () => {
    if (!customImageUrl.trim()) return;
    const url = customImageUrl.trim();
    setCurrentProject((prev) => {
      const prevGallery = (prev.gallery && prev.gallery.length > 0)
        ? prev.gallery
        : (prev.image ? [prev.image] : []);
      const updatedGallery = [...prevGallery, url];
      const coverImage = prev.image || url;
      return {
        ...prev,
        image: coverImage,
        gallery: updatedGallery,
      };
    });
    setCustomImageUrl('');
    success('Image URL added to project gallery.');
  };

  const handleSetCover = (imgUrl: string) => {
    setCurrentProject((prev) => ({ ...prev, image: imgUrl }));
    success('Cover image updated.');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setCurrentProject((prev) => {
      const gallery = prev.gallery || [];
      const removedImg = gallery[indexToRemove];
      const updatedGallery = gallery.filter((_, idx) => idx !== indexToRemove);
      let newCover = prev.image;
      if (newCover === removedImg) {
        newCover = updatedGallery[0] || '';
      }
      return {
        ...prev,
        image: newCover,
        gallery: updatedGallery,
      };
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      await api.deleteProject(id);
      success('Project removed successfully.');
      loadProjects();
    }
  };

  const handleMetricChange = (index: number, field: 'label' | 'value', val: string) => {
    setCurrentProject((prev) => {
      const metrics = [...(prev.metrics || [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }])];
      metrics[index] = { ...metrics[index], [field]: val };
      return { ...prev, metrics };
    });
  };

  const handleCaseStudyChange = (field: string, val: string) => {
    setCurrentProject((prev) => ({
      ...prev,
      caseStudy: {
        ...(prev.caseStudy || {
          overview: '',
          problem: '',
          businessRequirement: '',
          myRole: '',
          solution: '',
          architecture: '',
          technicalChallenges: [],
          databaseAndApi: '',
          performanceImprovements: [],
          securityConsiderations: [],
          results: [],
          whatILearned: []
        }),
        [field]: val,
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.slug) {
      error('Title and slug are required.');
      return;
    }

    const techArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const gallery = currentProject.gallery && currentProject.gallery.length > 0 
      ? currentProject.gallery 
      : (currentProject.image ? [currentProject.image] : ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80']);

    const coverImage = currentProject.image || gallery[0];

    // Filter out empty metrics
    const cleanMetrics = (currentProject.metrics || []).filter(
      (m) => m.label?.trim() || m.value?.trim()
    );

    const projectToSave: Project = {
      ...(currentProject as Project),
      techStack: techArray,
      image: coverImage,
      gallery: gallery,
      metrics: cleanMetrics.length > 0 ? cleanMetrics : undefined,
    };

    await api.saveProject(projectToSave);
    success('Project details, metrics, and case study saved successfully!');
    setIsEditing(false);
    loadProjects();
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Management</h1>
          <p className="text-xs text-slate-400">
            Manage projects, case studies, galleries, metrics, and live URLs.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Edit / Create Form Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1021] border border-white/10 rounded-3xl max-w-4xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {currentProject.id ? 'Edit Project Details' : 'Create New Project'}
                </h2>
                <p className="text-[11px] text-slate-400 font-mono">
                  {currentProject.title || 'Untitled Project'} ({currentProject.slug || 'no-slug'})
                </p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                  activeTab === 'basic'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>1. Basic & Links</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                  activeTab === 'content'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Descriptions & Stack</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('images')}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                  activeTab === 'images'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>3. Images & Gallery ({currentProject.gallery?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('metrics')}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                  activeTab === 'metrics'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>4. Metrics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('caseStudy')}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors ${
                  activeTab === 'caseStudy'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>5. Case Study Details</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* TAB 1: BASIC & LINKS */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-mono block mb-1">
                        Project Title <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={currentProject.title || ''}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = currentProject.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                          setCurrentProject({ ...currentProject, title, slug });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-mono block mb-1">
                        Route Slug <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={currentProject.slug || ''}
                        onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-300 font-mono block mb-1">Category</label>
                      <select
                        value={currentProject.category || 'Full Stack'}
                        onChange={(e) =>
                          setCurrentProject({ ...currentProject, category: e.target.value as ProjectCategory })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Business System">Business System</option>
                        <option value="SaaS">SaaS</option>
                        <option value="AI / SaaS">AI / SaaS</option>
                        <option value="Developer Tool">Developer Tool</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-mono block mb-1">Badge Text (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Featured, Bakery & Cafe, MERN Stack"
                        value={currentProject.badgeText || ''}
                        onChange={(e) => setCurrentProject({ ...currentProject, badgeText: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-mono block mb-1">Homepage Featured</label>
                      <div className="pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={currentProject.featured || false}
                            onChange={(e) =>
                              setCurrentProject({ ...currentProject, featured: e.target.checked })
                            }
                            className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                          />
                          <span>Show in Featured Projects</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-slate-300 font-mono flex items-center gap-1.5 mb-1">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Live Demo URL</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={currentProject.liveUrl || ''}
                        onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-mono flex items-center gap-1.5 mb-1">
                        <Github className="w-3.5 h-3.5 text-slate-400" />
                        <span>GitHub Repository URL</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={currentProject.githubUrl || ''}
                        onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DESCRIPTIONS & STACK */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 font-mono block mb-1">
                      Short Summary Description (Displayed on Project Cards)
                    </label>
                    <textarea
                      rows={2}
                      value={currentProject.shortDescription || ''}
                      onChange={(e) =>
                        setCurrentProject({ ...currentProject, shortDescription: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono block mb-1">
                      Full In-Depth Description (Case Study Hero)
                    </label>
                    <textarea
                      rows={4}
                      value={currentProject.fullDescription || ''}
                      onChange={(e) =>
                        setCurrentProject({ ...currentProject, fullDescription: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono block mb-1">
                      Technologies (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, TypeScript, .NET Core, SQL Server, Tailwind CSS"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: IMAGES & GALLERY */}
              {activeTab === 'images' && (
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-cyan-400" />
                      <span>Project Screenshots & Gallery ({currentProject.gallery?.length || 0})</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">The COVER image is highlighted on cards</span>
                  </div>

                  {/* Upload Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        onChange={handleFilesUpload}
                        className="hidden"
                        id="project-file-upload-modal"
                      />
                      <label
                        htmlFor="project-file-upload-modal"
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isUploading ? 'Uploading & Optimizing...' : 'Upload Images from Device'}</span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Or paste Image URL..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Gallery Thumbnails */}
                  {currentProject.gallery && currentProject.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {currentProject.gallery.map((imgUrl, idx) => {
                        const isCover = currentProject.image === imgUrl || (!currentProject.image && idx === 0);
                        return (
                          <div
                            key={idx}
                            className={`relative rounded-xl overflow-hidden border p-1 bg-slate-950/80 group ${
                              isCover ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-white/10'
                            }`}
                          >
                            <img
                              src={imgUrl}
                              alt=""
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            {isCover && (
                              <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold shadow">
                                COVER
                              </span>
                            )}

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(imgUrl)}
                                  className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium"
                                  title="Set as Cover"
                                >
                                  Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="p-1 rounded bg-rose-600 hover:bg-rose-500 text-white"
                                title="Remove Image"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-white/10 rounded-xl">
                      No images added yet. Upload files from your device or paste an image URL.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: METRICS */}
              {activeTab === 'metrics' && (
                <div className="space-y-4">
                  <p className="text-slate-400 text-xs">
                    Configure high-impact metrics shown on the project case study (e.g. <code>Stations Supported: 50+</code>, <code>Uptime: 99.9%</code>).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[0, 1, 2].map((mIdx) => (
                      <div key={mIdx} className="p-3.5 rounded-xl bg-slate-900 border border-white/10 space-y-2">
                        <span className="font-mono text-cyan-400 text-[11px] font-bold">Metric {mIdx + 1}</span>
                        <div>
                          <label className="text-slate-400 text-[10px] block mb-0.5">Label</label>
                          <input
                            type="text"
                            placeholder="e.g. Booking Latency"
                            value={currentProject.metrics?.[mIdx]?.label || ''}
                            onChange={(e) => handleMetricChange(mIdx, 'label', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-[10px] block mb-0.5">Value</label>
                          <input
                            type="text"
                            placeholder="e.g. <120ms"
                            value={currentProject.metrics?.[mIdx]?.value || ''}
                            onChange={(e) => handleMetricChange(mIdx, 'value', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CASE STUDY DETAILS */}
              {activeTab === 'caseStudy' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-mono block mb-1">Problem Statement</label>
                      <textarea
                        rows={3}
                        placeholder="What specific problem was the client or product facing?"
                        value={currentProject.caseStudy?.problem || ''}
                        onChange={(e) => handleCaseStudyChange('problem', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-mono block mb-1">Business Requirement</label>
                      <textarea
                        rows={3}
                        placeholder="What were the core business objectives & functional requirements?"
                        value={currentProject.caseStudy?.businessRequirement || ''}
                        onChange={(e) => handleCaseStudyChange('businessRequirement', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-mono block mb-1">My Role & Responsibilities</label>
                      <textarea
                        rows={3}
                        placeholder="Lead Developer / Architect. Designed schemas, built UI..."
                        value={currentProject.caseStudy?.myRole || ''}
                        onChange={(e) => handleCaseStudyChange('myRole', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-mono block mb-1">Engineered Solution</label>
                      <textarea
                        rows={3}
                        placeholder="How was the solution implemented and delivered?"
                        value={currentProject.caseStudy?.solution || ''}
                        onChange={(e) => handleCaseStudyChange('solution', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-mono block mb-1">System Architecture</label>
                    <textarea
                      rows={2}
                      placeholder="React SPA <-> Express REST APIs <-> MongoDB Atlas with 2dsphere indexes"
                      value={currentProject.caseStudy?.architecture || ''}
                      onChange={(e) => handleCaseStudyChange('architecture', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Form Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const tabs: Array<'basic' | 'content' | 'images' | 'metrics' | 'caseStudy'> = ['basic', 'content', 'images', 'metrics', 'caseStudy'];
                      const currentIdx = tabs.indexOf(activeTab);
                      if (currentIdx > 0) setActiveTab(tabs[currentIdx - 1]);
                    }}
                    disabled={activeTab === 'basic'}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    ← Previous Tab
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const tabs: Array<'basic' | 'content' | 'images' | 'metrics' | 'caseStudy'> = ['basic', 'content', 'images', 'metrics', 'caseStudy'];
                      const currentIdx = tabs.indexOf(activeTab);
                      if (currentIdx < tabs.length - 1) setActiveTab(tabs[currentIdx + 1]);
                    }}
                    disabled={activeTab === 'caseStudy'}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    Next Tab →
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow-glow-sm flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Project</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0f20]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080c1a] border-b border-white/10 text-slate-400 font-mono uppercase">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Images</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((proj) => {
                const imgCount = proj.gallery?.length || (proj.image ? 1 : 0);
                const displayImg = proj.image || proj.gallery?.[0];
                return (
                  <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {displayImg && (
                          <img
                            src={displayImg}
                            alt=""
                            className="w-12 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                        )}
                        <div>
                          <span className="font-bold text-white block">{proj.title}</span>
                          <span className="text-[11px] font-mono text-slate-400">/{proj.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 font-mono text-[10px]">
                        {proj.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-400">
                      {imgCount} image{imgCount === 1 ? '' : 's'}
                    </td>
                    <td className="p-4">
                      {proj.featured ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono text-[10px]">—</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(proj)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
