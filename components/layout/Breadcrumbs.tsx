"use client";

import React from "react";
import Link from "next/link";
import { colors } from "@/assets/theme/colors";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className={`${colors.text.muted} ${colors.textDark.muted}`}>/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={`${colors.accent.link} ${colors.accent.linkDark} hover:underline`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`${colors.text.primary} ${colors.textDark.primary} font-medium`}>
              {item.label}
              </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
