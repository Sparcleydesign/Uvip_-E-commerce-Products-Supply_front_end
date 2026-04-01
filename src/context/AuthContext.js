'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoredUser, clearSession, hasSession, saveUser } from '@/lib/api';
import { getProfile, logoutUser as apiLogout } from '@/lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only call the API if we know a session cookie was set (flag in localStorage).
    // Without this guard, getProfile() fires on the login page → 401 → loop.
    if (!hasSession()) {
      setLoading(false);
      return;
    }

    // Show cached user instantly while we verify with server
    const cached = getStoredUser();
    if (cached) setUserState(cached);

    getProfile()
      .then((profile) => {
        setUserState(profile);
        saveUser(profile);
      })
      .catch(() => {
        // Token invalid/expired — clear everything silently
        clearSession();
        setUserState(null);
      })
      .finally(() => setLoading(false));
  }, []); // runs once on mount only

  const setUser = useCallback((userData) => {
    setUserState(userData);
    if (userData) saveUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
