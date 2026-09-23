import Image from "next/image";
import type { SiteConfig, Vehicle } from "@/lib/types";
import { getVehicleImagePath, telHref, whatsappHref } from "@/lib/vehicles";
import { ButtonLink } from "./ButtonLink";

export function Hero({
  site,
  featured,
}: {
  site: SiteConfig;
  featured?: Vehicle;
}) {
  const heroImage =
    featured && featured.images[0]
      ? getVehicleImagePath(featured, featured.images[0])
      : site.logo;
  const primary = site.phones[0];

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-primary">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
        <div className="relative mb-6 h-16 w-[220px] sm:h-20 sm:w-[280px] animate-fade-up">
          <Image
            src={site.logo}
            alt={site.byline}
            fill
            className="object-contain object-left"
            sizes="280px"
            priority
          />
        </div>
        <p className="animate-fade-up mb-4 text-sm uppercase tracking-[0.22em] text-accent/85">
          {site.byline}
        </p>
        <h1 className="animate-fade-up-delay max-w-xl text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
          Available now
        </h1>
        <p className="animate-fade-up-delay-2 mt-4 max-w-md text-base text-accent/90 sm:text-lg">
          {site.tagline}
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/inventory">View inventory</ButtonLink>
          <ButtonLink
            href={whatsappHref(
              primary.whatsapp,
              "Hi Elegant Motors — I'd like to know what's available.",
            )}
            variant="outline"
            external
          >
            WhatsApp
          </ButtonLink>
          <ButtonLink href={telHref(primary.phone)} variant="ghost" external>
            Call {primary.display}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
