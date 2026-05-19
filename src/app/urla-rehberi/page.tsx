import type { Metadata } from "next";

import { UrlaGuide } from "@/components/sections/urla-guide";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "Urla Rehberi | Gezilecek Yerler, Plajlar ve Gastronomi",
  description:
    "Urla'da gezilecek yerler, plajlar, şarap bağları, Michelin restoranları ve tarihi mekanlar. Serra Otel misafirleri için hazırlanmış kapsamlı Urla rehberi.",
  keywords: [
    "Urla gezilecek yerler",
    "Urla rehberi",
    "Urla plajları",
    "Urla bağ yolu",
    "Urla restoranları",
    "Klazomenai",
    "OD Urla",
  ],
  alternates: { canonical: `${BASE}/urla-rehberi` },
  openGraph: {
    title: "Urla Rehberi | Serra Otel",
    description: "Plajlar, tarihi mekanlar, şarap bağları ve Michelin restoranları.",
    url: `${BASE}/urla-rehberi`,
    images: [{ url: `${BASE}/serra/current/gallery-08.jpeg`, alt: "Urla manzarası" }],
  },
};

export default function UrlaGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Urla Rehberi", url: `${BASE}/urla-rehberi` },
      ]} />
      <UrlaGuide />
    </>
  );
}
