"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { useStores } from "@/context/StoresContext";
import { useSearchHistory } from "@/context/SearchHistoryContext";
import { useProductSearch } from "@/hooks/useProductSearch";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSearch } from "@/components/products/ProductSearch";
import { SortControls } from "@/components/products/SortControls";
import { Button } from "@/components/ui/Button";

function CustomerHomeContent() {
  const { products } = useProducts();
  const { stores } = useStores();
  const { addHistory } = useSearchHistory();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const {
    products: filteredProducts,
    query,
    setSearchQuery,
    sort,
    setSortOption,
    filters,
    setProductFilters,
    categories,
    cities,
    storeById,
  } = useProductSearch({ products, stores });

  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery);
  }, []);

  useEffect(() => {
    if (query.trim()) addHistory(query);
  }, [query, addHistory]);

  const handleContactSupplier = (storeId: string) => {
    const store = storeById.get(storeId);
    if (store) {
      window.location.href = `mailto:contact@pharmacy.com?subject=Inquiry about product at ${encodeURIComponent(store.name)}`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
          Find Medicines & Medical Supplies
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Search by name, brand, or category. View availability and locate nearby pharmacies.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <ProductSearch value={query} onChange={setSearchQuery} />
        <SortControls value={sort} onChange={setSortOption} />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Filters:</span>
        <select
          value={filters.category ?? ""}
          onChange={(e) => setProductFilters((f) => ({ ...f, category: e.target.value || undefined }))}
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filters.city ?? ""}
          onChange={(e) => setProductFilters((f) => ({ ...f, city: e.target.value || undefined }))}
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm"
        >
          <option value="">All locations</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filters.storeId ?? ""}
          onChange={(e) => setProductFilters((f) => ({ ...f, storeId: e.target.value || undefined }))}
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm"
        >
          <option value="">All stores</option>
          {stores.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {(filters.category || filters.city || filters.storeId) && (
          <Button variant="ghost" size="sm" onClick={() => setProductFilters({})}>
            Clear filters
          </Button>
        )}
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-zinc-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-1">No products found</p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Try adjusting your search or filters to see more results.</p>
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              storeName={storeById.get(product.storeId)?.name ?? "Unknown"}
              onContactSupplier={() => handleContactSupplier(product.storeId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomerHomePage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto py-8 text-zinc-500">Loading...</div>}>
      <CustomerHomeContent />
    </Suspense>
  );
}
