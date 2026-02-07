"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { initialSales } from "@/lib/data/sales";
import { initialStores } from "@/lib/data/stores";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StatsCard } from "@/components/dashboard/StatsCard";

export default function OwnerReportsPage() {
  const { user } = useAuth();
  const { products } = useProducts();

  const myStores = initialStores.filter((s) => s.ownerId === user?.id);
  const myStoreIds = myStores.map((s) => s.id);
  const mySales = initialSales.filter((s) => myStoreIds.includes(s.storeId));
  const totalRevenue = mySales.reduce((sum, s) => sum + s.amount, 0);
  const myProducts = products.filter((p) => myStoreIds.includes(p.storeId));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Owner", href: "/owner" }, { label: "Reports" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Sales Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Revenue" value={"₱" + totalRevenue.toFixed(2)} />
        <StatsCard title="Sales Count" value={mySales.length} />
        <StatsCard title="Products" value={myProducts.length} />
      </div>
    </div>
  );
}
