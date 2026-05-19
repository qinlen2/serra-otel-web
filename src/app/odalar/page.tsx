import type { Metadata } from "next";

import { RoomsShowcase } from "@/components/sections/rooms-showcase";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "Serra Otel Odaları | Urla Butik Otel Oda Seçenekleri",
  description:
    "Serra Otel Urla'nın 10 odalı butik yapısını keşfedin. Standart çift kişilik, üç kişilik ve çatı katı suiti. Klima, Wi-Fi, minibar ve özel banyo.",
  alternates: { canonical: `${BASE}/odalar` },
  openGraph: {
    title: "Serra Otel Odaları | Urla",
    description: "10 odalı butik yapı. Her oda sade, aydınlık ve konforlu.",
    url: `${BASE}/odalar`,
    images: [{ url: `${BASE}/serra/current/gallery-23.jpeg`, alt: "Serra Otel oda görünümü" }],
  },
};

export default function RoomsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Odalar", url: `${BASE}/odalar` },
      ]} />
      <RoomsShowcase />
    </>
  );
}
