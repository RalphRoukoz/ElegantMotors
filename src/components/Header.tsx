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
            className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center bg-accent text-on-accent transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Chat on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
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
