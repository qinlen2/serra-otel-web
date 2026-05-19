import type { Metadata } from "next";

import { BreakfastSection } from "@/components/sections/breakfast-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "Kahvaltı | Serra Otel Urla Yarım Pansiyon",
  description:
    "Serra Otel'de yarım pansiyon konaklama. Kahvaltı 08:30-11:00 arası sunulur. Yumurta, peynir, bal, reçel, tereyağı ve sınırsız çay.",
  alternates: { canonical: `${BASE}/kahvalti` },
  openGraph: {
    title: "Kahvaltı | Serra Otel Urla",
    description: "Yarım pansiyon, kahvaltı dahil konaklama.",
    url: `${BASE}/kahvalti`,
  },
};

export default function BreakfastPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Kahvaltı", url: `${BASE}/kahvalti` },
      ]} />
      <BreakfastSection />
    </>
  );
}
