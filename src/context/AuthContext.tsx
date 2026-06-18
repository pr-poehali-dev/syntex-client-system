import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  license: { plan: string; expiresAt: string | null } | null;
  hwid: string;
  balance: number;
}

const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 1,
    username: 'IIpoteka',
    email: 'iipoteka@syntex.gg',
    password: 'zxcursed',
    role: 'admin',
    license: { plan: 'Навсегда', expiresAt: null },
    hwid: 'A1B2-C3D4-E5F6-7890',
    balance: 0,
  },
  {
    id: 2,
    username: 'testuser',
    email: 'test@syntex.gg',
    password: 'password',
    role: 'user',
    license: { plan: '90 дней', expiresAt: '2026-09-18' },
    hwid: 'F1E2-D3C4-B5A6-1234',
    balance: 250,
  },
];

interface AuthCtx {
  user: User | null;
  login: (username: string, password: string) => string | null;
  register: (username: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): string | null => {
    const found = MOCK_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (!found) return 'Неверный логин или пароль';
    const { password: _p, ...rest } = found;
    setUser(rest);
    return null;
  };

  const register = (username: string, email: string, password: string): string | null => {
    const exists = MOCK_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return 'Пользователь с таким логином или почтой уже существует';
    if (password.length < 6) return 'Пароль должен быть минимум 6 символов';
    const newUser: User = {
      id: Date.now(),
      username,
      email,
      role: 'user',
      license: null,
      hwid: '',
      balance: 0,
    };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    return null;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
