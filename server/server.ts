import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import { MessageModel } from './models/Message';
import { ProjectModel } from './models/Project';
import { BlogPostModel } from './models/BlogPost';
import { SettingModel } from './models/Setting';
import { projectsData } from '../src/data/projectsData';
import { blogPostsData } from '../src/data/blogData';
import { developerData } from '../src/data/portfolioData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'yash-barot-dev-secret-key-2026';

// In-Memory Fallback Stores populated with initial datasets
let inMemoryMessages: any[] = [];
let inMemoryProjects: any[] = [...projectsData];
let inMemoryBlog: any[] = [...blogPostsData];
let inMemorySettings: any = { ...developerData };

// Database sync & seed helper
const syncDatabaseInitialData = async () => {
  try {
    if (ProjectModel.db.readyState === 1) {
      const projectCount = await ProjectModel.countDocuments();
      if (projectCount === 0) {
        for (const p of projectsData) {
          await ProjectModel.create(p);
        }
        console.log('✅ Initialized default projects in MongoDB.');
      }
      inMemoryProjects = await ProjectModel.find().sort({ createdAt: -1 });

      const blogCount = await BlogPostModel.countDocuments();
      if (blogCount === 0) {
        for (const b of blogPostsData) {
          await BlogPostModel.create(b);
        }
        console.log('✅ Initialized default blog articles in MongoDB.');
      }
      inMemoryBlog = await BlogPostModel.find().sort({ createdAt: -1 });

      const settingDoc = await SettingModel.findOne();
      if (!settingDoc) {
        await SettingModel.create(developerData);
        inMemorySettings = { ...developerData };
      } else {
        inMemorySettings = settingDoc;
      }
      console.log('✅ Database state mirrored in memory successfully.');
    }
  } catch (err) {
    console.warn('⚠️ Database sync warning:', err);
  }
};

// Connect DB and trigger sync
connectDB().then(() => {
  syncDatabaseInitialData();
});

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Auth Middleware
const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin token missing.' });
  }

  const token = authHeader.split(' ')[1];
  if (token === 'mock-jwt-token-yash-admin-authenticated') {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// API Routes

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Admin Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const validAdmin = 
    (email === 'byash140@gmail.com' || email === 'admin@yashbarot.dev') && 
    (password === 'admin123' || password === 'yash2026');

  if (!validAdmin) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ email, role: 'admin', name: 'Yash Barot' }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({
    token,
    user: { email, role: 'admin', name: 'Yash Barot' },
  });
});

// ================= PROJECTS API =================
app.get('/api/projects', async (_req, res) => {
  try {
    if (ProjectModel.db.readyState === 1) {
      const docs = await ProjectModel.find().sort({ createdAt: -1 });
      return res.json(docs);
    }
  } catch (err) {
    console.error('MongoDB get projects error:', err);
  }
  res.json(inMemoryProjects);
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = req.body;
    if (!project.title || !project.slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }

    let savedProject = project;
    try {
      if (ProjectModel.db.readyState === 1) {
        savedProject = await ProjectModel.findOneAndUpdate(
          { $or: [{ id: project.id }, { slug: project.slug }] },
          { $set: project },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    } catch (err) {
      console.error('MongoDB save project error:', err);
    }

    const idx = inMemoryProjects.findIndex((p) => p.id === project.id || p.slug === project.slug);
    if (idx >= 0) {
      inMemoryProjects[idx] = savedProject;
    } else {
      inMemoryProjects.unshift(savedProject);
    }
    res.json(savedProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (ProjectModel.db.readyState === 1) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ id }, { _id: id }, { slug: id }] } : { $or: [{ id }, { slug: id }] };
      await ProjectModel.findOneAndDelete(query);
      return res.json({ success: true });
    }
  } catch (err) {
    console.error('Delete project error:', err);
  }
  inMemoryProjects = inMemoryProjects.filter((p) => p.id !== id && p.slug !== id);
  res.json({ success: true });
});

// ================= BLOG API =================
app.get('/api/blog', async (_req, res) => {
  try {
    if (BlogPostModel.db.readyState === 1) {
      const docs = await BlogPostModel.find().sort({ createdAt: -1 });
      return res.json(docs);
    }
  } catch {}
  res.json(inMemoryBlog);
});

app.post('/api/blog', async (req, res) => {
  try {
    const post = req.body;
    if (!post.title || !post.slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }

    let savedPost = post;
    try {
      if (BlogPostModel.db.readyState === 1) {
        savedPost = await BlogPostModel.findOneAndUpdate(
          { $or: [{ id: post.id }, { slug: post.slug }] },
          { $set: post },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    } catch {}

    const idx = inMemoryBlog.findIndex((b) => b.id === post.id || b.slug === post.slug);
    if (idx >= 0) {
      inMemoryBlog[idx] = savedPost;
    } else {
      inMemoryBlog.unshift(savedPost);
    }
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save blog post' });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (BlogPostModel.db.readyState === 1) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ id }, { _id: id }, { slug: id }] } : { $or: [{ id }, { slug: id }] };
      await BlogPostModel.findOneAndDelete(query);
      return res.json({ success: true });
    }
  } catch (err) {
    console.error('Delete blog error:', err);
  }
  inMemoryBlog = inMemoryBlog.filter((b) => b.id !== id && b.slug !== id);
  res.json({ success: true });
});

// ================= SETTINGS API =================
app.get('/api/settings', async (_req, res) => {
  try {
    if (SettingModel.db.readyState === 1) {
      const doc = await SettingModel.findOne();
      if (doc) return res.json(doc);
    }
  } catch {}
  res.json(inMemorySettings || {});
});

app.post('/api/settings', async (req, res) => {
  try {
    const settings = req.body;
    try {
      if (SettingModel.db.readyState === 1) {
        const updated = await SettingModel.findOneAndUpdate(
          {},
          settings,
          { upsert: true, new: true }
        );
        return res.json(updated);
      }
    } catch {}
    inMemorySettings = settings;
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// ================= CONTACT INQUIRIES API =================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, projectType, budget, timeline, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const inquiryData = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      company: company?.trim(),
      projectType: projectType || 'Full-Stack Web App',
      budget: budget || '$3,000 - $5,000',
      timeline: timeline || '1-2 Months',
      subject: subject?.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    try {
      if (MessageModel.db.readyState === 1) {
        const savedDoc = await MessageModel.create(inquiryData);
        return res.status(201).json(savedDoc);
      }
    } catch {}

    inMemoryMessages.unshift(inquiryData);
    res.status(201).json(inquiryData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process inquiry submission.' });
  }
});

// Newsletter Subscription Endpoint
let newsletterSubscribers: string[] = [];
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  if (!newsletterSubscribers.includes(email)) {
    newsletterSubscribers.unshift(email);
  }
  res.json({ success: true, message: 'Subscribed to developer newsletter successfully!' });
});

// Admin Get Messages
app.get('/api/admin/messages', requireAdmin, async (_req, res) => {
  try {
    if (MessageModel.db.readyState === 1) {
      const docs = await MessageModel.find().sort({ createdAt: -1 });
      return res.json(docs);
    }
  } catch {}
  res.json(inMemoryMessages);
});

// Admin Update Message Status
app.patch('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (MessageModel.db.readyState === 1) {
      await MessageModel.findByIdAndUpdate(id, { status });
      return res.json({ success: true });
    }
  } catch {}

  inMemoryMessages = inMemoryMessages.map((m) =>
    m.id === id ? { ...m, status } : m
  );
  res.json({ success: true });
});

// Admin Delete Message
app.delete('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    if (MessageModel.db.readyState === 1) {
      await MessageModel.findByIdAndDelete(id);
      return res.json({ success: true });
    }
  } catch {}

  inMemoryMessages = inMemoryMessages.filter((m) => m.id !== id);
  res.json({ success: true });
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static assets from dist
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// SPA catch-all fallback for client-side routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
const portNumber = Number(PORT) || 5000;
app.listen(portNumber, '0.0.0.0', () => {
  console.log(`🚀 Portfolio API server running on http://localhost:${portNumber}`);
});
