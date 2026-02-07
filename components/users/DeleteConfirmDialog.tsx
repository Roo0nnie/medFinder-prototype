"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface DeleteConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ open, title, message, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} aria-hidden />
      <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">{title}</h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
