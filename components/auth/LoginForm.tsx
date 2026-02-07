"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/context/UsersContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { users } = useUsers();
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = login(email, password, users);
    if (user) {
      addToast("Login successful", "success");
      if (user.role === "customer") router.push("/");
      else router.push("/" + user.role);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100 mb-6">
        Sign in to MedFinder
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@productfinder.com"
          required
          error={error}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
