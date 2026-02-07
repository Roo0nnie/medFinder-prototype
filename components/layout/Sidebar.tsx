"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/assets/theme/colors";

interface NavItem {
  href: string;
  label: string;
}

interface SidebarProps {
  items: NavItem[];
  title?: string;
}

export function Sidebar({ items, title = "Menu" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-64 min-h-screen border-r ${colors.border.default} ${colors.borderDark.default} ${colors.bg.surface} ${colors.bgDark.surface} flex flex-col`}
    >
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className={`text-lg font-semibold ${colors.text.primary} ${colors.textDark.primary}`}>
          {title}
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
