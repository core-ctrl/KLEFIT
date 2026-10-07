'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { AuthState, User } from '@/lib/types';

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  permissions: [],
  roles: [],
};

interface AuthContextType extends AuthState {
  login: (user: User, permissions: string[], roles: string[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  const login = (user: User, permissions: string[], roles: string[]) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
      permissions,
      roles,
    });
  };

  const logout = () => {
    setAuthState(defaultAuthState);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
