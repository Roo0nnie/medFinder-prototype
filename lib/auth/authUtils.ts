import type { User } from "@/lib/types";

const STORAGE_KEY = "product-finder-user";
const COOKIE_NAME = "product-finder-user";
const COOKIE_MAX_AGE = 86400; // 24 hours

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify({ role: user.role, id: user.id }))}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } else {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
  }
}
