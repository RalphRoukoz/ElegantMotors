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
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
      <h1 className="text-4xl font-medium tracking-tight text-foreground">
        Contact
      </h1>
      <p className="mt-4 text-lg text-foreground">{site.byline}</p>
      <p className="mt-2 text-lg text-secondary">{site.tagline}</p>
      <p className="mt-2 text-secondary">
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {site.location}
        </a>
      </p>

      <div className="mt-12 space-y-6 border-t border-muted pt-10">
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-secondary">
            Location
          </h2>
          <div className="mt-3">
            <ButtonLink
              href={site.mapsUrl}
              external
              className="!bg-primary !text-accent hover:!bg-secondary"
            >
              Open in Google Maps
            </ButtonLink>
          </div>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-secondary">
            Phone
          </h2>
          <ul className="mt-3 space-y-3">
            {site.phones.map((entry) => (
              <li key={entry.phone}>
                <a
                  href={telHref(entry.phone)}
                  className="inline-block cursor-pointer text-2xl text-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {entry.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-secondary">
            WhatsApp
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {site.phones.map((entry) => (
              <ButtonLink
                key={entry.whatsapp}
                href={whatsappHref(
                  entry.whatsapp,
                  "Hi Elegant Motors — I'd like more information.",
                )}
                external
                className="!bg-primary !text-accent hover:!bg-secondary"
              >
                WhatsApp {entry.display}
              </ButtonLink>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-secondary">
            Instagram
          </h2>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block cursor-pointer text-lg text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
