"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

export function InventoryGrid({
  vehicles,
  featuredFirst = false,
  initialFuel = "all",
}: {
  vehicles: Vehicle[];
  featuredFirst?: boolean;
  initialFuel?: string;
}) {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("all");
  const [bodyType, setBodyType] = useState("all");
  const [fuel, setFuel] = useState(initialFuel);

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
  const fuels = useMemo(() => {
    const set = new Set<string>();
    for (const v of vehicles) {
      if (!v.fuel) continue;
      const f = v.fuel.toLowerCase();
      if (f.includes("hybrid")) set.add("Hybrid");
      else if (f === "electric") set.add("Electric");
      else set.add(v.fuel);
    }
    const order = ["Electric", "Hybrid", "Petrol", "Diesel"];
    return Array.from(set).sort(
      (a, b) =>
        (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) -
          (order.indexOf(b) === -1 ? 99 : order.indexOf(b)) ||
        a.localeCompare(b),
    );
  }, [vehicles]);

  const filtered = vehicles.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q);
    const matchesMake = make === "all" || v.make === make;
    const matchesBody = bodyType === "all" || v.bodyType === bodyType;
    const vehicleFuel = (v.fuel ?? "").toLowerCase();
    const selectedFuel = fuel.toLowerCase();
    const matchesFuel =
      fuel === "all" ||
      (selectedFuel === "hybrid"
        ? vehicleFuel.includes("hybrid")
        : vehicleFuel === selectedFuel);
    return matchesQuery && matchesMake && matchesBody && matchesFuel;
  });

  const chipAccent = (f: string) =>
    f === "Electric" ? "electric" : f === "Hybrid" ? "hybrid" : false;

  const chipClass = (active: boolean, accent: false | "electric" | "hybrid" = false) =>
    `min-h-10 cursor-pointer whitespace-nowrap border px-4 text-xs uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
      active
        ? accent === "electric"
          ? "border-sky-300 bg-sky-300 text-on-accent"
          : accent === "hybrid"
            ? "border-lime-300 bg-lime-300 text-on-accent"
            : "border-accent bg-accent text-on-accent"
        : accent === "electric"
          ? "border-sky-300/35 bg-transparent text-sky-200/80 hover:border-sky-300/70 hover:text-sky-100"
          : accent === "hybrid"
            ? "border-lime-300/35 bg-transparent text-lime-200/80 hover:border-lime-300/70 hover:text-lime-100"
            : "border-border bg-transparent text-zinc-400 hover:border-zinc-500 hover:text-white"
    }`;

  return (
    <div>
      <div className="mb-8 space-y-5">
        <label className="block">
          <span className="sr-only">Search inventory</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search make or model…"
            className="min-h-12 w-full border-b border-border bg-transparent px-1 text-base text-foreground outline-none transition placeholder:text-zinc-600 focus:border-accent"
          />
        </label>

        {fuels.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={chipClass(fuel === "all")}
              onClick={() => setFuel("all")}
            >
              All powertrains
            </button>
            {fuels.map((f) => (
              <button
                key={f}
                type="button"
                className={chipClass(
                  fuel.toLowerCase() === f.toLowerCase(),
                  chipAccent(f),
                )}
                onClick={() => setFuel(f)}
              >
                {f}
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={chipClass(make === "all")}
            onClick={() => setMake("all")}
          >
            All makes
          </button>
          {makes.map((m) => (
            <button
              key={m}
              type="button"
              className={chipClass(make === m)}
              onClick={() => setMake(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={chipClass(bodyType === "all")}
            onClick={() => setBodyType("all")}
          >
            All bodies
          </button>
          {bodyTypes.map((b) => (
            <button
              key={b}
              type="button"
              className={chipClass(bodyType === b)}
              onClick={() => setBodyType(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-zinc-500">
          No vehicles match these filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {filtered.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.slug}
              vehicle={vehicle}
              index={index}
              priority={index < 2}
              featured={featuredFirst && index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
