"use client";

import React from "react";
import { colors } from "@/assets/theme/colors";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full divide-y ${colors.border.default} ${colors.borderDark.default} ${className}`}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className={`${colors.bg.secondary} ${colors.bgDark.secondary}`}>
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className={`divide-y ${colors.border.default} ${colors.borderDark.default} ${colors.bg.surface} ${colors.bgDark.surface}`}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <tr className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-left text-xs font-medium ${colors.text.muted} ${colors.textDark.muted} uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3 text-sm ${colors.text.primary} ${colors.textDark.primary} ${className}`}>
      {children}
    </td>
  );
}
