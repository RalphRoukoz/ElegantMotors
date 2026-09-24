import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { getSiteConfig, telHref, whatsappHref } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call or WhatsApp Elegant Motors by Dany Roukoz in Beirut.",
};

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
        Get in touch
      </p>
      <h1 className="mt-3 text-5xl font-medium tracking-tight text-white sm:text-6xl">
        Contact
      </h1>
      <p className="mt-5 text-lg text-chrome">{site.byline}</p>
      <p className="mt-2 text-zinc-500">{site.tagline}</p>
      <p className="mt-3 text-zinc-400">
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {site.location}
        </a>
      </p>

      <div className="mt-14 space-y-10 border-t border-white/10 pt-12">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Location
          </h2>
          <div className="mt-4">
            <ButtonLink
              href={site.mapsUrl}
              external
              className="!text-[11px] !tracking-[0.16em] !uppercase"
            >
              Open in Google Maps
            </ButtonLink>
          </div>
        </div>
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Phone
          </h2>
          <ul className="mt-4 space-y-3">
            {site.phones.map((entry) => (
              <li key={entry.phone}>
                <a
                  href={telHref(entry.phone)}
                  className="inline-block cursor-pointer text-2xl text-white transition-colors hover:text-chrome focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {entry.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            WhatsApp
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {site.phones.map((entry) => (
              <ButtonLink
                key={entry.whatsapp}
                href={whatsappHref(
                  entry.whatsapp,
                  "Hi Elegant Motors — I'd like more information.",
                )}
                external
                className="!text-[11px] !tracking-[0.14em] !uppercase"
              >
                WhatsApp {entry.display}
              </ButtonLink>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Instagram
          </h2>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block cursor-pointer text-lg text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
