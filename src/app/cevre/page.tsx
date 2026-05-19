import type { Metadata } from "next";

import { NearbySection } from "@/components/sections/nearby-section";
import { SeaSection } from "@/components/sections/sea-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "Serra Otel Çevresi | Urla Gezilecek Yerler ve Plajlar",
  description:
    "Denize sıfır Serra Otel çevresinde Limantepe, Çeşmealtı plajları, Urla Bağ Yolu, Sanat Sokağı, Güvendik Tepesi ve Michelin yıldızlı restoranlar.",
  alternates: { canonical: `${BASE}/cevre` },
  openGraph: {
    title: "Serra Otel Çevresi | Urla Gezilecek Yerler",
    description: "Plajlar, tarihi mekanlar, şarap bağları ve restoranlar.",
    url: `${BASE}/cevre`,
    images: [{ url: `${BASE}/serra/current/gallery-34.jpeg`, alt: "Serra Otel deniz manzarası" }],
  },
};

export default function NearbyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Çevre", url: `${BASE}/cevre` },
      ]} />
      <SeaSection />
      <NearbySection />
    </>
  );
}
