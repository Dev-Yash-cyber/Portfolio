import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('byash140@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const ok = await login(email, password);
    setIsLoading(false);

    if (ok) {
      success('Welcome to Admin Portal!');
      navigate(from, { replace: true });
    } else {
      error('Invalid administrator credentials. Please check your email/password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-[#0a0f20]/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-glow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-1">
            Admin Authentication
          </h1>
          <p className="text-xs text-center text-slate-400 mb-8">
            Access developer dashboard, inquiries, blog CMS, and settings.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-glow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 text-center">
            Secured with JWT Session Management & Rate Limiting
          </div>
        </div>
      </div>
    </div>
  );
};
