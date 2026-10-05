import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Search, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Mail, 
  Send, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Code2,
  CheckCircle2,
  X,
  FolderOpen
} from 'lucide-react';
import { blogPostsData } from '../data/blogData';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { useToast } from '../contexts/ToastContext';
import { updateSEO } from '../utils/seo';

const POSTS_PER_PAGE = 6;

export const Blog: React.FC = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(blogPostsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const postsGridRef = useRef<HTMLDivElement | null>(null);
  const { success, error } = useToast();

  useEffect(() => {
    updateSEO({
      title: 'Blog & Technical Developer Insights | Yash Barot',
      description: 'Thoughts, tutorials and developer insights on React, .NET Core, Clean Architecture, SQL Server, and AI by Yash Barot.',
      canonicalUrl: 'https://yashbarot.dev/blog',
    });

    const loadPosts = async () => {
      const data = await api.getBlogPosts();
      if (data && data.length > 0) {
        setAllPosts(data);
      }
    };
    loadPosts();
  }, []);

  // Compute accurate dynamic category counts from all posts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allPosts.length };
    allPosts.forEach((post) => {
      const cat = post.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allPosts]);

  // Generate dynamic category list with actual counts
  const categoriesList = useMemo(() => {
    const baseCategories = ['All', 'React', '.NET', 'Backend', 'Database', 'Tools', 'Career', 'Projects', 'AI'];
    const allCategories = Array.from(new Set([...baseCategories, ...allPosts.map((p) => p.category)]));
    return allCategories
      .filter((cat) => cat === 'All' || (categoryCounts[cat] && categoryCounts[cat] > 0))
      .map((cat) => ({
        label: cat === 'All' ? 'All Posts' : cat,
        value: cat,
        count: categoryCounts[cat] || 0,
      }));
  }, [allPosts, categoryCounts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (postsGridRef.current) {
      postsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate pagination buttons with ellipsis
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // Popular posts for sidebar
  const popularPosts = useMemo(() => {
    return allPosts.filter((p) => p.featured).slice(0, 4).length > 0
      ? allPosts.filter((p) => p.featured).slice(0, 4)
      : allPosts.slice(0, 4);
  }, [allPosts]);

  // Working Newsletter Submit
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailRegex.test(newsletterEmail)) {
      error('Please provide a valid email address.');
      return;
    }

    setIsSubscribing(true);
    try {
      await api.subscribeNewsletter(newsletterEmail.trim());
      setIsSubscribed(true);
      success('🎉 Awesome! You are now subscribed to technical articles & tutorials.');
      setNewsletterEmail('');
    } catch {
      error('Subscription could not be completed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="pt-8 pb-20 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold mb-2 block">
              BLOG & INSIGHTS
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Thoughts, Tutorials & <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Developer Insights
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              I share practical engineering tutorials, architecture patterns, and lessons learned building scalable digital products across React, .NET Core, SQL Server, and Cloud systems.
            </p>
          </div>

          {/* Side Callout */}
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-[#090d1a] border border-white/10 p-5 font-mono text-xs text-slate-300 shadow-xl space-y-1 max-w-sm">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Write • Build • Share • Grow</span>
              </div>
              <p className="text-[11px] text-slate-400">Good code, good ideas, better products</p>
              <div className="pt-2 text-[11px] text-purple-300 italic border-t border-white/5">
                "Sharing what I learn today, to build a better tomorrow."
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills Bar with Accurate Counts */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-white/10">
          {categoriesList.map((cat) => {
            const active = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  active
                    ? 'bg-blue-600 text-white font-bold shadow-glow-sm scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  active ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Notice Banner */}
        <AnimatePresence>
          {(searchQuery || selectedCategory !== 'All') && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs"
            >
              <div className="flex items-center gap-2 flex-wrap text-slate-300">
                <span className="text-slate-400 font-mono">Active Filter:</span>
                {selectedCategory !== 'All' && (
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-300 font-mono">
                    Category: {selectedCategory}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2.5 py-1 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 font-mono">
                    Search: "{searchQuery}"
                  </span>
                )}
                <span className="text-slate-400">
                  (Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'})
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white font-mono hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16" ref={postsGridRef}>
          {/* Left Column: Articles Grid + Real Working Pagination */}
          <div className="lg:col-span-8">
            {filteredPosts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#0a0f20]/80 border border-white/10 space-y-4">
                <FolderOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Articles Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  No blog posts match your selected criteria. Try selecting another category or clearing your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-glow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {paginatedPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group rounded-2xl bg-[#0a0f20]/90 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-44 overflow-hidden bg-slate-950">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-600/90 text-white backdrop-blur-md shadow">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-5">
                          <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>

                          <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-600" />
                              {post.publishedAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-600" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 pt-0">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Real Working Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <span className="text-xs font-mono text-slate-400">
                      Showing Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong> ({filteredPosts.length} total posts)
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-xl border border-white/10 transition-colors ${
                          currentPage === 1
                            ? 'bg-slate-900/40 text-slate-600 cursor-not-allowed'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                        title="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {getPaginationNumbers().map((p, idx) => {
                        if (p === '...') {
                          return (
                            <span key={`ellipsis-${idx}`} className="px-2 text-slate-500 font-mono text-xs">
                              ...
                            </span>
                          );
                        }

                        const pageNum = Number(p);
                        const isCurrent = pageNum === currentPage;

                        return (
                          <button
                            key={`page-${pageNum}`}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-glow-sm scale-105'
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/5'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-xl border border-white/10 transition-colors ${
                          currentPage === totalPages
                            ? 'bg-slate-900/40 text-slate-600 cursor-not-allowed'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                        title="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column: Interactive Sidebar (Without Tags Card) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by title, topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0a0f20]/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Categories Count Box with Real Dynamic Counts */}
            <div className="p-6 rounded-3xl bg-[#0a0f20]/90 border border-white/10 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                <span>Categories</span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">{categoriesList.length} Total</span>
              </h3>
              <div className="space-y-1.5">
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left ${
                        isSelected
                          ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Featured Posts */}
            <div className="p-6 rounded-3xl bg-[#0a0f20]/90 border border-white/10 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Popular Posts</span>
              </h3>
              <div className="space-y-3.5">
                {popularPosts.map((pop) => (
                  <Link
                    key={pop.id}
                    to={`/blog/${pop.slug}`}
                    className="flex items-center gap-3 group p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
                  >
                    <img
                      src={pop.coverImage}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-900 border border-white/5"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        {pop.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500">{pop.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Fully Functional Newsletter Subscription Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-blue-500/40 shadow-glow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Developer Newsletter</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Get the latest articles, tutorials, and practical developer insights directly in your inbox.
              </p>

              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs text-center space-y-1 animate-in zoom-in-95">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                  <span className="font-bold block">You are Subscribed!</span>
                  <span className="text-[11px] text-emerald-400/80 block">
                    You will receive new technical tutorials and updates as soon as they publish.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <span>{isSubscribing ? 'Subscribing...' : 'Subscribe Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-slate-400 mt-2 block text-center">
                    🔒 No spam. Strictly engineering insights. Unsubscribe anytime.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold block mb-1">
              LET'S LEARN TOGETHER
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Have a Topic in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              I'm always open to writing about new technologies, architectural patterns, and troubleshooting guides. Let me know what you'd like to see next!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <span>Suggest a Topic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>View All Posts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
