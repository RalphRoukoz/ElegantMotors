"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/types";
import { telHref, whatsappHref } from "@/lib/format";
import { ButtonLink } from "./ButtonLink";

export function Header({ site }: { site: SiteConfig }) {
  const primary = site.phones[0];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const wa = whatsappHref(
    primary.whatsapp,
    "Hi Elegant Motors — I'm interested in your inventory.",
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="relative block h-7 w-[110px] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-8 sm:w-[132px]"
          aria-label={`${site.byline} home`}
          onClick={() => setOpen(false)}
        >
          <Image
            src={site.logo}
            alt={site.byline}
            fill
            className="object-contain object-left"
            priority
            sizes="132px"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="Main"
        >
          <Link
            href="/inventory"
            className="cursor-pointer px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Inventory
          </Link>
          <Link
            href="/contact"
            className="cursor-pointer px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Contact
          </Link>
          <ButtonLink
            href={wa}
            variant="solid"
            external
            className="ml-1 !min-h-10 !px-4 !text-[11px] !tracking-[0.16em] !uppercase"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </ButtonLink>
          <ButtonLink
            href={telHref(primary.phone)}
            variant="outline"
            external
            className="!min-h-10 !px-4 !text-[11px] !tracking-[0.16em] !uppercase"
            aria-label={`Call ${primary.display}`}
          >
            Call
          </ButtonLink>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center bg-accent px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-on-accent transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Chat on WhatsApp"
          >
            WA
          </a>
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 cursor-pointer flex-col items-center justify-center gap-1.5 border border-white/20 px-2 transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-5 bg-white transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-white/5 bg-black/95 transition-[max-height,opacity] duration-300 ease-out ${
          open
            ? "max-h-[70vh] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-5"
          aria-label="Mobile"
        >
          <Link
            href="/inventory"
            onClick={() => setOpen(false)}
            className="min-h-12 cursor-pointer border-b border-white/5 py-3 text-sm uppercase tracking-[0.2em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Inventory
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="min-h-12 cursor-pointer border-b border-white/5 py-3 text-sm uppercase tracking-[0.2em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Contact
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="min-h-12 cursor-pointer border-b border-white/5 py-3 text-sm uppercase tracking-[0.2em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            WhatsApp
          </a>
          {site.phones.map((entry) => (
            <a
              key={entry.phone}
              href={telHref(entry.phone)}
              onClick={() => setOpen(false)}
              className="min-h-12 cursor-pointer border-b border-white/5 py-3 text-sm tracking-wide text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Call {entry.display}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
