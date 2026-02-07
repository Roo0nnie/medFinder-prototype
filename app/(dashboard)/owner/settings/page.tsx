"use client";

import React, { useState } from "react";
import type { Store } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { useStores } from "@/context/StoresContext";
import { useToast } from "@/context/ToastContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StoreFormModal } from "@/components/stores/StoreFormModal";

export default function OwnerSettingsPage() {
  const { user } = useAuth();
  const { stores, addStore } = useStores();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const myStores = stores.filter((s) => s.ownerId === user?.id);

  const handleSave = (data: Partial<Store>) => {
    if (!user?.id) return;
    addStore({
      id: `store-${Date.now()}`,
      name: data.name!,
      address: data.address!,
      city: data.city!,
      municipality: data.municipality!,
      ownerId: user.id,
    });
    addToast("Pharmacy added", "success");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Owner", href: "/owner" }, { label: "Settings" }]} />
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
          Store Settings
        </h1>
        <Button onClick={() => setModalOpen(true)}>Add Pharmacy</Button>
      </div>
      <Card>
        <div className="p-4 space-y-2">
          {myStores.map((store) => (
            <div key={store.id} className="border-b border-zinc-200 dark:border-zinc-700 pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium text-zinc-700 dark:text-zinc-100">{store.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{store.address}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{store.municipality}</p>
            </div>
          ))}
          {myStores.length === 0 && (
            <p className="text-zinc-500 dark:text-zinc-400">No stores configured. Add your first pharmacy above.</p>
          )}
        </div>
      </Card>
      <StoreFormModal
        open={modalOpen}
        mode="create"
        currentOwnerId={user?.id}
        onSave={handleSave}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
