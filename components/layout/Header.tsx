"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/assets/theme/colors";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  showProfile?: boolean;
}

export function Header({ showProfile = true }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header
      className={`flex items-center justify-between h-14 px-4 border-b ${colors.border.default} ${colors.borderDark.default} ${colors.bg.surface} ${colors.bgDark.surface}`}
    >
      <Link
        href={!user || user.role === "customer" ? "/" : `/${user.role}`}
        className="flex items-center gap-2"
      >
        <span className={`text-lg font-semibold ${colors.text.primary} ${colors.textDark.primary}`}>
          MedFinder
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {showProfile && (
          <>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className={`text-sm ${colors.accent.link} ${colors.accent.linkDark}`}
                >
                  {user.name}
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className={`text-sm ${colors.accent.link} ${colors.accent.linkDark}`}
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
