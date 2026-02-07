"use client";

import React from "react";
import { colors } from "@/assets/theme/colors";

type BadgeVariant = "inStock" | "lowStock" | "outOfStock" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    inStock: colors.badge.inStock,
    lowStock: colors.badge.lowStock,
    outOfStock: colors.badge.outOfStock,
    default: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
