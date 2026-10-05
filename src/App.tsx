import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Services } from './pages/Services';
import { Journey } from './pages/Journey';
import { Blog } from './pages/Blog';
import { BlogDetails } from './pages/BlogDetails';
import { Resume } from './pages/Resume';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminSettings } from './pages/admin/AdminSettings';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes Wrapped in Main Layout */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/skills" element={<Layout><Skills /></Layout>} />
              <Route path="/experience" element={<Layout><Experience /></Layout>} />
              <Route path="/projects" element={<Layout><Projects /></Layout>} />
              <Route path="/projects/:slug" element={<Layout><ProjectDetails /></Layout>} />
              <Route path="/services" element={<Layout><Services /></Layout>} />
              <Route path="/journey" element={<Layout><Journey /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/blog/:slug" element={<Layout><BlogDetails /></Layout>} />
              <Route path="/resume" element={<Layout><Resume /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
              <Route path="/admin/blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
              <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
              <Route path="/admin/skills" element={<AdminLayout><AdminSkills /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

              {/* Catch-all 404 */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
