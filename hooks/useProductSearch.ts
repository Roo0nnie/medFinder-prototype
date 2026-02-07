"use client";

import { useMemo, useState, useCallback } from "react";
import { searchProducts } from "@/lib/search/fullTextSearch";
import type { Product } from "@/lib/types";
import type { Store } from "@/lib/types";

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  storeId?: string;
  city?: string;
}

interface UseProductSearchOptions {
  products: Product[];
  stores?: Store[];
}

export function useProductSearch({ products, stores = [] }: UseProductSearchOptions) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [filters, setFilters] = useState<ProductFilters>({});

  const storeById = useMemo(() => new Map(stores.map((s) => [s.id, s])), [stores]);

  const filtered = useMemo(() => {
    let result = searchProducts(products, query);
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.priceMin != null) {
      result = result.filter((p) => p.price >= filters.priceMin!);
    }
    if (filters.priceMax != null) {
      result = result.filter((p) => p.price <= filters.priceMax!);
    }
    if (filters.storeId) {
      result = result.filter((p) => p.storeId === filters.storeId);
    }
    if (filters.city) {
      const storeIdsInCity = new Set(
        stores.filter((s) => s.city === filters.city || s.municipality === filters.city).map((s) => s.id)
      );
      result = result.filter((p) => storeIdsInCity.has(p.storeId));
    }
    return result;
  }, [products, query, filters, stores]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "name-asc":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [filtered, sort]);

  const setSearchQuery = useCallback((q: string) => setQuery(q), []);
  const setSortOption = useCallback((s: SortOption) => setSort(s), []);
  const setProductFilters = useCallback((f: ProductFilters | ((prev: ProductFilters) => ProductFilters)) => {
    setFilters((p) => (typeof f === "function" ? f(p) : f));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set).sort();
  }, [products]);

  const cities = useMemo(() => {
    const set = new Set(stores.flatMap((s) => [s.city, s.municipality]).filter(Boolean));
    return Array.from(set).sort();
  }, [stores]);

  return {
    products: sorted,
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
  };
}
