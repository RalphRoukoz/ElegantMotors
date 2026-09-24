import { existsSync } from "fs";
import path from "path";
import { ScrollHero } from "@/components/ScrollHero";
import { OwnerSection } from "@/components/OwnerSection";
import { VehicleCard } from "@/components/VehicleCard";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import {
  getAvailableVehicles,
  getElectricVehicles,
  getHybridVehicles,
  getSiteConfig,
  telHref,
  whatsappHref,
} from "@/lib/vehicles";
import { ElectricSection } from "@/components/ElectricSection";
import { HybridSection } from "@/components/HybridSection";

function publicAsset(rel: string): string | undefined {
  const full = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
  return existsSync(full) ? rel : undefined;
}

export default function HomePage() {
  const site = getSiteConfig();
  const vehicles = getAvailableVehicles();
  const electricVehicles = getElectricVehicles();
  const hybridVehicles = getHybridVehicles();
  const featured = vehicles.slice(0, 6);
  const heroVehicle = featured[0];
  const primary = site.phones[0];
  const showroomBg = publicAsset("/brand/showroom-hero.jpg");
  const portrait = "/brand/dany-roukoz.jpg";

  return (
    <>
      <ScrollHero
        site={site}
        featured={heroVehicle}
        showroomBg={showroomBg}
      />

      <section className="bg-background px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                  Selection
                </p>
                <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-5xl">
                  In stock
                </h2>
                <p className="mt-3 max-w-md text-zinc-500">
                  Current vehicles available at Elegant Motors.
                </p>
              </div>
              <ButtonLink
                href="/inventory"
                variant="outline"
                className="self-start !text-[11px] !tracking-[0.18em] !uppercase"
              >
                See all {vehicles.length}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {featured.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.slug}
                vehicle={vehicle}
                priority={index < 2}
                index={index}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <ElectricSection vehicles={electricVehicles} />

      <HybridSection vehicles={hybridVehicles} />

      <OwnerSection site={site} portraitSrc={portrait} />

      <section className="relative bg-primary px-4 py-24 sm:px-6 sm:py-28">
        <div className="chrome-line absolute inset-x-0 top-0" aria-hidden />
        <Reveal>
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                Private viewing
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-medium tracking-tight text-white sm:text-5xl">
                Ready to see a car in person?
              </h2>
              <p className="mt-5 max-w-md text-zinc-400">
                WhatsApp or call — we&apos;ll confirm availability and arrange a
                visit at the showroom.
              </p>
              <p className="mt-5 text-sm tracking-wide text-zinc-500">
                {site.phones.map((p) => p.display).join("  ·  ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={whatsappHref(
                  primary.whatsapp,
                  "Hi Elegant Motors — I'd like to schedule a viewing.",
                )}
                external
                className="!text-[11px] !tracking-[0.18em] !uppercase"
              >
                WhatsApp
              </ButtonLink>
              {site.phones.map((entry) => (
                <ButtonLink
                  key={entry.phone}
                  href={telHref(entry.phone)}
                  variant="outline"
                  external
                  className="!text-[11px] !tracking-[0.14em] !uppercase"
                >
                  {entry.display}
                </ButtonLink>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
