import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Mail, 
  BookOpen, 
  Wrench, 
  ArrowRight, 
  TrendingUp, 
  Plus, 
  Clock, 
  Sparkles,
  Users,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { api } from '../../services/api';
import { ContactInquiry, Project, BlogPost } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [inqData, projData, blogData] = await Promise.all([
        api.getInquiries(),
        api.getProjects(),
        api.getBlogPosts(),
      ]);
      setInquiries(inqData);
      setProjects(projData);
      setPosts(blogData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const unreadInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white light:text-slate-900">
            Developer Overview Dashboard
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
            Monitor incoming leads, project showcases, blog CMS, and site metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Total Projects</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white light:text-slate-900">
            {projects.length}
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" />
            {projects.filter((p) => p.featured).length} Featured on Homepage
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Project Leads</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white light:text-slate-900">
            {inquiries.length}
          </div>
          <span className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1">
            <Sparkles className="w-3 h-3" />
            {unreadInquiries} New Unread Messages
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Blog Articles</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white light:text-slate-900">
            {posts.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Published Technical Notes
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Profile Status</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold text-emerald-400">
            Open for Work
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Available for Freelance
          </span>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="rounded-2xl p-6 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-white light:text-slate-900">
              Recent Project Inquiries
            </h2>
            <p className="text-xs text-slate-400">Latest messages sent via contact form</p>
          </div>

          <Link
            to="/admin/messages"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>View All ({inquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No inquiries received yet.
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-white light:text-slate-900">{inq.name}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-blue-400">{inq.email}</span>
                    {inq.status === 'new' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{inq.subject || inq.message}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-slate-500">
                  <span>{inq.budget || 'Custom Budget'}</span>
                  <Link
                    to="/admin/messages"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
