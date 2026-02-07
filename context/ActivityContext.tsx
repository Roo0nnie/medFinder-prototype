"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import type { Activity } from "@/lib/types";
import { initialActivity } from "@/lib/data/activity";

interface ActivityContextValue {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
}

const ActivityContext = createContext<ActivityContextValue | null>(null);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(initialActivity);

  const addActivity = useCallback(
    (activity: Omit<Activity, "id" | "timestamp">) => {
      const newActivity: Activity = {
        ...activity,
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
      setActivities((prev) => [newActivity, ...prev]);
    },
    []
  );

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivity must be used within ActivityProvider");
  return ctx;
}
