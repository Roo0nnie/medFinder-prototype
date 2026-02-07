"use client";

import React from "react";
import { useProducts } from "@/context/ProductsContext";
import { useStores } from "@/context/StoresContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

export default function AdminProductsPage() {
  const { products } = useProducts();
  const { stores } = useStores();
  const getStoreName = (storeId: string) => stores.find((s) => s.id === storeId)?.name ?? "Unknown";
  const getStockBadge = (p: { quantity: number; lowStockThreshold: number }) => {
    if (p.quantity === 0) return <Badge variant="outOfStock">Out of stock</Badge>;
    if (p.quantity <= p.lowStockThreshold) return <Badge variant="lowStock">Low stock</Badge>;
    return <Badge variant="inStock">In stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Products" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
        Product Catalog
      </h1>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Store</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>₱{p.price.toFixed(2)}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{getStockBadge(p)}</TableCell>
                <TableCell>{getStoreName(p.storeId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
