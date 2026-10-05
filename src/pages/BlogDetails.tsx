import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Check, 
  Tag, 
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Maximize2,
  X
} from 'lucide-react';
import { blogPostsData } from '../data/blogData';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { updateSEO } from '../utils/seo';
import { useToast } from '../contexts/ToastContext';
import { CtaBanner } from '../components/sections/CtaBanner';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [allPosts, setAllPosts] = useState<BlogPost[]>(blogPostsData);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { success } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await api.getBlogPosts();
      setAllPosts(data);
      const found = data.find((p) => p.slug === slug) || null;
      setPost(found);
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      updateSEO({
        title: `${post.title} | Technical Blog`,
        description: post.excerpt,
        ogImage: post.coverImage,
        canonicalUrl: `https://yashbarot.dev/blog/${post.slug}`,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-400 light:text-slate-600 text-sm mb-6">The requested article could not be found.</p>
        <Link
          to="/blog"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Article link copied to clipboard!');
  };

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);
  const galleryImages = post.images && post.images.length > 0 ? post.images : (post.coverImage ? [post.coverImage] : []);

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {post.category}
            </span>
            <span className="text-xs font-mono text-slate-400 light:text-slate-500">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 light:text-slate-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Author and Date Bar */}
          <div className="flex items-center justify-between gap-4 py-4 border-y border-white/10 light:border-slate-200 text-xs text-slate-400 light:text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white font-mono text-sm shadow-md">
                YB
              </div>
              <div>
                <span className="font-bold text-white light:text-slate-900 block">
                  {post.author.name}
                </span>
                <span className="text-[11px] text-slate-400 light:text-slate-500">
                  {post.author.role} • Published on {post.publishedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white transition-colors flex items-center gap-1.5"
                title="Share article"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 light:border-slate-200 shadow-2xl mb-12 max-h-[450px] relative group">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setSelectedImage(post.coverImage)}
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur text-white flex items-center gap-1.5 text-xs font-mono opacity-80 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>
        </div>

        {/* Article Body Content */}
        <div className="text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed space-y-6 mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl shadow-lg">
            <div className="whitespace-pre-line font-sans leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>

        {/* Multi-Image Gallery section if multiple images uploaded */}
        {galleryImages.length > 1 && (
          <div className="mb-14 p-6 rounded-2xl bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 light:text-slate-600 font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Article Visuals & Architecture Diagrams ({galleryImages.length})</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className="relative rounded-xl overflow-hidden border border-white/10 light:border-slate-200 group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Article visual ${i + 1}`}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-12 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 light:text-slate-500 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Tags:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/10 light:border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-white/10 light:border-slate-200">
            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-6">
              More Technical Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/10 light:border-slate-200 hover:border-blue-500/40 transition-all group"
                >
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-white light:text-slate-900 group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <CtaBanner />
        </div>
      </div>
    </article>
  );
};
