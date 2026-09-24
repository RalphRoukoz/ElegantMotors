import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { telHref, whatsappHref } from "@/lib/vehicles";
import { ButtonLink } from "./ButtonLink";

export function Header({ site }: { site: SiteConfig }) {
  const primary = site.phones[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="relative block h-8 w-[132px] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`${site.byline} home`}
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

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <Link
            href="/inventory"
            className="cursor-pointer px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Inventory
          </Link>
          <Link
            href="/contact"
            className="hidden cursor-pointer px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:inline"
          >
            Contact
          </Link>
          <ButtonLink
            href={whatsappHref(
              primary.whatsapp,
              "Hi Elegant Motors — I'm interested in your inventory.",
            )}
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
            className="hidden !min-h-10 !px-4 !text-[11px] !tracking-[0.16em] !uppercase sm:inline-flex"
            aria-label={`Call ${primary.display}`}
          >
            Call
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
