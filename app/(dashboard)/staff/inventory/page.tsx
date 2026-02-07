"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { useToast } from "@/context/ToastContext";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useStores } from "@/context/StoresContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductSearch } from "@/components/products/ProductSearch";
import { QuantityEditModal } from "@/components/products/QuantityEditModal";
import type { Product } from "@/lib/types";

export default function StaffInventoryPage() {
  const { user } = useAuth();
  const { products, updateProduct } = useProducts();
  const { stores } = useStores();
  const { addToast } = useToast();
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const myStoreIds = user?.storeId ? [user.storeId] : [];
  const myProducts = products.filter((p) => myStoreIds.includes(p.storeId));
  const myStores = stores.filter((s) => myStoreIds.includes(s.id));
  const { products: filteredProducts, query, setSearchQuery } = useProductSearch({
    products: myProducts,
    stores: myStores,
  });

  const getStoreName = (storeId: string) => stores.find((s) => s.id === storeId)?.name ?? "Unknown";

  const getStockBadge = (p: { quantity: number; lowStockThreshold: number }) => {
    if (p.quantity === 0) return <Badge variant="outOfStock">Out of stock</Badge>;
    if (p.quantity <= p.lowStockThreshold) return <Badge variant="lowStock">Low stock</Badge>;
    return <Badge variant="inStock">In stock</Badge>;
  };

  const handleSaveQty = (quantity: number) => {
    if (editProduct) {
      updateProduct(editProduct.id, { quantity });
      addToast("Quantity updated", "success");
      setEditProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Staff", href: "/staff" }, { label: "Inventory" }]} />
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Inventory</h1>
        <ProductSearch value={query} onChange={setSearchQuery} placeholder="Search products..." />
      </div>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Low Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{getStoreName(p.storeId)}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{p.lowStockThreshold}</TableCell>
                <TableCell>{getStockBadge(p)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => setEditProduct(p)}>Update Qty</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No products in your store.</p>
      )}

      <QuantityEditModal
        open={!!editProduct}
        productName={editProduct?.name ?? ""}
        currentQuantity={editProduct?.quantity ?? 0}
        onSave={handleSaveQty}
        onCancel={() => setEditProduct(null)}
      />
    </div>
  );
}
