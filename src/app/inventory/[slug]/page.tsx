import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { VehicleGallery } from "@/components/VehicleGallery";
import {
  formatMileage,
  formatPrice,
  getAllVehicles,
  getSiteConfig,
  getVehicleBySlug,
  getVehicleImagePath,
  telHref,
  whatsappHref,
} from "@/lib/vehicles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllVehicles().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle" };
  return {
    title: vehicle.title,
    description: vehicle.description.slice(0, 160),
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle || vehicle.status !== "available") notFound();

  const site = getSiteConfig();
  const primary = site.phones[0];
  const images = vehicle.images.map((image) => ({
    src: getVehicleImagePath(vehicle, image),
    alt: vehicle.title,
  }));

  const specs: { label: string; value: string }[] = [
    { label: "Year", value: String(vehicle.year) },
    { label: "Make", value: vehicle.make },
    { label: "Model", value: vehicle.model },
    ...(vehicle.bodyType
      ? [{ label: "Body", value: vehicle.bodyType }]
      : []),
    ...(formatMileage(vehicle)
      ? [{ label: "Mileage", value: formatMileage(vehicle)! }]
      : []),
    ...(vehicle.transmission
      ? [{ label: "Transmission", value: vehicle.transmission }]
      : []),
    ...(vehicle.fuel ? [{ label: "Fuel", value: vehicle.fuel }] : []),
    ...(vehicle.color ? [{ label: "Color", value: vehicle.color }] : []),
  ];

  const waMessage = `Hi Elegant Motors — I'm interested in the ${vehicle.title}.`;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6">
      <Link
        href="/inventory"
        className="mb-10 inline-block cursor-pointer text-[11px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        ← Inventory
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <VehicleGallery images={images} />

        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            {vehicle.make}
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-5xl">
            {vehicle.title}
          </h1>
          <p className="mt-4 text-lg text-chrome">{formatPrice(vehicle)}</p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/10 py-8 text-sm">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {spec.label}
                </dt>
                <dd className="mt-1.5 font-medium text-zinc-200">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-zinc-400">
            {vehicle.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappHref(primary.whatsapp, waMessage)}
              external
              className="!text-[11px] !tracking-[0.16em] !uppercase"
            >
              WhatsApp about this car
            </ButtonLink>
            {site.phones.map((entry) => (
              <ButtonLink
                key={entry.phone}
                href={telHref(entry.phone)}
                variant="outline"
                external
                className="!text-[11px] !tracking-[0.12em] !uppercase"
              >
                Call {entry.display}
              </ButtonLink>
            ))}
          </div>

          {vehicle.instagramUrl ? (
            <a
              href={vehicle.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block cursor-pointer text-sm text-zinc-500 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Instagram post
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
