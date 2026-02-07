"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/assets/theme/colors";

const GUEST_TABS = [
  { href: "/", label: "Find Products" },
  { href: "/pharmacies", label: "Pharmacies" },
  { href: "/contact", label: "Contact" },
];

export function GuestTabs() {
  const pathname = usePathname();

  return (
    <nav
      role="tablist"
      aria-label="Main navigation"
      className={`border-b ${colors.border.default} ${colors.borderDark.default} ${colors.bg.surface} ${colors.bgDark.surface}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {GUEST_TABS.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname === tab.href || pathname.startsWith(tab.href + "/");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                role="tab"
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? `relative px-4 py-3 text-sm font-medium transition-colors text-zinc-700 dark:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2`
                    : `relative px-4 py-3 text-sm font-medium transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2`
                }
              >
                {tab.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-zinc-700 dark:bg-zinc-400`}
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
