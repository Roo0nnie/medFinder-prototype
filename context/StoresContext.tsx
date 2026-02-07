"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import type { Store } from "@/lib/types";
import { initialStores } from "@/lib/data/stores";

interface StoresContextValue {
  stores: Store[];
  addStore: (store: Store) => void;
  updateStore: (id: string, updates: Partial<Store>) => void;
  removeStore: (id: string) => void;
  getStoresByOwner: (ownerId: string) => Store[];
  getStoreById: (id: string) => Store | undefined;
}

const StoresContext = createContext<StoresContextValue | null>(null);

export function StoresProvider({ children }: { children: React.ReactNode }) {
  const [stores, setStores] = useState<Store[]>(initialStores);

  const addStore = useCallback((store: Store) => {
    setStores((prev) => [...prev, store]);
  }, []);

  const updateStore = useCallback((id: string, updates: Partial<Store>) => {
    setStores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }, []);

  const removeStore = useCallback((id: string) => {
    setStores((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const getStoresByOwner = useCallback(
    (ownerId: string) => stores.filter((s) => s.ownerId === ownerId),
    [stores]
  );

  const getStoreById = useCallback(
    (id: string) => stores.find((s) => s.id === id),
    [stores]
  );

  return (
    <StoresContext.Provider
      value={{
        stores,
        addStore,
        updateStore,
        removeStore,
        getStoresByOwner,
        getStoreById,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
}

export function useStores() {
  const ctx = useContext(StoresContext);
  if (!ctx) throw new Error("useStores must be used within StoresProvider");
  return ctx;
}
