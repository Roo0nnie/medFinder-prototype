"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { useToast } from "@/context/ToastContext";
import { useProductSearch } from "@/hooks/useProductSearch";
import { initialStores } from "@/lib/data/stores";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductFormModal } from "@/components/products/ProductFormModal";
import { DeleteConfirmDialog } from "@/components/users/DeleteConfirmDialog";
import type { Product } from "@/lib/types";

export default function OwnerProductsPage() {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const myStores = initialStores.filter((s) => s.ownerId === user?.id);
  const myStoreIds = myStores.map((s) => s.id);
  const myProducts = products.filter((p) => myStoreIds.includes(p.storeId));
  const { products: filteredProducts, query, setSearchQuery } = useProductSearch({
    products: myProducts,
    stores: myStores,
  });

  const getStoreName = (storeId: string) => initialStores.find((s) => s.id === storeId)?.name ?? "Unknown";

  const getStockBadge = (p: { quantity: number; lowStockThreshold: number }) => {
    if (p.quantity === 0) return <Badge variant="outOfStock">Out of stock</Badge>;
    if (p.quantity <= p.lowStockThreshold) return <Badge variant="lowStock">Low stock</Badge>;
    return <Badge variant="inStock">In stock</Badge>;
  };

  const handleSave = (data: Partial<Product>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      addToast("Product updated", "success");
      setModalOpen(false);
      setEditingProduct(null);
    } else {
      addProduct({
        id: `prod-${Date.now()}`,
        name: data.name!,
        brand: data.brand!,
        category: data.category!,
        dosage: data.dosage,
        description: data.description,
        price: data.price!,
        quantity: data.quantity!,
        supplier: data.supplier!,
        storeId: data.storeId!,
        lowStockThreshold: data.lowStockThreshold!,
      });
      addToast("Product added", "success");
      setModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      removeProduct(deleteTarget.id);
      addToast("Product removed", "success");
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Owner", href: "/owner" }, { label: "Products" }]} />
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Products</h1>
        <div className="flex gap-4">
          <ProductSearch value={query} onChange={setSearchQuery} placeholder="Search products..." />
          <Button onClick={() => { setEditingProduct(null); setModalOpen(true); }}>Add Product</Button>
        </div>
      </div>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>₱{p.price.toFixed(2)}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{getStockBadge(p)}</TableCell>
                <TableCell>{getStoreName(p.storeId)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingProduct(p); setModalOpen(true); }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700" onClick={() => setDeleteTarget(p)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No products yet. Add your first product.</p>
      )}

      <ProductFormModal
        open={modalOpen}
        mode={editingProduct ? "edit" : "create"}
        product={editingProduct}
        stores={myStores}
        onSave={handleSave}
        onCancel={() => { setModalOpen(false); setEditingProduct(null); }}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
