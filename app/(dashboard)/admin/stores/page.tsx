"use client";

import { initialStores } from "@/lib/data/stores";
import { useUsers } from "@/context/UsersContext";
import { useProducts } from "@/context/ProductsContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

export default function AdminStoresPage() {
  const { users } = useUsers();
  const { products } = useProducts();
  const getOwnerName = (ownerId: string) => users.find((u) => u.id === ownerId)?.name ?? "Unknown";
  const getProductCount = (storeId: string) => products.filter((p) => p.storeId === storeId).length;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Stores" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
        Stores Registry
      </h1>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City/Municipality</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.municipality}</TableCell>
                <TableCell>{getOwnerName(store.ownerId)}</TableCell>
                <TableCell>{getProductCount(store.id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
