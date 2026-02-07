"use client";

import React, { useState, useEffect } from "react";
import type { User } from "@/lib/types";
import type { Store } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface UserFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  role: "owner" | "staff";
  user?: User | null;
  stores?: Store[];
  onSave: (data: { name: string; email: string; password?: string; storeId?: string }) => void;
  onCancel: () => void;
}

export function UserFormModal({
  open,
  mode,
  role,
  user,
  stores = [],
  onSave,
  onCancel,
}: UserFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeId, setStoreId] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStoreId(user.storeId ?? "");
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setStoreId(stores[0]?.id ?? "");
    }
  }, [user, stores, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create" && !password.trim()) return;
    onSave({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      ...(mode === "create" && password ? { password: password.trim() } : {}),
      ...(role === "staff" && storeId ? { storeId } : {}),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} aria-hidden />
      <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
          {mode === "create" ? `Add ${role === "owner" ? "Owner" : "Staff"}` : `Edit ${role === "owner" ? "Owner" : "Staff"}`}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={mode === "edit"}
          />
          {mode === "create" && (
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          {role === "staff" && stores.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Store</label>
              <select
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
