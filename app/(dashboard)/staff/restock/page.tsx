"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { initialStores } from "@/lib/data/stores";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

export default function StaffRestockPage() {
  const { user } = useAuth();
  const { products } = useProducts();

  const myStoreIds = user?.storeId ? [user.storeId] : [];
  const lowStockProducts = products
    .filter((p) => myStoreIds.includes(p.storeId) && p.quantity <= p.lowStockThreshold)
    .sort((a, b) => a.quantity - b.quantity);
  const getStoreName = (storeId: string) => initialStores.find((s) => s.id === storeId)?.name ?? "Unknown";

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Staff", href: "/staff" }, { label: "Restock" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Need to Buy</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm">Products below low stock threshold</p>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Low Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{getStoreName(p.storeId)}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{p.lowStockThreshold}</TableCell>
                <TableCell><Badge variant="lowStock">Need restock</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {lowStockProducts.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">All products are well stocked.</p>
      )}
    </div>
  );
}
