import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { telHref, whatsappHref } from "@/lib/vehicles";
import { ButtonLink } from "./ButtonLink";

export function Header({ site }: { site: SiteConfig }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="relative block h-9 w-[140px] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Elegant Motors home"
        >
          <Image
            src={site.logo}
            alt="Elegant Motors"
            fill
            className="object-contain object-left"
            priority
            sizes="140px"
          />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <Link
            href="/inventory"
            className="cursor-pointer px-3 py-2 text-sm text-accent/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Inventory
          </Link>
          <Link
            href="/contact"
            className="hidden cursor-pointer px-3 py-2 text-sm text-accent/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:inline"
          >
            Contact
          </Link>
          <ButtonLink
            href={whatsappHref(site.whatsapp, "Hi Elegant Motors — I'm interested in your inventory.")}
            variant="solid"
            external
            className="ml-1 !min-h-10 !px-3 !text-xs sm:!px-4 sm:!text-sm"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </ButtonLink>
          <ButtonLink
            href={telHref(site.phone)}
            variant="outline"
            external
            className="hidden !min-h-10 !px-3 !text-xs sm:inline-flex sm:!text-sm"
            aria-label={`Call ${site.phoneDisplay}`}
          >
            Call
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
