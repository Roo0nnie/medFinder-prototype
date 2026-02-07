"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/context/UsersContext";
import { useProducts } from "@/context/ProductsContext";
import { useStores } from "@/context/StoresContext";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/Button";

export default function OwnerDashboardPage() {
  const { user } = useAuth();
  const { users } = useUsers();
  const { products } = useProducts();

  const { stores } = useStores();
  const myStores = stores.filter((s) => s.ownerId === user?.id);
  const myStoreIds = myStores.map((s) => s.id);
  const myProducts = products.filter((p) => myStoreIds.includes(p.storeId));
  const staffCount = users.filter((u) => u.ownerId === user?.id).length;
  const lowStockCount = myProducts.filter((p) => p.quantity <= p.lowStockThreshold).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Stores" value={myStores.length} />
        <StatsCard title="Products" value={myProducts.length} />
        <StatsCard title="Staff" value={staffCount} />
        <StatsCard title="Low Stock" value={lowStockCount} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/owner/products"><Button>Manage Products</Button></Link>
        <Link href="/owner/staff"><Button variant="secondary">Manage Staff</Button></Link>
        <Link href="/owner/inventory"><Button variant="secondary">Inventory</Button></Link>
        <Link href="/owner/reports"><Button variant="secondary">Reports</Button></Link>
        <Link href="/owner/settings"><Button variant="secondary">Settings</Button></Link>
      </div>
    </div>
  );
}
