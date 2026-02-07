export type Role = "admin" | "owner" | "staff" | "customer";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  storeId?: string;
  ownerId?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  municipality: string;
  ownerId: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  dosage?: string;
  description?: string;
  price: number;
  quantity: number;
  supplier: string;
  storeId: string;
  lowStockThreshold: number;
  unit?: string;
  variants?: ProductVariant[];
}

export interface Sale {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  amount: number;
  soldAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  targetId?: string;
  timestamp: string;
}
