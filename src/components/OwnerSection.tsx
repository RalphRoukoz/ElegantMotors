import Image from "next/image";
import type { SiteConfig } from "@/lib/types";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";
import { whatsappHref } from "@/lib/format";

export function OwnerSection({
  site,
  portraitSrc,
}: {
  site: SiteConfig;
  portraitSrc: string;
}) {
  const primary = site.phones[0];

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="chrome-line absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={portraitSrc}
              alt="Dany Roukoz, Elegant Motors"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
            The owner
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Dany Roukoz
          </h2>
          <p className="mt-3 text-lg text-chrome/90">{site.byline}</p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            A personal approach to sourcing and presenting pre-owned luxury and
            performance cars in Beirut. Every vehicle is selected with care —
            then made available for you to view, ask about, and drive with
            confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink
              href={whatsappHref(
                primary.whatsapp,
                "Hi Dany — I'd like to speak about a vehicle at Elegant Motors.",
              )}
              external
              className="!px-6 !text-[13px] !tracking-[0.12em] !uppercase"
            >
              Message Dany
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="outline"
              className="!px-6 !text-[13px] !tracking-[0.12em] !uppercase"
            >
              Visit showroom
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
