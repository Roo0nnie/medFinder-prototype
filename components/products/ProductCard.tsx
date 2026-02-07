"use client";

import React from "react";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
  storeName: string;
  onContactSupplier?: () => void;
}

function getStockVariant(product: Product): "inStock" | "lowStock" | "outOfStock" {
  if (product.quantity === 0) return "outOfStock";
  if (product.quantity <= product.lowStockThreshold) return "lowStock";
  return "inStock";
}

function getStockLabel(product: Product): string {
  if (product.quantity === 0) return "Out of stock";
  if (product.quantity <= product.lowStockThreshold) return "Low stock";
  return "In stock";
}

export function ProductCard({ product, storeName, onContactSupplier }: ProductCardProps) {
  const variant = getStockVariant(product);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-semibold text-zinc-700 dark:text-zinc-100">{product.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.brand}</p>
          </div>
          <Badge variant={variant}>{getStockLabel(product)}</Badge>
        </div>
        {product.dosage && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">Dosage: {product.dosage}</p>
        )}
        {product.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">{product.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">₱{product.price.toFixed(2)}</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{storeName}</span>
        </div>
        {onContactSupplier && (
          <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={onContactSupplier}>
            Contact Supplier
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
