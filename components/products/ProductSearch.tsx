"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/Input";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProductSearch({ value, onChange, placeholder = "Search by name, brand, category..." }: ProductSearchProps) {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-md"
    />
  );
}
