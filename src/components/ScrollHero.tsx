"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import type { SiteConfig, Vehicle } from "@/lib/types";
import { getVehicleImagePath, telHref, whatsappHref } from "@/lib/format";
import { ButtonLink } from "./ButtonLink";

gsap.registerPlugin(ScrollTrigger);

export function ScrollHero({
  site,
  featured,
  showroomBg,
}: {
  site: SiteConfig;
  featured?: Vehicle;
  showroomBg?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const heroImage =
    featured && featured.images[0]
      ? getVehicleImagePath(featured, featured.images[0])
      : showroomBg || site.logo;
  const primary = site.phones[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        tl.to(media.current, { scale: 1.18, yPercent: 12, ease: "none" }, 0);
        tl.to(
          content.current,
          { yPercent: -18, opacity: 0.15, ease: "none" },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <div ref={media} className="absolute inset-0 will-change-transform">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]"
          aria-hidden
        />
      </div>

      <div
        ref={content}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 will-change-transform"
      >
        <div className="relative mb-8 h-[72px] w-[240px] sm:h-24 sm:w-[320px] animate-fade-up">
          <Image
            src={site.logo}
            alt={site.byline}
            fill
            className="object-contain object-left drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)]"
            sizes="320px"
            priority
          />
        </div>
        <p className="animate-fade-up mb-5 text-[11px] uppercase tracking-[0.35em] text-chrome/80 sm:text-xs">
          {site.byline}
        </p>
        <h1 className="animate-fade-up-delay max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Available now
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-base text-zinc-300 sm:text-lg">
          {site.tagline}
        </p>
        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/inventory" className="!px-7 !text-[13px] !tracking-[0.12em] !uppercase">
            View inventory
          </ButtonLink>
          <ButtonLink
            href={whatsappHref(
              primary.whatsapp,
              "Hi Elegant Motors — I'd like to know what's available.",
            )}
            variant="outline"
            external
            className="!px-7 !text-[13px] !tracking-[0.12em] !uppercase"
          >
            WhatsApp
          </ButtonLink>
          <ButtonLink
            href={telHref(primary.phone)}
            variant="ghost"
            external
            className="!text-[13px] !tracking-[0.12em] !uppercase"
          >
            Call
          </ButtonLink>
        </div>
        <div className="mt-16 hidden items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-zinc-500 sm:flex">
          <span className="block h-8 w-px bg-zinc-600" aria-hidden />
          Scroll
        </div>
      </div>
    </section>
  );
}
