"use client";

import React, { useState, useEffect } from "react";
import type { Store } from "@/lib/types";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface StoreFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  store?: Store | null;
  owners?: User[];
  currentOwnerId?: string;
  onSave: (data: Partial<Store>) => void;
  onCancel: () => void;
}

export function StoreFormModal({
  open,
  mode,
  store,
  owners = [],
  currentOwnerId,
  onSave,
  onCancel,
}: StoreFormModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const showOwnerSelect = !currentOwnerId && owners.length > 0;

  useEffect(() => {
    if (store) {
      setName(store.name);
      setAddress(store.address);
      setCity(store.city);
      setMunicipality(store.municipality);
      setOwnerId(store.ownerId);
    } else {
      setName("");
      setAddress("");
      setCity("");
      setMunicipality("");
      setOwnerId(currentOwnerId ?? owners[0]?.id ?? "");
    }
  }, [store, owners, currentOwnerId, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedOwnerId = currentOwnerId ?? ownerId;
    if (!name.trim() || !address.trim() || !city.trim() || !municipality.trim() || !resolvedOwnerId) return;
    onSave({
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
      municipality: municipality.trim(),
      ownerId: resolvedOwnerId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} aria-hidden />
      <div className="relative z-10 w-full max-w-lg mx-4 my-8 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
          {mode === "create" ? "Add Store" : "Edit Store"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Pharmacy name" required />
          <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address" required />
          <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
          <Input label="Municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)} placeholder="Municipality" required />
          {showOwnerSelect && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Owner</label>
              <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
              >
                {owners.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
