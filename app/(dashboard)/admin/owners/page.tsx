"use client";

import React, { useState } from "react";
import { useUsers } from "@/context/UsersContext";
import { useToast } from "@/context/ToastContext";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { UserFormModal } from "@/components/users/UserFormModal";
import { DeleteConfirmDialog } from "@/components/users/DeleteConfirmDialog";
import type { User } from "@/lib/types";

export default function AdminOwnersPage() {
  const { users, addUser, updateUser, removeUser, findUserByEmail } = useUsers();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const owners = users.filter((u) => u.role === "owner");

  const handleSave = (data: { name: string; email: string; password?: string }) => {
    if (editingUser) {
      updateUser(editingUser.id, { name: data.name });
      addToast("Owner updated", "success");
      setModalOpen(false);
      setEditingUser(null);
    } else {
      if (findUserByEmail(data.email)) {
        addToast("Email already registered", "error");
        return;
      }
      addUser({
        id: `owner-${Date.now()}`,
        email: data.email,
        password: data.password!,
        name: data.name,
        role: "owner",
      });
      addToast("Owner added", "success");
      setModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      removeUser(deleteTarget.id);
      addToast("Owner removed", "success");
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Owners" }]} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Manage Owners</h1>
        <Button onClick={() => { setEditingUser(null); setModalOpen(true); }}>Add Owner</Button>
      </div>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {owners.map((owner) => (
              <TableRow key={owner.id}>
                <TableCell>{owner.name}</TableCell>
                <TableCell>{owner.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingUser(owner); setModalOpen(true); }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700" onClick={() => setDeleteTarget(owner)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {owners.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No owners yet.</p>
      )}

      <UserFormModal
        open={modalOpen}
        mode={editingUser ? "edit" : "create"}
        role="owner"
        user={editingUser}
        onSave={handleSave}
        onCancel={() => { setModalOpen(false); setEditingUser(null); }}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        title="Delete Owner"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
