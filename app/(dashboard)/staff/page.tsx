"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/Button";

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const { products } = useProducts();

  const myStoreIds = user?.storeId ? [user.storeId] : [];
  const myProducts = products.filter((p) => myStoreIds.includes(p.storeId));
  const lowStockCount = myProducts.filter((p) => p.quantity <= p.lowStockThreshold).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Staff Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard title="Products" value={myProducts.length} />
        <StatsCard title="Low Stock Items" value={lowStockCount} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/staff/inventory"><Button>Manage Inventory</Button></Link>
        <Link href="/staff/restock"><Button variant="secondary">Restock List</Button></Link>
      </div>
    </div>
  );
}
