import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { formatMileage, formatPrice, getVehicleImagePath } from "@/lib/format";

export function VehicleCard({
  vehicle,
  priority = false,
  index = 0,
}: {
  vehicle: Vehicle;
  priority?: boolean;
  index?: number;
}) {
  const cover = vehicle.images[0];
  const mileage = formatMileage(vehicle);

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <article className="animate-fade-up">
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          {cover ? (
            <Image
              src={getVehicleImagePath(vehicle, cover)}
              alt={vehicle.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : null}
        </div>
        <div className="pt-4">
          <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-secondary">
            {vehicle.title}
          </h3>
          <p className="mt-1 text-sm text-secondary">
            {[mileage, vehicle.bodyType].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {formatPrice(vehicle)}
          </p>
        </div>
      </article>
    </Link>
  );
}
