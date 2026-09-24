import type { Vehicle } from "@/lib/types";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";
import { VehicleCard } from "./VehicleCard";

export function HybridSection({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) return null;

  const showcase = vehicles.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#0a0c09] px-4 py-20 sm:px-6 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(190,242,100,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="chrome-line absolute inset-x-0 top-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-lime-300/90">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-lime-300"
                  aria-hidden
                />
                Hybrid
              </p>
              <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-5xl">
                Hybrid selection
              </h2>
              <p className="mt-3 max-w-lg text-zinc-400">
                Hybrid and mild-hybrid vehicles currently available — efficiency
                with the performance you expect.
              </p>
            </div>
            <ButtonLink
              href="/inventory?fuel=Hybrid"
              variant="outline"
              className="self-start !border-lime-300/40 !text-lime-100 hover:!border-lime-200 hover:!bg-lime-300/10 !text-[11px] !tracking-[0.18em] !uppercase"
            >
              View all hybrid ({vehicles.length})
            </ButtonLink>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {showcase.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.slug}
              vehicle={vehicle}
              index={index}
              featured={index === 0}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
