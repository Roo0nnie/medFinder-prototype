"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import type { User } from "@/lib/types";
import { initialUsers } from "@/lib/data/users";

interface UsersContextValue {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  removeUser: (id: string) => void;
  findUserByEmail: (email: string) => User | undefined;
}

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = useCallback((user: User) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
  }, []);

  const removeUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const findUserByEmail = useCallback(
    (email: string) =>
      users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
    [users]
  );

  return (
    <UsersContext.Provider
      value={{ users, addUser, updateUser, removeUser, findUserByEmail }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used within UsersProvider");
  return ctx;
}
