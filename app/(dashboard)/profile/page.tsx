"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { useSearchHistory } from "@/context/SearchHistoryContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function ProfilePage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { history, clearHistory } = useSearchHistory();
  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    addToast("Profile updated", "success");
  };

  return (
    <div className="space-y-8 max-w-md">
      <Breadcrumbs items={[{ label: "Profile" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={user?.email ?? ""} disabled />
        <Input label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" />
        <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={error} />
        <Button type="submit">Update Profile</Button>
      </form>

      {user?.role === "customer" && (
        <div>
          <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-100 mb-2">Search History</h2>
          {history.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No search history yet.</p>
          ) : (
            <>
              <ul className="space-y-1">
                {history.slice(0, 10).map((h, i) => (
                  <li key={i}>
                    <Link href={`/?q=${encodeURIComponent(h.query)}`} className="text-sm text-slate-600 dark:text-slate-300 hover:underline">
                      {h.query}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" className="mt-2" onClick={clearHistory}>Clear history</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
