import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    coverImage: { type: String },
    images: [{ type: String }],
    category: { type: String, default: '.NET' },
    tags: [{ type: String }],
    readTime: { type: String, default: '5 min read' },
    publishedAt: { type: String },
    featured: { type: Boolean, default: false },
    author: {
      name: { type: String, default: 'Yash Barot' },
      role: { type: String, default: 'Full-Stack Developer' },
      avatar: { type: String },
    }
  },
  { timestamps: true, strict: false }
);

export const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);
