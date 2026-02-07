"use client";

import React from "react";
import { useActivity } from "@/context/ActivityContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

export default function AdminActivityPage() {
  const { activities } = useActivity();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Activity Log" }]} />
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
        Activity Log
      </h1>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.userName}</TableCell>
                <TableCell>{a.action}</TableCell>
                <TableCell>{a.target} {a.targetId ?? ""}</TableCell>
                <TableCell>{new Date(a.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
