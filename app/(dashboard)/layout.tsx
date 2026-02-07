"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/owners", label: "Owners" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/stores", label: "Stores" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/activity", label: "Activity" },
  { href: "/profile", label: "Profile" },
];

const OWNER_NAV = [
  { href: "/owner", label: "Dashboard" },
  { href: "/owner/products", label: "Products" },
  { href: "/owner/staff", label: "Staff" },
  { href: "/owner/inventory", label: "Inventory" },
  { href: "/owner/reports", label: "Reports" },
  { href: "/owner/settings", label: "Settings" },
  { href: "/profile", label: "Profile" },
];

const STAFF_NAV = [
  { href: "/staff", label: "Dashboard" },
  { href: "/staff/inventory", label: "Inventory" },
  { href: "/staff/restock", label: "Restock" },
  { href: "/profile", label: "Profile" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user || user.role === "customer") {
    router.replace("/login");
    return null;
  }

  const navItems =
    user.role === "admin"
      ? ADMIN_NAV
      : user.role === "owner"
        ? OWNER_NAV
        : STAFF_NAV;

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-900">
      <Sidebar items={navItems} title="MedFinder" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header showProfile={true} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
