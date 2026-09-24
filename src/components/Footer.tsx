import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { telHref, whatsappHref } from "@/lib/vehicles";
import { ButtonLink } from "./ButtonLink";

function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.33 7-11a7 7 0 10-14 0c0 5.67 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export function Footer({ site }: { site: SiteConfig }) {
  const primary = site.phones[0];

  return (
    <footer className="border-t border-white/5 bg-ink text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-md">
          <p className="text-[11px] uppercase tracking-[0.3em] text-chrome">
            {site.byline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            {site.tagline}
          </p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Find us
            </p>
            <p className="mt-2 text-sm text-zinc-300">{site.location}</p>
            <ButtonLink
              href={site.mapsUrl}
              external
              className="mt-4 !min-h-12 !gap-2.5 !px-5 !text-[11px] !tracking-[0.16em] !uppercase"
              aria-label={`Open ${site.location} in Google Maps`}
            >
              <PinIcon className="h-[1.1rem] w-[1.1rem]" />
              Open in Google Maps
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          {site.phones.map((entry) => (
            <a
              key={entry.phone}
              href={telHref(entry.phone)}
              className="cursor-pointer transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {entry.display}
            </a>
          ))}
          <a
            href={whatsappHref(primary.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            WhatsApp
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {site.instagramHandle}
          </a>
          <Link
            href="/inventory"
            className="cursor-pointer transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Inventory
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-[11px] tracking-[0.18em] text-zinc-600 uppercase">
        © {new Date().getFullYear()} {site.byline}
      </div>
    </footer>
  );
}
