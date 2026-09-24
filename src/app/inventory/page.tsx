import type { Metadata } from "next";
import { InventoryGrid } from "@/components/InventoryGrid";
import { Reveal } from "@/components/Reveal";
import { getAvailableVehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Browse available vehicles at Elegant Motors.",
};

type Props = {
  searchParams: Promise<{ fuel?: string }>;
};

export default async function InventoryPage({ searchParams }: Props) {
  const vehicles = getAvailableVehicles();
  const params = await searchParams;
  const initialFuel = params.fuel?.trim() || "all";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6">
      <Reveal>
        <header className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
            Collection
          </p>
          <h1 className="mt-3 text-5xl font-medium tracking-tight text-white sm:text-6xl">
            Inventory
          </h1>
          <p className="mt-4 text-zinc-500">
            {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} available
          </p>
        </header>
      </Reveal>
      <InventoryGrid
        vehicles={vehicles}
        featuredFirst
        initialFuel={initialFuel}
      />
    </div>
  );
}
