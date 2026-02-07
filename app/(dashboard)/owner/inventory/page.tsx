"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { initialStores } from "@/lib/data/stores";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

export default function OwnerInventoryPage() {
  const { user } = useAuth();
  const { products } = useProducts();

  const myStores = initialStores.filter((s) => s.ownerId === user?.id);
  const myStoreIds = myStores.map((s) => s.id);
  const myProducts = products.filter((p) => myStoreIds.includes(p.storeId));
  const getStoreName = (storeId: string) => initialStores.find((s) => s.id === storeId)?.name ?? "Unknown";

  const getStockBadge = (p: { quantity: number; lowStockThreshold: number }) => {
    if (p.quantity === 0) return <Badge variant="outOfStock">Out of stock</Badge>;
    if (p.quantity <= p.lowStockThreshold) return <Badge variant="lowStock">Low stock</Badge>;
    return <Badge variant="inStock">In stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Owner", href: "/owner" }, { label: "Inventory" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Inventory Overview</h1>
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
            {myProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{getStoreName(p.storeId)}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{p.lowStockThreshold}</TableCell>
                <TableCell>{getStockBadge(p)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
