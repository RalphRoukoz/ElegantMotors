import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { formatMileage, formatPrice, getVehicleImagePath } from "@/lib/format";

export function VehicleCard({
  vehicle,
  priority = false,
  index = 0,
  featured = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
  index?: number;
  featured?: boolean;
}) {
  const cover = vehicle.images[0];
  const mileage = formatMileage(vehicle);
  const meta = [vehicle.year, vehicle.bodyType, mileage].filter(Boolean).join(" · ");
  const fuelLabel = (vehicle.fuel ?? "").toLowerCase();
  const isElectric = fuelLabel === "electric";
  const isHybrid = fuelLabel.includes("hybrid");
  const photoCount = vehicle.images.length;

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className={`group inventory-tile block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
      style={{ animationDelay: `${Math.min(index, 10) * 50}ms` }}
    >
      <article className="relative h-full min-h-[280px] sm:min-h-[320px]">
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[16/11] sm:aspect-auto sm:h-full sm:min-h-[560px]" : "aspect-[4/5] sm:aspect-[5/6]"
          }`}
        >
          {cover ? (
            <Image
              src={getVehicleImagePath(vehicle, cover)}
              alt={vehicle.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
            />
          ) : null}
          {(isElectric || isHybrid || photoCount > 1) && (
            <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
              {isElectric ? (
                <span className="border border-sky-300/50 bg-black/55 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                  Electric
                </span>
              ) : null}
              {isHybrid ? (
                <span className="border border-lime-300/50 bg-black/55 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-lime-200 backdrop-blur-sm">
                  Hybrid
                </span>
              ) : null}
              {photoCount > 1 ? (
                <span className="border border-white/20 bg-black/55 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-sm">
                  {photoCount} photos
                </span>
              ) : null}
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-300/90">
            {vehicle.make}
          </p>
          <h3
            className={`mt-2 font-medium tracking-tight text-white ${
              featured ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"
            }`}
          >
            {vehicle.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-zinc-400">{meta}</p>
            <p className="text-sm text-chrome">{formatPrice(vehicle)}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
