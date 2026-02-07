"use client";

import React from "react";
import { Input } from "@/components/ui/Input";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function ProductSearch({ value, onChange, placeholder = "Search by name, brand, category..." }: ProductSearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
      </div>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 py-2.5 min-h-[44px] w-full focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
        aria-label="Search products"
      />
    </div>
  );
}
