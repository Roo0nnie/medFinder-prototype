"use client";

import React from "react";
import Link from "next/link";
import { useUsers } from "@/context/UsersContext";
import { useProducts } from "@/context/ProductsContext";
import { useStores } from "@/context/StoresContext";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const { users } = useUsers();
  const { products } = useProducts();
  const ownerCount = users.filter((u) => u.role === "owner").length;
  const { stores } = useStores();
  const storeCount = stores.length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Owners" value={ownerCount} />
        <StatsCard title="Total Stores" value={storeCount} />
        <StatsCard title="Total Products" value={products.length} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/admin/owners"><Button>Manage Owners</Button></Link>
        <Link href="/admin/analytics"><Button variant="secondary">View Analytics</Button></Link>
        <Link href="/admin/stores"><Button variant="secondary">Stores Registry</Button></Link>
        <Link href="/admin/products"><Button variant="secondary">Product Catalog</Button></Link>
        <Link href="/admin/activity"><Button variant="secondary">Activity Log</Button></Link>
      </div>
    </div>
  );
}
