export type SitePhone = {
  phone: string;
  display: string;
  whatsapp: string;
};

export type SiteConfig = {
  name: string;
  byline: string;
  tagline: string;
  instagramUrl: string;
  instagramHandle: string;
  phones: SitePhone[];
  location: string;
  mapsUrl: string;
  logo: string;
};

export type VehicleStatus = "available" | "sold";

export type Vehicle = {
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number | null;
  mileage: number | null;
  mileageUnit: "km" | "mi";
  bodyType: string | null;
  transmission: string | null;
  fuel: string | null;
  color: string | null;
  status: VehicleStatus;
  description: string;
  instagramUrl: string | null;
  images: string[];
  featured: boolean;
  updatedAt: string;
};
