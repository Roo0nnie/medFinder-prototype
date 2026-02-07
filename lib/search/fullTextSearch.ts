import MiniSearch from "minisearch";
import type { Product } from "@/lib/types";

let searchIndex: MiniSearch<Product> | null = null;

function buildIndex(products: Product[]): MiniSearch<Product> {
  const index = new MiniSearch<Product>({
    fields: ["name", "brand", "category", "description", "dosage"],
    storeFields: ["id", "name", "brand", "category", "dosage", "description", "price", "quantity", "supplier", "storeId", "lowStockThreshold", "unit"],
    searchOptions: {
      boost: { name: 2, brand: 1.5, category: 1 },
      fuzzy: 0.2,
    },
  });
  index.addAll(products);
  return index;
}

export function initSearchIndex(products: Product[]): void {
  searchIndex = buildIndex(products);
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  initSearchIndex(products);
  if (!searchIndex) return products;

  const results = searchIndex.search(query, { prefix: true });
  const ids = new Set(results.map((r) => r.id));
  const productMap = new Map(products.map((p) => [p.id, p]));
  return results.map((r) => productMap.get(r.id)!).filter(Boolean);
}
