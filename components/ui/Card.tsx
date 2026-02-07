"use client";

import React from "react";
import { colors } from "@/assets/theme/colors";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border ${colors.border.default} ${colors.borderDark.default} ${colors.bg.surface} ${colors.bgDark.surface} shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
      <div>
        <h3 className={`text-lg font-semibold ${colors.text.primary} ${colors.textDark.primary}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-sm mt-0.5 ${colors.text.muted} ${colors.textDark.muted}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
