import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  email: string;
  role: 'admin';
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('yb_admin_user');
    const token = localStorage.getItem('yb_admin_token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('yb_admin_user');
        localStorage.removeItem('yb_admin_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Check backend first if available
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        const authedUser: AuthUser = { email: data.user.email, role: 'admin', name: data.user.name || 'Yash Barot' };
        localStorage.setItem('yb_admin_token', data.token);
        localStorage.setItem('yb_admin_user', JSON.stringify(authedUser));
        setUser(authedUser);
        return true;
      }
    } catch {
      // Backend not running, use client-side credentials
    }

    // Default admin credential fallback
    if (
      (email.toLowerCase() === 'admin@yashbarot.dev' || email.toLowerCase() === 'byash140@gmail.com') &&
      (pass === 'admin123' || pass === 'yash2026')
    ) {
      const authedUser: AuthUser = { email, role: 'admin', name: 'Yash Barot' };
      localStorage.setItem('yb_admin_token', 'mock-jwt-token-yash-admin-authenticated');
      localStorage.setItem('yb_admin_user', JSON.stringify(authedUser));
      setUser(authedUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('yb_admin_token');
    localStorage.removeItem('yb_admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
