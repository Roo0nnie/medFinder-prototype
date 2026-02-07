"use client";

import React, { useState } from "react";
import type { Store } from "@/lib/types";
import { useStores } from "@/context/StoresContext";
import { useUsers } from "@/context/UsersContext";
import { useProducts } from "@/context/ProductsContext";
import { useToast } from "@/context/ToastContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { StoreFormModal } from "@/components/stores/StoreFormModal";
import { DeleteConfirmDialog } from "@/components/users/DeleteConfirmDialog";

export default function AdminStoresPage() {
  const { users } = useUsers();
  const { products } = useProducts();
  const { stores, addStore, updateStore, removeStore } = useStores();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Store | null>(null);

  const owners = users.filter((u) => u.role === "owner");
  const getOwnerName = (ownerId: string) => users.find((u) => u.id === ownerId)?.name ?? "Unknown";
  const getProductCount = (storeId: string) => products.filter((p) => p.storeId === storeId).length;

  const handleSave = (data: Partial<Store>) => {
    if (editingStore) {
      updateStore(editingStore.id, data);
      addToast("Store updated", "success");
      setModalOpen(false);
      setEditingStore(null);
    } else {
      addStore({
        id: `store-${Date.now()}`,
        name: data.name!,
        address: data.address!,
        city: data.city!,
        municipality: data.municipality!,
        ownerId: data.ownerId!,
      });
      addToast("Store added", "success");
      setModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      removeStore(deleteTarget.id);
      addToast("Store removed", "success");
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Stores" }]} />
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
          Stores Registry
        </h1>
        <Button onClick={() => { setEditingStore(null); setModalOpen(true); }}>Add Store</Button>
      </div>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City/Municipality</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.municipality}</TableCell>
                <TableCell>{getOwnerName(store.ownerId)}</TableCell>
                <TableCell>{getProductCount(store.id)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingStore(store); setModalOpen(true); }}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(store)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <StoreFormModal
        open={modalOpen}
        mode={editingStore ? "edit" : "create"}
        store={editingStore}
        owners={owners}
        onSave={handleSave}
        onCancel={() => { setModalOpen(false); setEditingStore(null); }}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        title="Delete Store"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"?` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
