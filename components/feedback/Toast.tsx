"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";

export function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => {
        const typeClasses = {
          success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
          error: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200 border-rose-200 dark:border-rose-800",
          info: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700",
        };
        return (
          <div
            key={toast.id}
            className={"px-4 py-3 rounded-lg border shadow-sm flex items-center justify-between gap-4 " + typeClasses[toast.type]}
          >
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
