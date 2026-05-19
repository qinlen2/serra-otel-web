import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  title: "İletişim ve Rezervasyon | Serra Otel Urla",
  description:
    "Serra Otel Urla rezervasyon talebi gönderin. Telefon: +90 232 752 01 10, WhatsApp: +90 532 275 54 55. Atatürk Mah. 2226. Sok. No:18, Urla/İzmir.",
  alternates: { canonical: `${BASE}/iletisim` },
  openGraph: {
    title: "İletişim | Serra Otel Urla",
    description: "Rezervasyon talebi, telefon, WhatsApp ve yol tarifi.",
    url: `${BASE}/iletisim`,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "İletişim", url: `${BASE}/iletisim` },
      ]} />
      <ContactSection />
    </>
  );
}
