"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/context/UsersContext";
import { useToast } from "@/context/ToastContext";
import { useStores } from "@/context/StoresContext";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { UserFormModal } from "@/components/users/UserFormModal";
import { DeleteConfirmDialog } from "@/components/users/DeleteConfirmDialog";
import type { User } from "@/lib/types";

export default function OwnerStaffPage() {
  const { user } = useAuth();
  const { users, addUser, updateUser, removeUser, findUserByEmail } = useUsers();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const { stores } = useStores();
  const myStores = stores.filter((s) => s.ownerId === user?.id);
  const staff = users.filter((u) => u.ownerId === user?.id && u.role === "staff");
  const getStoreName = (storeId: string) => stores.find((s) => s.id === storeId)?.name ?? "Unknown";

  const handleSave = (data: { name: string; email: string; password?: string; storeId?: string }) => {
    if (editingUser) {
      updateUser(editingUser.id, { name: data.name, storeId: data.storeId });
      addToast("Staff updated", "success");
      setModalOpen(false);
      setEditingUser(null);
    } else {
      if (findUserByEmail(data.email)) {
        addToast("Email already registered", "error");
        return;
      }
      addUser({
        id: `staff-${Date.now()}`,
        email: data.email,
        password: data.password!,
        name: data.name,
        role: "staff",
        storeId: data.storeId,
        ownerId: user?.id,
      });
      addToast("Staff added", "success");
      setModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      removeUser(deleteTarget.id);
      addToast("Staff removed", "success");
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Owner", href: "/owner" }, { label: "Staff" }]} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Staff</h1>
        <Button onClick={() => { setEditingUser(null); setModalOpen(true); }} disabled={myStores.length === 0}>
          Add Staff
        </Button>
      </div>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.storeId ? getStoreName(s.storeId) : "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingUser(s); setModalOpen(true); }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700" onClick={() => setDeleteTarget(s)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {staff.length === 0 && <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No staff yet.</p>}

      <UserFormModal
        open={modalOpen}
        mode={editingUser ? "edit" : "create"}
        role="staff"
        user={editingUser}
        stores={myStores}
        onSave={handleSave}
        onCancel={() => { setModalOpen(false); setEditingUser(null); }}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        title="Delete Staff"
        message={`Are you sure you want to remove ${deleteTarget?.name}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
