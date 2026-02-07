import type { User } from "@/lib/types";

export const initialUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@productfinder.com",
    password: "Admin@123",
    name: "System Admin",
    role: "admin",
  },
  {
    id: "owner-1",
    email: "owner@pharmacy.com",
    password: "Owner@123",
    name: "Pharmacy Owner",
    role: "owner",
  },
  {
    id: "staff-1",
    email: "staff@pharmacy.com",
    password: "Staff@123",
    name: "Pharmacy Staff",
    role: "staff",
    storeId: "store-1",
    ownerId: "owner-1",
  },
  {
    id: "customer-1",
    email: "customer@example.com",
    password: "Customer@123",
    name: "Test Customer",
    role: "customer",
  },
];
