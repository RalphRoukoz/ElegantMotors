import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteConfig } from "@/lib/vehicles";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const site = getSiteConfig();

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Available inventory`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    images: [site.logo],
  },
  icons: {
    icon: site.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased`}>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
