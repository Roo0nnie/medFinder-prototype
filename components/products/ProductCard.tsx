"use client";

import React, { useState } from "react";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
  storeName: string;
  onContactSupplier?: () => void;
}

function pluralize(unit: string, quantity: number): string {
  if (quantity === 1) return unit;
  if (unit.endsWith("x") || unit.endsWith("s") || unit.endsWith("ch") || unit.endsWith("sh")) {
    return unit + "es";
  }
  return unit + "s";
}

function formatQuantityLeft(quantity: number, unit: string): string {
  const u = unit ?? "piece";
  return `${quantity} ${pluralize(u, quantity)} left`;
}

function getStockVariantFromValues(quantity: number, threshold: number): "inStock" | "lowStock" | "outOfStock" {
  if (quantity === 0) return "outOfStock";
  if (quantity <= threshold) return "lowStock";
  return "inStock";
}

function getStockLabelFromValues(quantity: number, threshold: number): string {
  if (quantity === 0) return "Out of stock";
  if (quantity <= threshold) return "Low stock";
  return "In stock";
}

export function ProductCard({ product, storeName, onContactSupplier }: ProductCardProps) {
  const hasVariants = product.variants && product.variants.length > 1;
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    hasVariants ? product.variants![0]?.id ?? null : null
  );

  const unit = product.unit ?? "piece";
  const displayData: { price: number; quantity: number; lowStockThreshold: number } = hasVariants && selectedVariantId
    ? (() => {
        const v = product.variants!.find((x) => x.id === selectedVariantId);
        return v ?? { price: product.price, quantity: product.quantity, lowStockThreshold: product.lowStockThreshold };
      })()
    : { price: product.price, quantity: product.quantity, lowStockThreshold: product.lowStockThreshold };

  const variant = getStockVariantFromValues(displayData.quantity, displayData.lowStockThreshold);
  const stockLabel = getStockLabelFromValues(displayData.quantity, displayData.lowStockThreshold);

  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-base leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{product.brand}</p>
          </div>
          <Badge variant={variant} className="shrink-0">{stockLabel}</Badge>
        </div>
        {product.dosage && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">Dosage: {product.dosage}</p>
        )}
        {product.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2">{product.description}</p>
        )}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          {formatQuantityLeft(displayData.quantity, unit)}
        </p>
        {hasVariants && (
          <div className="mt-2">
            <label htmlFor={`variant-${product.id}`} className="sr-only">
              Select size
            </label>
            <select
              id={`variant-${product.id}`}
              value={selectedVariantId ?? ""}
              onChange={(e) => setSelectedVariantId(e.target.value || null)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              {product.variants!.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-700/50 flex items-center justify-between gap-2">
          <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">₱{displayData.price.toFixed(2)}</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{storeName}</span>
        </div>
        {/* {onContactSupplier && (
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full py-2.5 min-h-[40px]"
            onClick={onContactSupplier}
          >
            Contact Supplier
          </Button>
        )} */}
      </CardContent>
    </Card>
  );
}
