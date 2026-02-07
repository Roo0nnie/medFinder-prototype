"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { colors } from "@/assets/theme/colors";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <Card className="p-4">
      <p className={`text-sm font-medium ${colors.text.muted} ${colors.textDark.muted}`}>
        {title}
      </p>
      <p className={`text-2xl font-semibold mt-1 ${colors.text.primary} ${colors.textDark.primary}`}>
        {value}
      </p>
      {subtitle ? (
        <p className={`text-xs mt-1 ${colors.text.muted} ${colors.textDark.muted}`}>
          {subtitle}
        </p>
      ) : null}
    </Card>
  );
}
