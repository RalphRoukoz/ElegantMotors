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

      <div className="mt-14 space-y-10 border-t border-white/10 pt-12">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Location
          </h2>
          <p className="mt-3 text-lg text-zinc-200">{site.location}</p>
          <div className="mt-5">
            <ButtonLink
              href={site.mapsUrl}
              external
              className="!min-h-12 !gap-2.5 !px-6 !text-[11px] !tracking-[0.16em] !uppercase"
              aria-label={`Open ${site.location} in Google Maps`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[1.1rem] w-[1.1rem]"
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
