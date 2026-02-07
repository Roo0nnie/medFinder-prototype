"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/context/UsersContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const { users, addUser } = useUsers();
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const newUser = register(email, password, name, "owner", users);
    if (newUser) {
      addUser(newUser);
      addToast("Registration successful", "success");
      router.push("/owner");
    } else {
      setError("Email already registered");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100 mb-6">
        Create pharmacy owner account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
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
          Register
        </Button>
      </form>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
