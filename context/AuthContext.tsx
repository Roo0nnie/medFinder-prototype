"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { getStoredUser, setStoredUser } from "@/lib/auth/authUtils";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, users: User[]) => User | null;
  register: (email: string, password: string, name: string, role: "owner" | "customer", users: User[]) => User | null;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const login = useCallback((email: string, password: string, users: User[]) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      const userToStore = { ...found };
      setUser(userToStore);
      setStoredUser(userToStore);
      return found;
    }
    return null;
  }, []);

  const register = useCallback(
    (
      email: string,
      password: string,
      name: string,
      role: "owner" | "customer",
      users: User[]
    ) => {
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) return null;
      const newUser: User = {
        id: `${role}-${Date.now()}`,
        email,
        password,
        name,
        role,
      };
      const userToStore = { ...newUser };
      setUser(userToStore);
      setStoredUser(userToStore);
      return newUser;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setStoredUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
