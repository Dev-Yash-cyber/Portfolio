import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  BookOpen, 
  X, 
  Search, 
  Calendar, 
  Clock, 
  Upload, 
  Image as ImageIcon,
  Copy,
  Code,
  CheckCircle2
} from 'lucide-react';
import { api } from '../../services/api';
import { BlogPost } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { compressImage } from '../../utils/imageCompressor';

export const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '.NET',
    tags: [],
    readTime: '5 min read',
    coverImage: '',
    images: [],
    publishedAt: new Date().toISOString().split('T')[0],
  });
  const [tagInput, setTagInput] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { success, error } = useToast();

  const loadPosts = async () => {
    const data = await api.getBlogPosts();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleEdit = (p: BlogPost) => {
    const existingImages = p.images && p.images.length > 0 ? p.images : (p.coverImage ? [p.coverImage] : []);
    setCurrentPost({
      ...p,
      coverImage: p.coverImage || existingImages[0] || '',
      images: existingImages,
    });
    setTagInput(p.tags.join(', '));
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    const defaultCover = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    setCurrentPost({
      id: `post-${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      content: '## Introduction\n\nWrite your technical article here...\n\n### Key Concepts\n- Point 1\n- Point 2\n\n```csharp\npublic class Solution {\n    // Code snippet\n}\n```',
      category: '.NET',
      tags: ['.NET Core', 'Architecture'],
      readTime: '5 min read',
      coverImage: defaultCover,
      images: [defaultCover],
      publishedAt: new Date().toISOString().split('T')[0],
      author: {
        name: 'Yash Barot',
        role: 'Full-Stack Developer',
        avatar: '',
      },
    });
    setTagInput('.NET Core, Architecture');
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
        setCurrentPost((prev) => {
          const prevImages = (prev.images && prev.images.length > 0)
            ? prev.images
            : (prev.coverImage ? [prev.coverImage] : []);
          const updatedImages = [...prevImages, ...newImages];
          const cover = prev.coverImage || updatedImages[0] || '';
          return {
            ...prev,
            coverImage: cover,
            images: updatedImages,
          };
        });
        success(`Added ${newImages.length} image(s) to blog post.`);
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
    const updatedImages = [...(currentPost.images || []), url];
    const cover = currentPost.coverImage || url;
    setCurrentPost({
      ...currentPost,
      coverImage: cover,
      images: updatedImages,
    });
    setCustomImageUrl('');
    success('Image URL added to article gallery.');
  };

  const handleSetCover = (imgUrl: string) => {
    setCurrentPost({ ...currentPost, coverImage: imgUrl });
    success('Cover image updated.');
  };

  const handleInsertIntoMarkdown = (imgUrl: string) => {
    const mdTag = `\n\n![Article Illustration](${imgUrl})\n\n`;
    const textarea = contentTextareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;
      const text = currentPost.content || '';
      const newText = text.substring(0, start) + mdTag + text.substring(end);
      setCurrentPost({ ...currentPost, content: newText });
    } else {
      setCurrentPost({
        ...currentPost,
        content: (currentPost.content || '') + mdTag,
      });
    }
    success('Image markdown inserted into article content!');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const images = currentPost.images || [];
    const removedImg = images[indexToRemove];
    const updatedImages = images.filter((_, idx) => idx !== indexToRemove);
    let newCover = currentPost.coverImage;
    if (newCover === removedImg) {
      newCover = updatedImages[0] || '';
    }
    setCurrentPost({
      ...currentPost,
      coverImage: newCover,
      images: updatedImages,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setPosts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      await api.deleteBlogPost(id);
      success('Article deleted successfully.');
      loadPosts();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost.title || !currentPost.slug) {
      error('Title and slug are required.');
      return;
    }

    const tagsArray = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const images = currentPost.images && currentPost.images.length > 0
      ? currentPost.images
      : [currentPost.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'];

    const postToSave: BlogPost = {
      ...(currentPost as BlogPost),
      tags: tagsArray,
      coverImage: currentPost.coverImage || images[0],
      images: images,
      author: currentPost.author || {
        name: 'Yash Barot',
        role: 'Full-Stack Developer',
        avatar: '',
      },
    };

    await api.saveBlogPost(postToSave);
    success('Article published/updated successfully!');
    setIsEditing(false);
    loadPosts();
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white light:text-slate-900">Blog & Technical CMS</h1>
          <p className="text-xs text-slate-400 light:text-slate-600">
            Write, edit, and publish technical articles with multiple image uploads and markdown embeds.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Edit / Create Form Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1021] light:bg-white border border-white/10 light:border-slate-300 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 light:border-slate-200">
              <h2 className="text-lg font-bold text-white light:text-slate-900">
                {currentPost.id ? 'Edit Article' : 'Write New Article'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white light:hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">
                    Article Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentPost.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      setCurrentPost({ ...currentPost, title, slug });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">
                    Route Slug <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentPost.slug || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">Category</label>
                  <select
                    value={currentPost.category || '.NET'}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value=".NET">.NET</option>
                    <option value="React">React</option>
                    <option value="Database">Database</option>
                    <option value="Architecture">Architecture</option>
                    <option value="AI">AI</option>
                    <option value="Tutorials">Tutorials</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={currentPost.readTime || '5 min read'}
                    onChange={(e) => setCurrentPost({ ...currentPost, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={currentPost.publishedAt || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, publishedAt: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  value={currentPost.excerpt || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 light:text-slate-700 font-mono block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder=".NET Core, Clean Architecture, SQL Server"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Multiple Image Upload & Gallery Manager */}
              <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-white/10 light:border-slate-300 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white light:text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-cyan-400" />
                    <span>Article Images & Diagrams ({currentPost.images?.length || 0})</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Upload screenshots, code flowcharts, or architecture diagrams
                  </span>
                </div>

                {/* Upload Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload from PC */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleFilesUpload}
                      className="hidden"
                      id="blog-file-upload"
                    />
                    <label
                      htmlFor="blog-file-upload"
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 light:text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isUploading ? 'Uploading & Optimizing...' : 'Upload Images from Device'}</span>
                    </label>
                  </div>

                  {/* Add URL */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Or paste Image URL..."
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 light:bg-white border border-white/10 light:border-slate-300 text-white light:text-slate-900 text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 light:bg-slate-200 text-slate-200 light:text-slate-800 font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Images Preview Thumbnails */}
                {currentPost.images && currentPost.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {currentPost.images.map((imgUrl, idx) => {
                      const isCover = currentPost.coverImage === imgUrl;
                      return (
                        <div
                          key={idx}
                          className={`relative rounded-xl overflow-hidden border p-1 bg-slate-950/80 light:bg-slate-100 group ${
                            isCover ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-white/10 light:border-slate-300'
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

                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                            <div className="flex items-center gap-1">
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(imgUrl)}
                                  className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium"
                                  title="Set as Cover Image"
                                >
                                  Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleInsertIntoMarkdown(imgUrl)}
                                className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-medium flex items-center gap-1"
                                title="Insert into Markdown text"
                              >
                                <Code className="w-3 h-3" />
                                <span>Insert</span>
                              </button>
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
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 light:text-slate-700 font-mono">
                    Article Markdown Content
                  </label>
                  <span className="text-[10px] text-slate-400">Use "Insert" button above to paste image links</span>
                </div>
                <textarea
                  ref={contentTextareaRef}
                  rows={12}
                  value={currentPost.content || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 font-mono text-xs rounded-xl bg-slate-900/90 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 light:border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow-glow-sm"
                >
                  Publish Article
                </button>
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
          placeholder="Search articles by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 light:bg-white border border-white/10 light:border-slate-300 text-xs text-white light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Articles Table */}
      <div className="rounded-2xl border border-white/10 light:border-slate-300 bg-[#0a0f20]/90 light:bg-white overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080c1a] light:bg-slate-100 border-b border-white/10 light:border-slate-300 text-slate-400 light:text-slate-600 font-mono uppercase">
              <tr>
                <th className="p-4">Cover & Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Images</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 light:divide-slate-200 text-slate-300 light:text-slate-700">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/40 light:hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-12 h-10 object-cover rounded-lg border border-white/10 light:border-slate-200"
                        />
                      )}
                      <div>
                        <span className="font-bold text-white light:text-slate-900 block">{post.title}</span>
                        <span className="text-[11px] font-mono text-slate-400 light:text-slate-500">/blog/{post.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 light:bg-blue-50 text-blue-300 light:text-blue-700 font-mono text-[10px]">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400 light:text-slate-600">
                    {post.images?.length || (post.coverImage ? 1 : 0)} img
                  </td>
                  <td className="p-4 font-mono text-slate-400 light:text-slate-600">
                    {post.publishedAt} • {post.readTime}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 light:bg-rose-50 light:hover:bg-rose-100 text-rose-400 light:text-rose-600"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
