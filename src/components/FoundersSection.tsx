import Image from "next/image";
import type { SiteConfig } from "@/lib/types";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";
import { whatsappHref } from "@/lib/format";

export function FoundersSection({
  site,
  foundersSrc,
  portraitSrc,
}: {
  site: SiteConfig;
  foundersSrc?: string;
  portraitSrc: string;
}) {
  const primary = site.phones[0];
  const imageSrc = foundersSrc || portraitSrc;
  const usingFoundersPhoto = Boolean(foundersSrc);

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="chrome-line absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-6">
          <div
            className={`relative overflow-hidden bg-muted ${
              usingFoundersPhoto ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={imageSrc}
              alt={
                usingFoundersPhoto
                  ? "Founders Dany Roukoz and Georges Roukoz of Elegant Motors"
                  : "Dany Roukoz, Elegant Motors"
              }
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              aria-hidden
            />
            {usingFoundersPhoto ? (
              <p className="absolute inset-x-0 bottom-0 z-10 p-5 text-[11px] uppercase tracking-[0.22em] text-zinc-200 sm:p-6">
                Dany Roukoz &amp; Georges Roukoz
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={0.08}>
          <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
            The founders
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Dany &amp; Georges Roukoz
          </h2>
          <p className="mt-3 text-lg text-chrome/90">{site.byline}</p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Elegant Motors was founded by brothers{" "}
            <span className="text-zinc-200">Dany Roukoz</span> and{" "}
            <span className="text-zinc-200">Georges Roukoz</span>. Together they
            built a place for people to find pre-owned luxury and performance
            cars with trust and care.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Georges has since passed away. His memory lives on in the business
            they created side by side — carried forward today by Dany with the
            same standards they shared from the beginning.
          </p>
          <p className="mt-6 text-sm italic tracking-wide text-zinc-500">
            In loving memory of Georges Roukoz
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
