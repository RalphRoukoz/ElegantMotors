import type { Metadata } from "next";
import { InventoryGrid } from "@/components/InventoryGrid";
import { getAvailableVehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Browse available vehicles at Elegant Motors.",
};

export default function InventoryPage() {
  const vehicles = getAvailableVehicles();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-medium tracking-tight text-foreground">
          Inventory
        </h1>
        <p className="mt-3 text-secondary">
          {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} available
        </p>
      </header>
      <InventoryGrid vehicles={vehicles} />
    </div>
  );
}
