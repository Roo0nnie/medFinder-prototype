"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "product-finder-search-history";
const MAX_HISTORY = 20;

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

interface SearchHistoryContextValue {
  history: SearchHistoryItem[];
  addHistory: (query: string) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextValue | null>(null);

function loadHistory(): SearchHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as SearchHistoryItem[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: SearchHistoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

export function SearchHistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addHistory = useCallback((query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.query !== trimmed);
      const updated = [{ query: trimmed, timestamp: Date.now() }, ...filtered];
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  return (
    <SearchHistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const ctx = useContext(SearchHistoryContext);
  if (!ctx) throw new Error("useSearchHistory must be used within SearchHistoryProvider");
  return ctx;
}
