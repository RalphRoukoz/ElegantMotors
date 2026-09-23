"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

export function InventoryGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("all");
  const [bodyType, setBodyType] = useState("all");

  const makes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make))).sort(),
    [vehicles],
  );
  const bodyTypes = useMemo(
    () =>
      Array.from(
        new Set(vehicles.map((v) => v.bodyType).filter(Boolean) as string[]),
      ).sort(),
    [vehicles],
  );

  const filtered = vehicles.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q);
    const matchesMake = make === "all" || v.make === make;
    const matchesBody = bodyType === "all" || v.bodyType === bodyType;
    return matchesQuery && matchesMake && matchesBody;
  });

  return (
    <div>
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1.5 block text-secondary">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Make, model…"
            className="min-h-11 w-full border border-muted bg-surface px-3 text-foreground outline-none transition focus:border-secondary focus:ring-2 focus:ring-accent/40"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-secondary">Make</span>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="min-h-11 w-full cursor-pointer border border-muted bg-surface px-3 text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-accent/40"
          >
            <option value="all">All makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-secondary">Body type</span>
          <select
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
            className="min-h-11 w-full cursor-pointer border border-muted bg-surface px-3 text-foreground outline-none focus:border-secondary focus:ring-2 focus:ring-accent/40"
          >
            <option value="all">All types</option>
            {bodyTypes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-secondary">
          No vehicles match these filters.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle, index) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
