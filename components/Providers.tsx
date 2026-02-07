"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { SearchHistoryProvider } from "@/context/SearchHistoryContext";
import { UsersProvider } from "@/context/UsersContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { StoresProvider } from "@/context/StoresContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { Toast } from "@/components/feedback/Toast";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProductsProvider>
          <StoresProvider>
            <ActivityProvider>
              <ToastProvider>
                <SearchHistoryProvider>
                  {props.children}
                  <Toast />
                </SearchHistoryProvider>
              </ToastProvider>
            </ActivityProvider>
          </StoresProvider>
        </ProductsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
