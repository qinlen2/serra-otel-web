import type { MetadataRoute } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const BASE_URL =
  configuredSiteUrl && !configuredSiteUrl.includes("localhost")
    ? configuredSiteUrl.replace(/\/$/, "")
    : "https://serraotel.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
