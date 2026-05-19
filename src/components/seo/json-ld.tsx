import { siteSettings } from "@/lib/data/site";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export function HotelJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Serra Otel",
    alternateName: "Serra Hotel Urla",
    description:
      "Urla'da denize sıfır, 10 odalı, yarım pansiyon butik otel. Plaj karşınızda, kahvaltı dahil.",
    url: BASE_URL,
    telephone: "+902327520110",
    image: [
      `${BASE_URL}/serra/current/gallery-01.jpeg`,
      `${BASE_URL}/serra/current/gallery-16.jpeg`,
      `${BASE_URL}/serra/current/gallery-21.jpeg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Atatürk Mahallesi, 2226. Sokak No:18",
      addressLocality: "Urla",
      addressRegion: "İzmir",
      postalCode: "35430",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.3229,
      longitude: 26.764,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "3",
    },
    numberOfRooms: 10,
    checkinTime: siteSettings.checkIn,
    checkoutTime: siteSettings.checkOut,
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Ücretsiz Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ücretsiz Otopark", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kahvaltı Dahil", value: true },
      { "@type": "LocationFeatureSpecification", name: "Klima", value: true },
      { "@type": "LocationFeatureSpecification", name: "7/24 Resepsiyon", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restoran", value: true },
      { "@type": "LocationFeatureSpecification", name: "Denize Sıfır", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      bestRating: "5",
      ratingCount: "89",
      reviewCount: "42",
    },
    sameAs: [
      "https://www.instagram.com/serraotelurla",
      "https://www.google.com/maps/place/Serra+Otel",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+905322755455",
      contactType: "reservations",
      availableLanguage: ["Turkish", "English", "German"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
