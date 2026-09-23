import type { Vehicle } from "./types";

export function getVehicleImagePath(vehicle: Vehicle, image: string): string {
  return `/vehicles/${vehicle.slug}/${image}`;
}

export function formatMileage(vehicle: Vehicle): string | null {
  if (vehicle.mileage == null) return null;
  return `${vehicle.mileage.toLocaleString()} ${vehicle.mileageUnit}`;
}

export function formatPrice(vehicle: Vehicle): string {
  if (vehicle.price == null) return "Ask for price";
  return `$${vehicle.price.toLocaleString()}`;
}

export function whatsappHref(whatsapp: string, message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${whatsapp}${text}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
