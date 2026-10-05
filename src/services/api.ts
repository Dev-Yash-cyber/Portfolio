import { ContactInquiry, Project, BlogPost, Skill, DeveloperInfo } from '../types';
import { developerData } from '../data/portfolioData';
import { projectsData } from '../data/projectsData';
import { blogPostsData } from '../data/blogData';
import { skillsData } from '../data/skillsData';

// Local storage keys for resilient offline fallback
const API_URL = import.meta.env.VITE_API_URL ? (import.meta.env.VITE_API_URL as string).replace(/\/+$/, '') : '';

const STORAGE_KEYS = {
  INQUIRIES: 'yb_portfolio_inquiries',
  PROJECTS: 'yb_portfolio_projects',
  BLOG: 'yb_portfolio_blog',
  SKILLS: 'yb_portfolio_skills',
  SETTINGS: 'yb_portfolio_settings',
  AUTH_TOKEN: 'yb_admin_token',
};

// Initialize initial storage if empty
const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projectsData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG)) {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPostsData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillsData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(developerData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    const initialInquiries: ContactInquiry[] = [
      {
        id: 'inq-sample-1',
        name: 'Alex Mercer',
        email: 'alex.mercer@innovatetech.io',
        phone: '+1 415 555 2671',
        company: 'Innovate Tech Labs',
        projectType: 'SaaS Platform',
        budget: '$5,000 - $10,000',
        timeline: '1-2 Months',
        subject: 'Full-Stack React & .NET Core SaaS MVP Development',
        message: 'Hello Yash, we reviewed your portfolio and were impressed by your School Rojmel and ACOVOLT projects. We are looking to build a high-performance multi-tenant dashboard with .NET and React. Would love to schedule a quick call this week!',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'new',
      },
      {
        id: 'inq-sample-2',
        name: 'Priya Sharma',
        email: 'priya@apexfin.com',
        phone: '+91 98765 43210',
        company: 'Apex Financial Services',
        projectType: 'Business System',
        budget: '$3,000 - $5,000',
        timeline: 'Immediate',
        subject: 'Custom Accounting & Reporting System',
        message: 'Hi Yash, we need an automated ledger and daybook recording platform similar to your accounting ERP experience. Please let us know your availability for freelance collaboration.',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'read',
      }
    ];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialInquiries));
  }
};

initLocalStorage();

export const api = {
  // Inquiries
  async submitInquiry(data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): Promise<ContactInquiry> {
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {}

    const inquiries: ContactInquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
    const newInquiry: ContactInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  },

  async getInquiries(): Promise<ContactInquiry[]> {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const response = await fetch(`${API_URL}/api/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) return data;
      }
    } catch {}
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
  },

  async updateInquiryStatus(id: string, status: ContactInquiry['status']): Promise<void> {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      await fetch(`${API_URL}/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
    } catch {}

    const inquiries: ContactInquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  },

  async deleteInquiry(id: string): Promise<void> {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      await fetch(`${API_URL}/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}

    const inquiries: ContactInquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
    const filtered = inquiries.filter((inq) => inq.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(filtered));
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          try {
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
          } catch {}
          return data;
        }
      }
    } catch (err) {
      console.warn('Backend fetch projects warning:', err);
    }

    const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return projectsData;
  },

  async saveProject(project: Project): Promise<Project> {
    let projects: Project[] = [];
    try {
      const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      projects = local ? JSON.parse(local) : [...projectsData];
    } catch {
      projects = [...projectsData];
    }

    const existingIndex = projects.findIndex((p) => p.id === project.id || p.slug === project.slug);
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...projects[existingIndex], ...project };
    } else {
      projects.unshift(project);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage save quota warning:', e);
    }

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Backend save project warning:', err);
    }

    return project;
  },

  async deleteProject(id: string): Promise<void> {
    let projects: Project[] = [];
    try {
      const local = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      projects = local ? JSON.parse(local) : [...projectsData];
    } catch {
      projects = [...projectsData];
    }

    const filtered = projects.filter((p) => p.id !== id && p.slug !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
    } catch {}

    try {
      await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete project warning:', err);
    }
  },

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_URL}/api/blog`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          try {
            localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(data));
          } catch {}
          return data;
        }
      }
    } catch (err) {
      console.warn('Backend fetch blog warning:', err);
    }

    const local = localStorage.getItem(STORAGE_KEYS.BLOG);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return blogPostsData;
  },

  async saveBlogPost(post: BlogPost): Promise<BlogPost> {
    let posts: BlogPost[] = [];
    try {
      const local = localStorage.getItem(STORAGE_KEYS.BLOG);
      posts = local ? JSON.parse(local) : [...blogPostsData];
    } catch {
      posts = [...blogPostsData];
    }

    const index = posts.findIndex((p) => p.id === post.id || p.slug === post.slug);
    if (index >= 0) {
      posts[index] = { ...posts[index], ...post };
    } else {
      posts.unshift(post);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(posts));
    } catch (e) {
      console.warn('LocalStorage save quota warning:', e);
    }

    try {
      const response = await fetch(`${API_URL}/api/blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Backend save blog warning:', err);
    }

    return post;
  },

  async deleteBlogPost(id: string): Promise<void> {
    let posts: BlogPost[] = [];
    try {
      const local = localStorage.getItem(STORAGE_KEYS.BLOG);
      posts = local ? JSON.parse(local) : [...blogPostsData];
    } catch {
      posts = [...blogPostsData];
    }

    const filtered = posts.filter((p) => p.id !== id && p.slug !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(filtered));
    } catch {}

    try {
      await fetch(`${API_URL}/api/blog/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete blog warning:', err);
    }
  },

  // Settings
  async getSettings(): Promise<DeveloperInfo> {
    try {
      const response = await fetch(`${API_URL}/api/settings`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.name) {
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
          return data;
        }
      }
    } catch {}
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(developerData));
  },

  async updateSettings(settings: DeveloperInfo): Promise<DeveloperInfo> {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    try {
      await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
    } catch {}
    return settings;
  },

  // Newsletter
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) return await response.json();
    } catch {}

    const subscribers: string[] = JSON.parse(localStorage.getItem('yb_newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.unshift(email);
      localStorage.setItem('yb_newsletter_subscribers', JSON.stringify(subscribers));
    }
    return { success: true, message: 'Subscribed successfully!' };
  },
};
