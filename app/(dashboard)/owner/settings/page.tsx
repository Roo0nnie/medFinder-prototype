"use client";

import { useAuth } from "@/hooks/useAuth";
import { initialStores } from "@/lib/data/stores";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";

export default function OwnerSettingsPage() {
  const { user } = useAuth();
  const myStores = initialStores.filter((s) => s.ownerId === user?.id);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Owner", href: "/owner" }, { label: "Settings" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
        Store Settings
      </h1>
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
            <p className="text-zinc-500 dark:text-zinc-400">No stores configured.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
