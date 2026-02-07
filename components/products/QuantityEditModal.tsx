"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface QuantityEditModalProps {
  open: boolean;
  productName: string;
  currentQuantity: number;
  onSave: (quantity: number) => void;
  onCancel: () => void;
}

export function QuantityEditModal(props: QuantityEditModalProps) {
  const { open, productName, currentQuantity, onSave, onCancel } = props;
  const [quantity, setQuantity] = useState(String(currentQuantity));

  useEffect(() => {
    setQuantity(String(currentQuantity));
  }, [currentQuantity, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(quantity, 10);
    if (isNaN(num) || num < 0) return;
    onSave(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} aria-hidden />
      <div className="relative z-10 w-full max-w-sm mx-4 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">Update Quantity</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{productName}</p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input
            label="Quantity"
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
