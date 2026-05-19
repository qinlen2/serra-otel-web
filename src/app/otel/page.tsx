import type { Metadata } from "next";

import { HotelTourSection } from "@/components/sections/hotel-tour-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "Oteli Gez | Serra Otel Urla İç Mekan Galerisi",
  description:
    "Serra Otel'in resepsiyon, yemek alanı, ortak alanlar ve dış cephe fotoğraflarını inceleyin. Urla'da butik ve samimi bir konaklama deneyimi.",
  alternates: { canonical: `${BASE}/otel` },
  openGraph: {
    title: "Serra Otel İç Mekan Galerisi | Urla",
    description: "Resepsiyon, yemek alanı ve ortak alan fotoğrafları.",
    url: `${BASE}/otel`,
    images: [{ url: `${BASE}/serra/current/gallery-16.jpeg`, alt: "Serra Otel dış cephe görünümü" }],
  },
};

export default function HotelPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Oteli Gez", url: `${BASE}/otel` },
      ]} />
      <HotelTourSection />
    </>
  );
}
