import { Hero } from "@/components/Hero";
import { VehicleCard } from "@/components/VehicleCard";
import { ButtonLink } from "@/components/ButtonLink";
import {
  getFeaturedVehicles,
  getSiteConfig,
  telHref,
  whatsappHref,
} from "@/lib/vehicles";

export default function HomePage() {
  const site = getSiteConfig();
  const featured = getFeaturedVehicles();
  const heroVehicle = featured[0];
  const primary = site.phones[0];

  return (
    <>
      <Hero site={site} featured={heroVehicle} />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground">
              In stock
            </h2>
            <p className="mt-2 text-secondary">
              Current vehicles available at {site.byline}.
            </p>
          </div>
          <ButtonLink href="/inventory" variant="outline" className="!border-secondary !text-foreground hover:!bg-muted self-start">
            See all
          </ButtonLink>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {featured.slice(0, 4).map((vehicle, index) => (
            <VehicleCard
              key={vehicle.slug}
              vehicle={vehicle}
              priority={index < 2}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="bg-primary px-4 py-20 text-accent sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-white">
              Ready to view a car?
            </h2>
            <p className="mt-3 max-w-md text-accent/80">
              Message us on WhatsApp or call — we&apos;ll confirm availability
              and arrange a visit.
            </p>
            <p className="mt-4 text-sm text-accent/70">
              {site.phones.map((p) => p.display).join(" · ")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappHref(
                primary.whatsapp,
                "Hi Elegant Motors — I'd like to schedule a viewing.",
              )}
              external
            >
              WhatsApp
            </ButtonLink>
            {site.phones.map((entry) => (
              <ButtonLink
                key={entry.phone}
                href={telHref(entry.phone)}
                variant="outline"
                external
              >
                Call {entry.display}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
