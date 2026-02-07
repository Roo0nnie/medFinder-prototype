"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { SearchHistoryProvider } from "@/context/SearchHistoryContext";
import { UsersProvider } from "@/context/UsersContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { Toast } from "@/components/feedback/Toast";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProductsProvider>
          <ActivityProvider>
            <ToastProvider>
              <SearchHistoryProvider>
                {props.children}
                <Toast />
              </SearchHistoryProvider>
            </ToastProvider>
          </ActivityProvider>
        </ProductsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
