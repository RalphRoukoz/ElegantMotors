import type { Vehicle } from "@/lib/types";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";
import { VehicleCard } from "./VehicleCard";

export function ElectricSection({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) return null;

  const showcase = vehicles.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#070b0f] px-4 py-20 sm:px-6 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,0.08),transparent_55%)]"
        aria-hidden
      />
      <div className="chrome-line absolute inset-x-0 top-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-sky-300/90">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-sky-300"
                  aria-hidden
                />
                Electric
              </p>
              <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-5xl">
                Electric selection
              </h2>
              <p className="mt-3 max-w-lg text-zinc-400">
                Fully electric vehicles currently available — silent power,
                modern tech, zero petrol.
              </p>
            </div>
            <ButtonLink
              href="/inventory?fuel=Electric"
              variant="outline"
              className="self-start !border-sky-300/40 !text-sky-100 hover:!border-sky-200 hover:!bg-sky-300/10 !text-[11px] !tracking-[0.18em] !uppercase"
            >
              View all electric ({vehicles.length})
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
