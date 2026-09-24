import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { telHref, whatsappHref } from "@/lib/vehicles";

export function Footer({ site }: { site: SiteConfig }) {
  const primary = site.phones[0];

  return (
    <footer className="border-t border-white/5 bg-ink text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 md:flex-row md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-chrome">
            {site.byline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
            {site.tagline}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {site.location}
            </a>
          </p>
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
