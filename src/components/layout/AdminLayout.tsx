import React from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  BookOpen, 
  Mail, 
  Wrench, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070913] flex items-center justify-center text-slate-400">
        Loading Admin Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Blog CMS', path: '/admin/blog', icon: BookOpen },
    { name: 'Messages & Leads', path: '/admin/messages', icon: Mail },
    { name: 'Skills & Tech', path: '/admin/skills', icon: Wrench },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col justify-between p-4 bg-[#090d1a] border-r border-white/10">
        <div>
          {/* Header Monogram */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-glow-sm">
              <span className="font-mono text-sm">YB</span>
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Admin Portal
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Authenticated
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white font-semibold shadow-glow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 px-6 bg-[#090d1a]/80 border-b border-white/10 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-xs font-mono text-slate-400">
              Welcome back, <strong className="text-slate-200">{user?.name || 'Yash Barot'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
              ⚡ Production Panel
            </span>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="md:hidden p-4 bg-[#090d1a] border-b border-white/10 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Body Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
