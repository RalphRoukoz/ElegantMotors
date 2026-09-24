import fs from "fs";
import path from "path";
import type { SiteConfig, Vehicle } from "./types";

const root = process.cwd();

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(path.join(root, "content/site.json"), "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export function getAllVehicles(): Vehicle[] {
  const dir = path.join(root, "content/vehicles");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json") && !file.startsWith("_draft-"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      return JSON.parse(raw) as Vehicle;
    })
    .sort((a, b) => {
      const orderA = a.sortOrder ?? 9999;
      const orderB = b.sortOrder ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return b.year - a.year || a.title.localeCompare(b.title);
    });
}

export function getAvailableVehicles(): Vehicle[] {
  return getAllVehicles().filter((v) => v.status === "available");
}

export function getElectricVehicles(): Vehicle[] {
  return getAvailableVehicles().filter(
    (v) => v.fuel?.toLowerCase() === "electric",
  );
}

export function getHybridVehicles(): Vehicle[] {
  return getAvailableVehicles().filter((v) =>
    (v.fuel ?? "").toLowerCase().includes("hybrid"),
  );
}

export function getFeaturedVehicles(): Vehicle[] {
  const featured = getAvailableVehicles().filter((v) => v.featured);
  return featured.length > 0 ? featured : getAvailableVehicles().slice(0, 4);
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return getAllVehicles().find((v) => v.slug === slug);
}

export {
  formatMileage,
  formatPrice,
  getVehicleImagePath,
  telHref,
  whatsappHref,
} from "./format";
