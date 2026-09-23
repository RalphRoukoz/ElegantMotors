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
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <Link
        href="/inventory"
        className="mb-8 inline-block cursor-pointer text-sm text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        ← Back to inventory
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <VehicleGallery images={images} />

        <div>
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            {vehicle.title}
          </h1>
          <p className="mt-3 text-xl text-foreground">{formatPrice(vehicle)}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-muted py-6 text-sm">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-secondary">{spec.label}</dt>
                <dd className="mt-1 font-medium text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-secondary">
            {vehicle.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappHref(site.whatsapp, waMessage)}
              external
              className="!bg-primary !text-accent hover:!bg-secondary"
            >
              WhatsApp about this car
            </ButtonLink>
            <ButtonLink
              href={telHref(site.phone)}
              variant="outline"
              external
              className="!border-secondary !text-foreground hover:!bg-muted"
            >
              Call {site.phoneDisplay}
            </ButtonLink>
          </div>

          {vehicle.instagramUrl ? (
            <a
              href={vehicle.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block cursor-pointer text-sm text-secondary underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View original Instagram post
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
