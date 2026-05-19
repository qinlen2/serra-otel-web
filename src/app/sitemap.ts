import type { MetadataRoute } from "next";

import { rooms } from "@/lib/data/site";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const BASE_URL =
  configuredSiteUrl && !configuredSiteUrl.includes("localhost")
    ? configuredSiteUrl.replace(/\/$/, "")
    : "https://serraotel.com";

export const dynamic = "force-static";

const pageUrl = (path = "") => `${BASE_URL}${path}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: pageUrl(), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: pageUrl("/odalar"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: pageUrl("/otel"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: pageUrl("/kahvalti"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: pageUrl("/cevre"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: pageUrl("/urla-rehberi"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: pageUrl("/ulasim"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: pageUrl("/iletisim"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: pageUrl("/gizlilik"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: pageUrl("/iptal-kosullari"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const roomPages: MetadataRoute.Sitemap = rooms
    .filter((room) => room.isActive)
    .map((room) => ({
      url: pageUrl(`/odalar/${room.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...roomPages];
}
