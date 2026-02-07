"use client";

import { useProducts } from "@/context/ProductsContext";
import { initialSales } from "@/lib/data/sales";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

export default function AdminAnalyticsPage() {
  const { products } = useProducts();
  const totalRevenue = initialSales.reduce((sum, s) => sum + s.amount, 0);
  const saleCount = initialSales.length;
  const byProduct: Record<string, number> = {};
  initialSales.forEach((s) => {
    byProduct[s.productId] = (byProduct[s.productId] || 0) + s.quantity;
  });
  const entries = Object.entries(byProduct).map(([id, qty]) => ({
    product: products.find((p) => p.id === id),
    qty,
  })).filter((e) => e.product).sort((a, b) => b.qty - a.qty).slice(0, 10);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Analytics" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Revenue" value={"₱" + totalRevenue.toFixed(2)} />
        <StatsCard title="Total Sales" value={saleCount} />
        <StatsCard title="Products" value={products.length} />
      </div>
      <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-100 mb-4">Best Selling Products</h2>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity Sold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map(({ product, qty }) => (
              <TableRow key={product!.id}>
                <TableCell>{product!.name}</TableCell>
                <TableCell>{qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {entries.length === 0 && <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No sales data yet.</p>}
    </div>
  );
}
