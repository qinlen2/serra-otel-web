import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { ExperienceGate } from "@/components/layout/experience-gate";
import { PageLoader } from "@/components/layout/page-loader";
import { PreferenceProvider } from "@/components/layout/preference-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { BackToTop } from "@/components/ui/back-to-top";
import { HotelJsonLd } from "@/components/seo/json-ld";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Serra Otel Urla | Denize Sıfır Butik Otel – Kahvaltı Dahil",
    template: "%s | Serra Otel Urla",
  },
  description:
    "Urla Çeşmealtı'nda denize sıfır, 10 odalı butik Serra Otel. Yarım pansiyon, kahvaltı dahil. Plaj otelin hemen karşısında. Ücretsiz otopark ve Wi-Fi.",
  keywords: [
    "Serra Otel",
    "Serra Otel Urla",
    "Urla butik otel",
    "Urla denize sıfır otel",
    "Urla yarım pansiyon otel",
    "Urla plaja yakın otel",
    "Çeşmealtı otel",
    "Urla konaklama",
    "İzmir butik otel",
    "Urla tatil",
    "Urla kahvaltı dahil otel",
    "Urla deniz manzaralı otel",
  ],
  authors: [{ name: "Serra Otel" }],
  creator: "Serra Otel",
  publisher: "Serra Otel",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Serra Otel Urla | Denize Sıfır Butik Otel",
    description:
      "Urla'da denize sıfır, 10 odalı butik otel. Yarım pansiyon, kahvaltı dahil. Plaj otelin karşısında.",
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Serra Otel Urla",
    images: [
      {
        url: `${SITE_URL}/serra/current/gallery-01.jpeg`,
        width: 1200,
        height: 630,
        alt: "Serra Otel Urla - Denize sıfır butik otel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serra Otel Urla | Denize Sıfır Butik Otel",
    description:
      "Urla'da denize sıfır, 10 odalı butik otel. Yarım pansiyon, kahvaltı dahil.",
    images: [`${SITE_URL}/serra/current/gallery-01.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification — add actual code when available
    // google: "your-verification-code",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <HotelJsonLd />
      </head>
      <body className="min-h-full pb-20 lg:pb-0">
        <PreferenceProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <MobileActionBar />
          <FloatingWhatsApp />
          <BackToTop />
          <PageLoader />
          <ExperienceGate />
        </PreferenceProvider>
      </body>
    </html>
  );
}
