"use client";

import React, { useState } from "react";
import { useStores } from "@/context/StoresContext";
import { Card, CardContent } from "@/components/ui/Card";

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function PharmaciesPage() {
  const { stores } = useStores();
  const [cityFilter, setCityFilter] = useState("");
  const cities = Array.from(new Set(stores.flatMap((s) => [s.city, s.municipality]).filter(Boolean))).sort();
  const filtered = cityFilter
    ? stores.filter((s) => s.city === cityFilter || s.municipality === cityFilter)
    : stores;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
          Pharmacy Locations
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Find pharmacies near you. Filter by city or municipality.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label htmlFor="pharmacy-location" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
          Filter by location
        </label>
        <select
          id="pharmacy-location"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent min-w-[200px]"
        >
          <option value="">All locations</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((store) => (
          <Card key={store.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <LocationIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-lg">{store.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 flex items-start gap-2">
                    <LocationIcon className="w-4 h-4 shrink-0 mt-0.5 text-zinc-400" />
                    <span>{store.address}</span>
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{store.municipality}, {store.city}</p>
                </div>
              </div>
              <div className="mt-4 h-36 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Map placeholder</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 px-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center mb-4">
            <LocationIcon className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 font-medium">No pharmacies in this location</p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Try selecting a different location or view all pharmacies.</p>
        </div>
      )}
    </div>
  );
}
