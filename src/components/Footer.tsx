import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { telHref, whatsappHref } from "@/lib/vehicles";

export function Footer({ site }: { site: SiteConfig }) {
  const primary = site.phones[0];

  return (
    <footer className="border-t border-white/10 bg-primary text-accent">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent/70">
            {site.byline}
          </p>
          <p className="mt-3 max-w-sm text-sm text-accent/80">{site.tagline}</p>
          <p className="mt-2 text-sm text-accent/60">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
              Call {entry.display}
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
            Instagram {site.instagramHandle}
          </a>
          <Link
            href="/inventory"
            className="cursor-pointer transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View inventory
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-accent/40">
        © {new Date().getFullYear()} {site.byline}
      </div>
    </footer>
  );
}
