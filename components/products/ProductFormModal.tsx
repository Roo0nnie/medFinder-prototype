"use client";

import React, { useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import type { Store } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["Pain Relief", "Antibiotics", "First Aid", "Medical Devices", "Diabetes", "Vitamins", "Antihistamine", "Digestive", "Protective Equipment"];

interface ProductFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  product?: Product | null;
  stores: Store[];
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export function ProductFormModal({
  open,
  mode,
  product,
  stores,
  onSave,
  onCancel,
}: ProductFormModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [dosage, setDosage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [storeId, setStoreId] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
      setDosage(product.dosage ?? "");
      setDescription(product.description ?? "");
      setPrice(String(product.price));
      setQuantity(String(product.quantity));
      setSupplier(product.supplier);
      setStoreId(product.storeId);
      setLowStockThreshold(String(product.lowStockThreshold));
    } else {
      setName("");
      setBrand("");
      setCategory(CATEGORIES[0] ?? "");
      setDosage("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setSupplier("");
      setStoreId(stores[0]?.id ?? "");
      setLowStockThreshold("10");
    }
  }, [product, stores, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(price);
    const qtyNum = parseInt(quantity, 10);
    const thresholdNum = parseInt(lowStockThreshold, 10);
    if (isNaN(priceNum) || isNaN(qtyNum) || isNaN(thresholdNum) || !name.trim() || !brand.trim() || !category || !storeId) return;
    onSave({
      name: name.trim(),
      brand: brand.trim(),
      category,
      dosage: dosage.trim() || undefined,
      description: description.trim() || undefined,
      price: priceNum,
      quantity: qtyNum,
      supplier: supplier.trim(),
      storeId,
      lowStockThreshold: thresholdNum,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} aria-hidden />
      <div className="relative z-10 w-full max-w-lg mx-4 my-8 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
          {mode === "create" ? "Add Product" : "Edit Product"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <Input label="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g. 500mg" />
          <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input label="Price" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <Input label="Quantity" type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          <Input label="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Store</label>
            <select
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <Input label="Low Stock Threshold" type="number" min="0" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(e.target.value)} required />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
