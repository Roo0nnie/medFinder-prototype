"use client";

import React, { useState } from "react";
import { initialStores } from "@/lib/data/stores";
import { Card, CardContent } from "@/components/ui/Card";

export default function PharmaciesPage() {
  const [cityFilter, setCityFilter] = useState("");
  const cities = Array.from(new Set(initialStores.flatMap((s) => [s.city, s.municipality]).filter(Boolean))).sort();
  const filtered = cityFilter
    ? initialStores.filter((s) => s.city === cityFilter || s.municipality === cityFilter)
    : initialStores;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">Pharmacies</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Find pharmacies by location</p>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Filter by location</label>
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
        >
          <option value="">All locations</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((store) => (
          <Card key={store.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-zinc-700 dark:text-zinc-100">{store.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{store.address}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">{store.municipality}, {store.city}</p>
              <div className="mt-3 h-32 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm">
                Map placeholder
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">No pharmacies in this location.</p>
      )}
    </div>
  );
}
