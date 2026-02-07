"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/context/ProductsContext";
import { useSearchHistory } from "@/context/SearchHistoryContext";
import { useProductSearch } from "@/hooks/useProductSearch";
import { initialStores } from "@/lib/data/stores";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSearch } from "@/components/products/ProductSearch";
import { SortControls } from "@/components/products/SortControls";
import { Button } from "@/components/ui/Button";

function CustomerHomeContent() {
  const { user } = useAuth();
  const { products } = useProducts();
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
    stores,
    storeById,
  } = useProductSearch({ products, stores: initialStores });

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
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Product Finder</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Search for medicines and medical supplies</p>

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
        <div className="text-center py-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">No products found. Try adjusting your search or filters.</p>
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

      <div className="flex gap-4 pt-4">
        <Link href="/pharmacies">
          <Button variant="secondary">View Pharmacies</Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">Contact & Feedback</Button>
        </Link>
      </div>
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
