import type { Activity } from "@/lib/types";

export const initialActivity: Activity[] = [
  { id: "act-1", userId: "owner-1", userName: "Pharmacy Owner", action: "Created", target: "Product", targetId: "prod-1", timestamp: "2025-02-01T08:00:00Z" },
  { id: "act-2", userId: "staff-1", userName: "Pharmacy Staff", action: "Updated", target: "Product", targetId: "prod-3", timestamp: "2025-02-01T14:30:00Z" },
  { id: "act-3", userId: "admin-1", userName: "System Admin", action: "Viewed", target: "Analytics", timestamp: "2025-02-02T09:00:00Z" },
];
