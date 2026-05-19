import type { Metadata } from "next";

import { TransportSection } from "@/components/sections/transport-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "Ulaşım | Serra Otel Urla Yol Tarifi",
  description:
    "Serra Otel Urla'ya nasıl gidilir? İzmir'den ESHOT otobüs (984 hat), dolmuş, özel araç ve Adnan Menderes Havalimanı transfer seçenekleri. Ücretsiz otopark.",
  alternates: { canonical: `${BASE}/ulasim` },
  openGraph: {
    title: "Ulaşım Rehberi | Serra Otel Urla",
    description: "İzmir'den Serra Otel'e ulaşım seçenekleri ve yol tarifi.",
    url: `${BASE}/ulasim`,
  },
};

export default function TransportPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Ulaşım", url: `${BASE}/ulasim` },
      ]} />
      <TransportSection />
    </>
  );
}
