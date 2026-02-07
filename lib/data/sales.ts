import type { Sale } from "@/lib/types";

export const initialSales: Sale[] = [
  { id: "sale-1", productId: "prod-1", storeId: "store-1", quantity: 5, amount: 25, soldAt: "2025-02-01T10:00:00Z" },
  { id: "sale-2", productId: "prod-2", storeId: "store-1", quantity: 3, amount: 36, soldAt: "2025-02-01T11:30:00Z" },
  { id: "sale-3", productId: "prod-1", storeId: "store-1", quantity: 10, amount: 50, soldAt: "2025-02-02T09:00:00Z" },
  { id: "sale-4", productId: "prod-8", storeId: "store-1", quantity: 2, amount: 36, soldAt: "2025-02-02T14:00:00Z" },
  { id: "sale-5", productId: "prod-4", storeId: "store-1", quantity: 1, amount: 25, soldAt: "2025-02-03T08:00:00Z" },
  { id: "sale-6", productId: "prod-11", storeId: "store-2", quantity: 4, amount: 24, soldAt: "2025-02-01T12:00:00Z" },
  { id: "sale-7", productId: "prod-13", storeId: "store-2", quantity: 2, amount: 70, soldAt: "2025-02-02T10:00:00Z" },
];
